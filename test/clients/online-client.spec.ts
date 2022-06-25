import BigNumber from "bignumber.js";
import bs58 from "bs58";
import { expect } from "chai";
import * as dotenv from "dotenv";
import {
	describe,
	it,
} from "mocha";

import { NATIVE_MINT } from "@solana/spl-token";
import {
	Keypair,
	PublicKey,
	Transaction,
} from "@solana/web3.js";

import { DcaClientFactory } from "../../src/clients";
import { connection } from "../../src/constants";
import { findAssociatedTokenAddress } from "../../src/utils";

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
const dcaAccountA = new PublicKey("AtTJrt7hSCpT4pYB3R7S3Xi59dgp7jVRAEGKJSyjH1nX");
const dcaAccountB = new PublicKey("B4mAeTp58jJuoXsLqQnhuytj67TpGQnzqoJDg9FMyzRy");

const expectedStatus = "success";

describe("Dca online client test", async () => {
	const dcaOnlineClient = new DcaClientFactory()
		.setConnection(connection)
		.setCommitment("confirmed")
		.setPreflightCommitment("confirmed")
		.buildOnlineClient(wallet);

	describe("depositToken()", () => {
		it("deposit token into dca vault", async () => {
			const {
				data: { dcaAccount: dcaAccountForTokenDeposit, signature: depositTokenSignature },
				status: depositTokenStatus,
			} = await dcaOnlineClient.depositToken(wallet.publicKey, MINT1, new BigNumber("0.0001"));
			const accountInfo = await connection.getAccountInfo(dcaAccountForTokenDeposit.publicKey);
			expect(accountInfo).not.to.be.null;
			expect(depositTokenStatus).to.equal(expectedStatus);
			expect(depositTokenSignature).not.to.be.undefined;
			const confirmed = await isConfirmed(depositTokenSignature);
			expect(confirmed).to.be.true;
		});
	});

	describe("intialize()", () => {
		it("intialize the dca process", async () => {
			const {
				data: { signature: initializeSignature },
				status: initializeStatus,
			} = await dcaOnlineClient.initialize(
				wallet.publicKey,
				MINT1,
				dcaAccountA,
				new BigNumber(Date.now() / 1000 + 120),
				new BigNumber(0.001),
				new BigNumber(3000),
			);
			expect(initializeStatus).to.equal("success");
			expect(initializeSignature).not.to.be.undefined;
			const confirmed = await isConfirmed(initializeSignature);
			expect(confirmed).to.be.true;
		});
	});

	describe("swapToSol()", () => {
		it("swap token mint to wsol", async () => {
			const {
				data: { signature: swapToSolSignature },
				status: swapToSolStatus,
			} = await dcaOnlineClient.swapToSol(wallet.publicKey, MINT1, dcaAccountA);
			expect(swapToSolStatus).to.equal(expectedStatus);
			expect(swapToSolSignature).not.to.be.undefined;
			const confirmed = await isConfirmed(swapToSolSignature);
			expect(confirmed).to.be.true;
		});
	});

	describe("withdrawToken()", () => {
		it("withdraw swapped wsol from dca vault", async () => {
			const dcaWSolVault = await findAssociatedTokenAddress(dcaAccountA, NATIVE_MINT);
			const {
				value: { uiAmount },
			} = await connection.getTokenAccountBalance(dcaWSolVault);
			if (!uiAmount) throw new Error("Withdraw amount not retrieved");
			const {
				data: { signature: withdrawSolSignature },
				status: withdrawSolStatus,
			} = await dcaOnlineClient.withdrawSol(wallet.publicKey, MINT1, dcaAccountA, new BigNumber(uiAmount));
			expect(withdrawSolStatus).to.equal(expectedStatus);
			expect(withdrawSolSignature).not.to.be.undefined;
			const confirmed = await isConfirmed(withdrawSolSignature);
			expect(confirmed).to.be.true;
		});
	});

	describe("fundToken()", () => {
		it("fund tokens to existing dca process", async () => {
			const {
				data: { signature: fundTokenSignature },
				status: fundTokenStatus,
			} = await dcaOnlineClient.fundToken(wallet.publicKey, MINT1, dcaAccountA, new BigNumber(0.001));
			expect(fundTokenStatus).to.equal(expectedStatus);
			expect(fundTokenSignature).not.to.be.undefined;
			const confirmed = await isConfirmed(fundTokenSignature);
			expect(confirmed).to.be.true;
		});
	});
});
