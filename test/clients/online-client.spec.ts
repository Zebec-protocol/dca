import BigNumber from "bignumber.js";
import { expect } from "chai";
import { describe, it } from "mocha";

import { Transaction } from "@solana/web3.js";

import { DcaClientFactory } from "../../src/clients";
import { CONNECTION as connection } from "../../src/constants";
import { expectedStatus, MINT1, MINT2, nowInSec, ownerKeypair } from "./shared";

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

const dcaOnlineClient = new DcaClientFactory()
	.setConnection(connection)
	.setCommitment("finalized")
	.setPreflightCommitment("finalized")
	.buildOnlineClient(wallet);

describe("Dca online client", async () => {
	describe("Test from token to sol process", () => {
		it("should pass", async () => {
			const {
				data: { dcaAccount, signature },
				status,
			} = await dcaOnlineClient.depositToken(wallet.publicKey, MINT1, new BigNumber("0.001"));
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;

			const {
				data: { signature: signature1 },
				status: status1,
			} = await dcaOnlineClient.initialize(
				wallet.publicKey,
				MINT1,
				dcaAccount,
				new BigNumber(nowInSec() + 120),
				new BigNumber("0.001"),
				new BigNumber(3000),
			);
			expect(status1).to.equal("success");
			expect(signature1).not.to.be.undefined;

			const {
				data: { signature: signature4 },
				status: status4,
			} = await dcaOnlineClient.fundToken(wallet.publicKey, MINT1, dcaAccount, new BigNumber(0.001));
			expect(status4).to.equal(expectedStatus);
			expect(signature4).not.to.be.undefined;
		});
	});

	describe("Test from sol to token process", () => {
		it("should pass", async () => {
			const {
				data: { signature: signature, dcaAccount },
				status,
			} = await dcaOnlineClient.depositSol(wallet.publicKey, MINT2, new BigNumber("0.000001"));
			console.log("dcaAccount", dcaAccount.toString());
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;

			const {
				data: { signature: signature1 },
				status: status1,
			} = await dcaOnlineClient.initialize(
				wallet.publicKey,
				MINT2,
				dcaAccount,
				new BigNumber(nowInSec() + 120),
				new BigNumber("0.000001"),
				new BigNumber(3000),
			);
			expect(status1).to.equal("success");
			expect(signature1).not.to.be.undefined;

			const {
				data: { signature: signature4 },
				status: status4,
			} = await dcaOnlineClient.fundSol(wallet.publicKey, MINT2, dcaAccount, new BigNumber(0.000001));
			expect(status4).to.equal(expectedStatus);
			expect(signature4).not.to.be.undefined;
		});
	});
});
