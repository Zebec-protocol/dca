import BigNumber from "bignumber.js";
import { expect } from "chai";
import { describe, it } from "mocha";

import { PublicKey, SendTransactionError, Transaction } from "@solana/web3.js";

import { DcaClientFactory } from "../../src/clients";
import { CONNECTION as connection } from "../../src/constants";
import { DcaFlag } from "../../src/models";
import { dcaAccountA, dcaAccountD, expectedStatus, nowInSec, ownerKeypair, RAY_MINT, USDC_MINT } from "./shared";

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

const onlineDcaClient = new DcaClientFactory()
	.setConnection(connection)
	.setCommitment("finalized")
	.setPreflightCommitment("finalized")
	.buildOnlineClient(wallet);

const dcaAccounts: PublicKey[] = [];

describe("Dca online client", async () => {
	describe("Test from token to sol process", () => {
		// it("depositToken()", async () => {
		// 	try {
		// 		const {
		// 			data: { dcaAccount, signature },
		// 			status,
		// 		} = await onlineDcaClient.depositToken(wallet.publicKey, RAY_MINT, new BigNumber("0.0001"));
		// 		dcaAccounts[0] = dcaAccount;
		// 		console.log("dca account", dcaAccount.toString());
		// 		expect(status).to.equal(expectedStatus);
		// 		expect(signature).not.to.be.undefined;
		// 	} catch (error) {
		// 		console.log(error instanceof SendTransactionError ? error.logs : error);
		// 		throw error;
		// 	}
		// });

		it("fundToken()", async () => {
			try {
				const {
					data: { signature: signature4 },
					status: status4,
				} = await onlineDcaClient.fundToken(wallet.publicKey, RAY_MINT, dcaAccountA, new BigNumber(0.0008));
				expect(status4).to.equal(expectedStatus);
				expect(signature4).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});

		it("initialize()", async () => {
			try {
				const {
					data: { signature: signature1 },
					status: status1,
				} = await onlineDcaClient.initialize(
					wallet.publicKey,
					RAY_MINT,
					dcaAccountA,
					DcaFlag["MINT-SOL"],
					new BigNumber(nowInSec() + 1),
					new BigNumber("0.0008"),
					new BigNumber(3),
				);
				expect(status1).to.equal(expectedStatus);
				expect(signature1).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});

		it("swapToSol()", async () => {
			try {
				const {
					data: { signature: signature2 },
					status: status2,
				} = await onlineDcaClient.swapToSol(wallet.publicKey, RAY_MINT, dcaAccountA);
				expect(status2).to.equal("success");
				expect(signature2).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});

		it("withdrawSol()", async () => {
			try {
				const {
					data: { signature: signature3 },
					status: status3,
				} = await onlineDcaClient.withdrawSol(wallet.publicKey, RAY_MINT, dcaAccountA, new BigNumber("0.000005"));
				expect(status3).to.equal(expectedStatus);
				expect(signature3).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
	});

	describe("Test from sol to token process", () => {
		// it("depositSol()", async () => {
		// 	try {
		// 		const {
		// 			data: { signature: signature, dcaAccount },
		// 			status,
		// 		} = await onlineDcaClient.depositSol(wallet.publicKey, USDC_MINT, new BigNumber("0.000001"));
		// 		dcaAccounts[1] = dcaAccount;
		// 		console.log("dcaAccount", dcaAccount.toString());
		// 		expect(status).to.equal(expectedStatus);
		// 		expect(signature).not.to.be.undefined;
		// 	} catch (error) {
		// 		console.log(error instanceof SendTransactionError ? error.logs : error);
		// 		throw error;
		// 	}
		// });

		it("fundSol()", async () => {
			try {
				const {
					data: { signature: signature4 },
					status: status4,
				} = await onlineDcaClient.fundSol(wallet.publicKey, USDC_MINT, dcaAccountD, new BigNumber(0.0001));
				expect(status4).to.equal(expectedStatus);
				expect(signature4).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});

		it("intialize()", async () => {
			try {
				const {
					data: { signature: signature1 },
					status: status1,
				} = await onlineDcaClient.initialize(
					wallet.publicKey,
					USDC_MINT,
					dcaAccountD,
					DcaFlag["SOL-MINT"],
					new BigNumber(nowInSec() + 1),
					new BigNumber("0.0001"),
					new BigNumber(3),
				);
				expect(status1).to.equal(expectedStatus);
				expect(signature1).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});

		it("swapFromSol()", async () => {
			try {
				const {
					data: { signature: signature2 },
					status: status2,
				} = await onlineDcaClient.swapFromSol(wallet.publicKey, USDC_MINT, dcaAccountD);
				expect(status2).to.equal(expectedStatus);
				expect(signature2).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});

		it("withdrawToken()", async () => {
			try {
				const {
					data: { signature: signature3 },
					status: status3,
				} = await onlineDcaClient.withdrawToken(wallet.publicKey, USDC_MINT, dcaAccountD, new BigNumber("0.0005"));
				expect(status3).to.equal(expectedStatus);
				expect(signature3).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
	});
});
