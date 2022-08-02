import { BN } from "bn.js";
import { expect } from "chai";
import { describe } from "mocha";

import { PublicKey, SendTransactionError } from "@solana/web3.js";

import { DcaClientFactory } from "../../src/clients";
import { CONNECTION } from "../../src/constants";
import { Amount, DcaAccount } from "../../src/models";
import {
	DEVNET_BASEMINT,
	DEVNET_QUOTEMINT,
	DEVNET_QUOTEMINT1,
	expectedStatus,
	nowInSec,
	ownerKeypair,
	WSOL_MINT,
} from "../clients/shared";
import { delay, getBalanceOfSplToken, getClusterTime } from "./utils";
import { findAssociatedTokenAddress, findVaultAddress } from "../../src/utils";

const offlineDcaClient = new DcaClientFactory()
	.setConnection(CONNECTION["devnet"])
	.setCommitment("finalized")
	.setPreflightCommitment("processed")
	.buildOfflineClient(ownerKeypair);

describe("Test scenarios of Init Dca Process", async () => {
	describe("Test with token", () => {
		const dcaAccounts: PublicKey[] = [];
		it("depositToken()", async () => {
			try {
				const depositedAmount = new Amount(new BN("1500"));
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let senderBalanceBeforeDeposit = await getBalanceOfSplToken(
					DEVNET_BASEMINT,
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let dcaVaultBalanceBeforeDeposit = await getBalanceOfSplToken(DEVNET_BASEMINT, vault, CONNECTION["devnet"]);
				const {
					data: { signature },
					status,
				} = await offlineDcaClient.depositToken(ownerKeypair.publicKey, DEVNET_BASEMINT, depositedAmount);
				let senderBalanceAfterDeposit = await getBalanceOfSplToken(
					DEVNET_BASEMINT,
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let dcaVaultBalanceAfterDeposit = await getBalanceOfSplToken(DEVNET_BASEMINT, vault, CONNECTION["devnet"]);
				let expectedSenderBalanceAfterDeposit = senderBalanceBeforeDeposit.sub(depositedAmount);
				let expectedDcaVaultBalanceAfterDeposit = dcaVaultBalanceBeforeDeposit.add(depositedAmount);
				expect(expectedSenderBalanceAfterDeposit).to.deep.equal(senderBalanceAfterDeposit);
				expect(expectedDcaVaultBalanceAfterDeposit).to.deep.equal(dcaVaultBalanceAfterDeposit);
				expect(status).to.equal(expectedStatus);
				expect(signature).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("initialize()", async () => {
			try {
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				const startTime = new BN(nowInSec() + 10);
				const amount = new Amount(new BN("500"));
				const frequency = new BN(6);
				const clusterTime = await getClusterTime(CONNECTION["devnet"]);
				const differenceBetweenWallClock = startTime.sub(new BN(clusterTime));
				const startTimeWithCluster = startTime.add(differenceBetweenWallClock);
				const {
					data: { signature: signature1, dcaAccount: dcaAccount },
					status: status1,
				} = await offlineDcaClient.initialize(
					ownerKeypair.publicKey,
					DEVNET_BASEMINT,
					DEVNET_QUOTEMINT,
					startTimeWithCluster,
					amount,
					frequency,
				);
				const dcaInfo = await DcaAccount.getDcaAccountInfo(
					CONNECTION["devnet"],
					new PublicKey(dcaAccount.toString()),
					"confirmed",
				);
				dcaAccounts[0] = dcaAccount;
				expect(dcaInfo.authority.toString()).to.equal(ownerKeypair.publicKey.toString());
				expect(dcaInfo.dcaAmount.toString()).to.equal(amount.toString());
				expect(dcaInfo.startTime.toString()).to.equal(startTimeWithCluster.toString());
				expect(dcaInfo.frequency.toString()).to.equal(frequency.toString());
				expect(dcaInfo.mintAddressTo.toString()).to.equal(DEVNET_QUOTEMINT.toString());
				expect(dcaInfo.mintAddressFrom.toString()).to.equal(DEVNET_BASEMINT.toString());
				expect(status1).to.equal(expectedStatus);
				expect(signature1).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("Should throw error when swap before start time", async () => {
			try {
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
				const clusterTime = await getClusterTime(CONNECTION["devnet"]);
				const differenceInTime = dcaAccount.startTime.sub(new BN(clusterTime));
				await delay((Number(differenceInTime) - 20) * 1000);
				const _ = await offlineDcaClient.swap(
					ownerKeypair.publicKey,
					dcaAccount.mintAddressFrom,
					dcaAccount.mintAddressTo,
					dcaAccounts[0],
				);
			} catch (error) {
				if (error instanceof SendTransactionError) {
					const errorMessage = error.logs?.splice(3)[0].split(": ")[2];
					expect(errorMessage).to.equal("Time not Started");
				}
			}
		});
		it("should allow transaction after startTime", async () => {
			try {
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
				const clusterTime = await getClusterTime(CONNECTION["devnet"]);
				const differenceInTime = dcaAccount.startTime.sub(new BN(clusterTime));
				console.log("delay seconds", (Number(differenceInTime) + 2) * 1000);
				await delay((Number(differenceInTime) + 2) * 1000);
				const {
					data: { signature: signature2 },
					status: status2,
				} = await offlineDcaClient.swap(
					ownerKeypair.publicKey,
					dcaAccount.mintAddressFrom,
					dcaAccount.mintAddressTo,
					dcaAccounts[0],
				);
				expect(status2).to.equal("success");
				expect(signature2).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("should allow swap after dca time is over", async () => {
			try {
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
				const clusterTime = await getClusterTime(CONNECTION["devnet"]);
				const differenceInTime = dcaAccount.startTime.sub(new BN(clusterTime));
				console.log("delay second", Number(differenceInTime) * 1000);
				await delay(Number(differenceInTime) * 1000);
				const {
					data: { signature: signature2 },
					status: status2,
				} = await offlineDcaClient.swap(
					ownerKeypair.publicKey,
					dcaAccount.mintAddressFrom,
					dcaAccount.mintAddressTo,
					dcaAccounts[0],
				);
				expect(status2).to.equal("success");
				expect(signature2).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("Should throw error before starting new dca time", async () => {
			try {
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
				const _ = await offlineDcaClient.swap(
					ownerKeypair.publicKey,
					dcaAccount.mintAddressFrom,
					dcaAccount.mintAddressTo,
					dcaAccounts[0],
				);
			} catch (error) {
				if (error instanceof SendTransactionError) {
					const errorMessage = error.logs?.splice(3)[0].split(": ")[2];
					expect(errorMessage).to.equal("Time not Started");
				}
			}
		});
		it("should throw error when withdraw more than vault balance", async () => {
			try {
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				const withdrawAmount = new Amount(new BN("1000"));
				const _ = await offlineDcaClient.withdrawToken(ownerKeypair.publicKey, DEVNET_BASEMINT, withdrawAmount);
			} catch (error) {
				if (error instanceof SendTransactionError) {
					const errorMessage = error.logs?.splice(4)[0].split(":")[2];
					expect(errorMessage).to.equal("Balance is Insufficient ");
				}
			}
		});
		it("Should throw error on swap when the vault balance is less", async () => {
			try {
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
				const clusterTime = await getClusterTime(CONNECTION["devnet"]);
				const differenceInTime = dcaAccount.startTime.sub(new BN(clusterTime));
				await delay(Number(differenceInTime) * 1000);
				const _ = await offlineDcaClient.swap(
					ownerKeypair.publicKey,
					dcaAccount.mintAddressFrom,
					dcaAccount.mintAddressTo,
					dcaAccounts[0],
				);
			} catch (error) {
				if (error instanceof SendTransactionError) {
					const errorMessage = error.logs?.splice(3)[0].split(":")[2];
					expect(errorMessage).to.equal("Balance is Insufficient ");
				}
			}
		});
		it("deposit token again to withdraw", async () => {
			try {
				const depositedAmount = new Amount(new BN("1000"));
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let senderBalanceBeforeDeposit = await getBalanceOfSplToken(
					DEVNET_BASEMINT,
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let dcaVaultBalanceBeforeDeposit = await getBalanceOfSplToken(DEVNET_BASEMINT, vault, CONNECTION["devnet"]);
				const {
					data: { signature },
					status,
				} = await offlineDcaClient.depositToken(ownerKeypair.publicKey, DEVNET_BASEMINT, depositedAmount);
				let senderBalanceAfterDeposit = await getBalanceOfSplToken(
					DEVNET_BASEMINT,
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let dcaVaultBalanceAfterDeposit = await getBalanceOfSplToken(DEVNET_BASEMINT, vault, CONNECTION["devnet"]);
				let expectedSenderBalanceAfterDeposit = senderBalanceBeforeDeposit.sub(depositedAmount);
				let expectedDcaVaultBalanceAfterDeposit = dcaVaultBalanceBeforeDeposit.add(depositedAmount);
				expect(expectedSenderBalanceAfterDeposit).to.deep.equal(senderBalanceAfterDeposit);
				expect(expectedDcaVaultBalanceAfterDeposit).to.deep.equal(dcaVaultBalanceAfterDeposit);
				expect(status).to.equal(expectedStatus);
				expect(signature).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("check balances after withdraw successfully", async () => {
			try {
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let dcaVaultBalanceBeforeWithdraw = await getBalanceOfSplToken(DEVNET_BASEMINT, vault, CONNECTION["devnet"]);
				const withdrawAmount = new Amount(new BN("1000"));
				let senderBalanceBeforeWithdraw = await getBalanceOfSplToken(
					DEVNET_BASEMINT,
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				const {
					data: { signature: signature3 },
					status: status3,
				} = await offlineDcaClient.withdrawToken(ownerKeypair.publicKey, DEVNET_BASEMINT, withdrawAmount);
				let dcaVaultBalanceAfterWithdraw = await getBalanceOfSplToken(DEVNET_BASEMINT, vault, CONNECTION["devnet"]);
				let senderBalanceAfterWithdraw = await getBalanceOfSplToken(
					DEVNET_BASEMINT,
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let expectedSenderBalanceAfterDeposit = senderBalanceBeforeWithdraw.add(withdrawAmount);
				let expectedDcaVaultBalanceAfterDeposit = dcaVaultBalanceBeforeWithdraw.sub(withdrawAmount);
				expect(expectedSenderBalanceAfterDeposit).to.deep.equal(senderBalanceAfterWithdraw);
				expect(expectedDcaVaultBalanceAfterDeposit).to.deep.equal(dcaVaultBalanceAfterWithdraw);
				expect(status3).to.equal(expectedStatus);
				expect(signature3).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
	});

	// describe("Test with native sol", () => {
	// 	const dcaAccounts: PublicKey[] = [];
	// 	it("initialize()", async () => {
	// 		try {
	// 			const startTime = new BN(nowInSec() + 10);
	// 			const amount = new Amount(new BN("1000"));
	// 			const frequency = new BN(6);
	// 			const clusterTime = await getClusterTime(CONNECTION["devnet"]);
	// 			const differenceBetweenWallClock = startTime.sub(new BN(clusterTime));
	// 			const startTimeWithCluster = startTime.add(differenceBetweenWallClock);
	// 			const {
	// 				data: { signature: signature1, dcaAccount: dcaAccount },
	// 				status: status1,
	// 			} = await offlineDcaClient.initialize(
	// 				ownerKeypair.publicKey,
	// 				WSOL_MINT,
	// 				DEVNET_QUOTEMINT1,
	// 				startTimeWithCluster,
	// 				amount,
	// 				frequency,
	// 			);
	// 			const dcaInfo = await DcaAccount.getDcaAccountInfo(
	// 				CONNECTION["devnet"],
	// 				new PublicKey(dcaAccount.toString()),
	// 				"confirmed",
	// 			);
	// 			dcaAccounts[0] = dcaAccount;
	// 			expect(dcaInfo.authority.toString()).to.equal(ownerKeypair.publicKey.toString());
	// 			expect(dcaInfo.dcaAmount.toString()).to.equal(amount.toString());
	// 			expect(dcaInfo.startTime.toString()).to.equal(startTimeWithCluster.toString());
	// 			expect(dcaInfo.frequency.toString()).to.equal(frequency.toString());
	// 			expect(dcaInfo.mintAddressTo.toString()).to.equal(DEVNET_QUOTEMINT1.toString());
	// 			expect(dcaInfo.mintAddressFrom.toString()).to.equal(WSOL_MINT.toString());
	// 			expect(status1).to.equal(expectedStatus);
	// 			expect(signature1).not.to.be.undefined;
	// 		} catch (error) {
	// 			console.log(error instanceof SendTransactionError ? error.logs : error);
	// 			throw error;
	// 		}
	// 	});
	// 	it("Should throw error when swap before start time", async () => {
	// 		try {
	// 			const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
	// 			const clusterTime = await getClusterTime(CONNECTION["devnet"]);
	// 			const differenceInTime = dcaAccount.startTime.sub(new BN(clusterTime));
	// 			await delay((Number(differenceInTime) - 20) * 1000);
	// 			const _ = await offlineDcaClient.swap(
	// 				ownerKeypair.publicKey,
	// 				dcaAccount.mintAddressFrom,
	// 				dcaAccount.mintAddressTo,
	// 				dcaAccounts[0],
	// 			);
	// 		} catch (error) {
	// 			if (error instanceof SendTransactionError) {
	// 				const errorMessage = error.logs?.splice(3)[0].split(": ")[2];
	// 				expect(errorMessage).to.equal("Time not Started");
	// 			}
	// 		}
	// 	});
	// 	it("should allow transaction after startTime", async () => {
	// 		try {
	// 			const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
	// 			const clusterTime = await getClusterTime(CONNECTION["devnet"]);
	// 			const differenceInTime = dcaAccount.startTime.sub(new BN(clusterTime));
	// 			await delay((Number(differenceInTime) + 2) * 1000);
	// 			const {
	// 				data: { signature: signature2 },
	// 				status: status2,
	// 			} = await offlineDcaClient.swap(
	// 				ownerKeypair.publicKey,
	// 				dcaAccount.mintAddressFrom,
	// 				dcaAccount.mintAddressTo,
	// 				dcaAccounts[0],
	// 			);
	// 			expect(status2).to.equal("success");
	// 			expect(signature2).not.to.be.undefined;
	// 		} catch (error) {
	// 			if (error instanceof SendTransactionError) {
	// 				console.log("error logs", error.logs);
	// 			}
	// 			throw error;
	// 		}
	// 	});
	// 	it("should allow swap after dca time is over", async () => {
	// 		try {
	// 			const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
	// 			const clusterTime = await getClusterTime(CONNECTION["devnet"]);
	// 			const differenceInTime = dcaAccount.startTime.sub(new BN(clusterTime));
	// 			console.log("delay second", Number(differenceInTime) * 1000);
	// 			await delay(Number(differenceInTime) * 1000);
	// 			const {
	// 				data: { signature: signature2 },
	// 				status: status2,
	// 			} = await offlineDcaClient.swap(
	// 				ownerKeypair.publicKey,
	// 				dcaAccount.mintAddressFrom,
	// 				dcaAccount.mintAddressTo,
	// 				dcaAccounts[0],
	// 			);
	// 			expect(status2).to.equal("success");
	// 			expect(signature2).not.to.be.undefined;
	// 		} catch (error) {
	// 			if (error instanceof SendTransactionError) {
	// 				console.log("error logs", error.logs);
	// 			}
	// 		}
	// 	});
	// 	it("Should throw error before starting new dca time", async () => {
	// 		try {
	// 			const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
	// 			const _ = await offlineDcaClient.swap(
	// 				ownerKeypair.publicKey,
	// 				dcaAccount.mintAddressFrom,
	// 				dcaAccount.mintAddressTo,
	// 				dcaAccounts[0],
	// 			);
	// 		} catch (error) {
	// 			if (error instanceof SendTransactionError) {
	// 				const errorMessage = error.logs?.splice(3)[0].split(": ")[2];
	// 				expect(errorMessage).to.equal("Time not Started");
	// 			}
	// 		}
	// 	});
	// });
});
