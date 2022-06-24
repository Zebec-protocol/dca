import BigNumber from "bignumber.js";
import bs58 from "bs58";
import { expect } from "chai";
import * as dotenv from "dotenv";
import {
	describe,
	it,
} from "mocha";

import {
	Keypair,
	PublicKey,
	Transaction,
} from "@solana/web3.js";

import { DcaClientFactory } from "../../src/clients";
import { connection } from "../../src/constants";

dotenv.config();

const secretKeyString = process.env.SECRET;
if (!secretKeyString)
	throw new Error("Could not load env var. Try adding .env file at root dir with var SECRET=<secret key>");

const ownerKeypair = Keypair.fromSecretKey(bs58.decode(secretKeyString));

// RAY
const MINT1 = new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R");

// USDC
const MINT2 = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

const wallet = {
	publicKey: ownerKeypair.publicKey,
	async signTransaction(transaction: Transaction) {
		const existingPair = transaction.signatures.filter((pair) => pair.signature !== null);
		transaction.sign(ownerKeypair);
		existingPair.forEach((pair) => {
			if (pair.signature) transaction.addSignature(pair.publicKey, pair.signature);
		});
		return transaction;
	},
	async signAllTransactions(transactions: Transaction[]) {
		transactions.forEach(async (txn) => {
			txn.sign(ownerKeypair);
		});
		return transactions;
	},
};

async function isConfirmed(signature: string) {
	const status = await connection.getSignatureStatus(signature, { searchTransactionHistory: true });
	if (!status || status === null) {
		return false;
	} else {
		if (
			status.value?.confirmationStatus === "confirmed" ||
			status.value?.confirmationStatus === "processed" ||
			status.value?.confirmationStatus === "finalized"
		) {
			return true;
		} else {
			return false;
		}
	}
}

describe("Dca online client test", () => {
	const dcaOnlineClient = new DcaClientFactory()
		.setConnection(connection)
		.setCommitment("confirmed")
		.setPreflightCommitment("confirmed")
		.buildOnlineClient(wallet);

	let dcaAccountForSolDeposit: PublicKey;
	let dcaAccountForTokenDeposit: PublicKey;

	describe("depositToken()", () => {
		it("deposit token into dca vault", async () => {
			const { data, status } = await dcaOnlineClient.depositToken(
				ownerKeypair.publicKey,
				MINT1,
				new BigNumber("0.0001"),
			);
			expect(status).to.equal("success");
			expect(data.signature).not.to.be.undefined;

			dcaAccountForTokenDeposit = data.dcaAccount.publicKey;

			const confirmed = await isConfirmed(data.signature);
			expect(confirmed).not.to.be.false;
		});
	});
});
