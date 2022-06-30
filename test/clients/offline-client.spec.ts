import BigNumber from "bignumber.js";
import { expect } from "chai";
import { describe, it } from "mocha";

import { PublicKey, SendTransactionError } from "@solana/web3.js";

import { DcaClientFactory } from "../../src/clients";
import { CONNECTION as connection } from "../../src/constants";
import { DcaFlag } from "../../src/models";
import { dcaAccountB, dcaAccountE, expectedStatus, nowInSec, ownerKeypair, RAY_MINT, USDC_MINT } from "./shared";

const offlineDcaClient = new DcaClientFactory()
	.setConnection(connection)
	.setCommitment("finalized")
	.setPreflightCommitment("finalized")
	.buildOfflineClient(ownerKeypair);

const dcaAccounts: PublicKey[] = [];

describe("Dca offline client", async () => {
	describe("Test from token to sol process", () => {
		// it("depositToken()", async () => {
		// 	try {
		// 		const {
		// 			data: { dcaAccount, signature },
		// 			status,
		// 		} = await offlineDcaClient.depositToken(ownerKeypair.publicKey, RAY_MINT, new BigNumber("0.0001"));
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
				} = await offlineDcaClient.fundToken(ownerKeypair.publicKey, RAY_MINT, dcaAccountB, new BigNumber(0.0008));
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
				} = await offlineDcaClient.initialize(
					ownerKeypair.publicKey,
					RAY_MINT,
					dcaAccountB,
					DcaFlag["MINT-SOL"],
					new BigNumber(nowInSec() + 1),
					new BigNumber(0.0008),
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
				} = await offlineDcaClient.swapToSol(ownerKeypair.publicKey, RAY_MINT, dcaAccountB);
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
				} = await offlineDcaClient.withdrawSol(
					ownerKeypair.publicKey,
					RAY_MINT,
					dcaAccountB,
					new BigNumber("0.000005"),
				);
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
		// 			data: { signature, dcaAccount },
		// 			status,
		// 		} = await offlineDcaClient.depositSol(ownerKeypair.publicKey, USDC_MINT, new BigNumber("0.0000001"));
		// 		dcaAccounts[1] = dcaAccount;
		// 		console.log("dca account", dcaAccount.toString());
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
				} = await offlineDcaClient.fundSol(ownerKeypair.publicKey, USDC_MINT, dcaAccountE, new BigNumber(0.0001));
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
				} = await offlineDcaClient.initialize(
					ownerKeypair.publicKey,
					USDC_MINT,
					dcaAccountE,
					DcaFlag["SOL-MINT"],
					new BigNumber(nowInSec() + 1),
					new BigNumber(0.0001),
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
				} = await offlineDcaClient.swapFromSol(ownerKeypair.publicKey, USDC_MINT, dcaAccountE);
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
				} = await offlineDcaClient.withdrawToken(
					ownerKeypair.publicKey,
					USDC_MINT,
					dcaAccountE,
					new BigNumber("0.0005"),
				);
				expect(status3).to.equal(expectedStatus);
				expect(signature3).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
	});
});
