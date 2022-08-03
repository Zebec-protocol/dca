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
	ownerKeypair,
	WSOL_MINT,
} from "../clients/shared";
import { delay, getBalanceOfSplToken, getEstimatedFee, getNativeTokenBalance } from "./utils";
import { findVaultAddress, getClusterTime, nowInSec } from "../../src/utils";

const offlineDcaClient = new DcaClientFactory()
	.setConnection(CONNECTION["devnet"])
	.setCommitment("finalized")
	.setPreflightCommitment("processed")
	.buildOfflineClient(ownerKeypair);

describe("Test scenarios of Zebec Dca", async () => {
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
				const startTime = new BN(nowInSec());
				const amount = new Amount(new BN("500"));
				const frequency = new BN(10);
				const {
					data: { signature: signature1, dcaAccount: dcaAccount, request },
					status: status1,
				} = await offlineDcaClient.initialize(
					ownerKeypair.publicKey,
					DEVNET_BASEMINT,
					DEVNET_QUOTEMINT,
					startTime,
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
				expect(dcaInfo.startTime.toString()).to.equal(request.startTime.toString());
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
				const differenceInTime = dcaAccount.startTime.sub(clusterTime);
				console.log("delay seconds", Number(differenceInTime) - 18);
				await delay((Number(differenceInTime) - 18) * 1000);
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
		it("should allow transaction after startTime and check token balances", async () => {
			try {
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let dcaVaultBalanceBeforeSwap = await getBalanceOfSplToken(DEVNET_BASEMINT, vault, CONNECTION["devnet"]);
				const clusterTime = await getClusterTime(CONNECTION["devnet"]);
				const differenceInTime = dcaAccount.startTime.sub(clusterTime);
				console.log("delay seconds", Number(differenceInTime) + 2);
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
				let dcaVaultBalanceAfterSwap = await getBalanceOfSplToken(DEVNET_BASEMINT, vault, CONNECTION["devnet"]);
				let expectedDcaVaultBalance = dcaVaultBalanceBeforeSwap.sub(dcaAccount.dcaAmount);
				expect(dcaVaultBalanceAfterSwap.toString()).to.equal(expectedDcaVaultBalance.toString());
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
				const differenceInTime = dcaAccount.startTime.sub(clusterTime);
				console.log("delay second", Number(differenceInTime));
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
		it("withdraw all amount from zebec vault for testing", async () => {
			try {
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let dcaVaultBalanceBeforeWithdraw = await getBalanceOfSplToken(DEVNET_BASEMINT, vault, CONNECTION["devnet"]);
				const withdrawAmount = new Amount(dcaVaultBalanceBeforeWithdraw);
				const _ = await offlineDcaClient.withdrawToken(ownerKeypair.publicKey, DEVNET_BASEMINT, withdrawAmount);
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("should throw error when withdraw more than vault balance", async () => {
			try {
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
				const differenceInTime = dcaAccount.startTime.sub(clusterTime);
				console.log("delay seconds", Number(differenceInTime));
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
		it("deposit token again to withdraw and check balances", async () => {
			try {
				const depositedAmount = new Amount(new BN("4000"));
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
	describe("Test with native sol", () => {
		const dcaAccounts: PublicKey[] = [];
		it("depositToken()", async () => {
			try {
				const depositedAmount = new Amount(new BN("1500"));
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let senderNativeBalanceBeforeDeposit = await getNativeTokenBalance(
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let dcaVaultBalanceBeforeDeposit = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				const {
					data: { signature },
					status,
				} = await offlineDcaClient.depositToken(ownerKeypair.publicKey, WSOL_MINT, depositedAmount);
				let estimatedFee = await getEstimatedFee(CONNECTION["devnet"], signature);
				let senderNativeBalanceAfterDeposit = await getNativeTokenBalance(ownerKeypair.publicKey, CONNECTION["devnet"]);
				let dcaVaultBalanceAfterDeposit = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				let expectedSenderBalanceAfterDeposit = senderNativeBalanceBeforeDeposit
					.sub(depositedAmount)
					.sub(new BN(estimatedFee));
				let expectedDcaVaultBalanceAfterDeposit = dcaVaultBalanceBeforeDeposit.add(depositedAmount);
				expect(expectedSenderBalanceAfterDeposit.toString()).to.deep.equal(senderNativeBalanceAfterDeposit.toString());
				expect(expectedDcaVaultBalanceAfterDeposit).to.deep.equal(dcaVaultBalanceAfterDeposit);
				expect(status).to.deep.equal(expectedStatus);
				expect(signature).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
			}
		});
		it("initialize()", async () => {
			try {
				const startTime = new BN(nowInSec());
				const amount = new Amount(new BN("500"));
				const frequency = new BN(10);
				const {
					data: { signature: signature1, dcaAccount: dcaAccount, request },
					status: status1,
				} = await offlineDcaClient.initialize(
					ownerKeypair.publicKey,
					WSOL_MINT,
					DEVNET_QUOTEMINT1,
					startTime,
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
				expect(dcaInfo.startTime.toString()).to.equal(request.startTime.toString());
				expect(dcaInfo.frequency.toString()).to.equal(frequency.toString());
				expect(dcaInfo.mintAddressTo.toString()).to.equal(DEVNET_QUOTEMINT1.toString());
				expect(dcaInfo.mintAddressFrom.toString()).to.equal(WSOL_MINT.toString());
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
				const differenceInTime = dcaAccount.startTime.sub(clusterTime);
				console.log("delay seconds", Number(differenceInTime) - 18);
				await delay((Number(differenceInTime) - 18) * 1000);
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
		it("should allow transaction after startTime and check token balance", async () => {
			try {
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let dcaVaultBalanceBeforeSwap = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
				const clusterTime = await getClusterTime(CONNECTION["devnet"]);
				const differenceInTime = dcaAccount.startTime.sub(clusterTime);
				console.log("delay seconds", Number(differenceInTime) + 2);
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
				let dcaVaultBalanceAfterSwap = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				let expectedDcaVaultBalanceAfterSwap = dcaVaultBalanceBeforeSwap.sub(dcaAccount.dcaAmount);
				expect(dcaVaultBalanceAfterSwap.toString()).to.equal(expectedDcaVaultBalanceAfterSwap.toString());
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
				const differenceInTime = dcaAccount.startTime.sub(clusterTime);
				console.log("delay second", Number(differenceInTime));
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
		it("withdraw all amount from zebec vault for testing", async () => {
			try {
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let dcaVaultBalanceBeforeWithdraw = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				const withdrawAmount = new Amount(dcaVaultBalanceBeforeWithdraw);
				const _ = await offlineDcaClient.withdrawToken(ownerKeypair.publicKey, WSOL_MINT, withdrawAmount);
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("should throw error when withdraw more than vault balance", async () => {
			try {
				const withdrawAmount = new Amount(new BN("1000"));
				const _ = await offlineDcaClient.withdrawToken(ownerKeypair.publicKey, WSOL_MINT, withdrawAmount);
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
				const differenceInTime = dcaAccount.startTime.sub(clusterTime);
				console.log("delay seconds", Number(differenceInTime));
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
		it("deposit token again to withdraw and check balances", async () => {
			try {
				const depositedAmount = new Amount(new BN("4000"));
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let senderNativeBalanceBeforeDeposit = await getNativeTokenBalance(
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let dcaVaultBalanceBeforeDeposit = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				const {
					data: { signature },
					status,
				} = await offlineDcaClient.depositToken(ownerKeypair.publicKey, WSOL_MINT, depositedAmount);
				let senderNativeBalanceAfterDeposit = await getNativeTokenBalance(ownerKeypair.publicKey, CONNECTION["devnet"]);
				let dcaVaultBalanceAfterDeposit = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				let estimatedFee = await getEstimatedFee(CONNECTION["devnet"], signature);
				let expectedSenderBalanceAfterDeposit = senderNativeBalanceBeforeDeposit
					.sub(depositedAmount)
					.sub(new BN(estimatedFee));
				let expectedDcaVaultBalanceAfterDeposit = dcaVaultBalanceBeforeDeposit.add(depositedAmount);
				expect(expectedSenderBalanceAfterDeposit).to.deep.equal(senderNativeBalanceAfterDeposit);
				expect(expectedDcaVaultBalanceAfterDeposit).to.deep.equal(dcaVaultBalanceAfterDeposit);
				expect(status).to.equal(expectedStatus);
				expect(signature).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
			}
		});
		it("check balances after withdraw successfully", async () => {
			try {
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let dcaVaultBalanceBeforeWithdraw = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				const withdrawAmount = new Amount(new BN("1000"));
				let senderBalanceBeforeWithdraw = await getBalanceOfSplToken(
					WSOL_MINT,
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);

				const {
					data: { signature: signature3 },
					status: status3,
				} = await offlineDcaClient.withdrawToken(ownerKeypair.publicKey, WSOL_MINT, withdrawAmount);
				let dcaVaultBalanceAfterWithdraw = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				let senderBalanceAfterWithdraw = await getBalanceOfSplToken(
					WSOL_MINT,
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
});
