import { BN } from "bn.js";
import { expect } from "chai";
import {
	describe,
	it,
} from "mocha";

import {
	PublicKey,
	SendTransactionError,
	Transaction,
} from "@solana/web3.js";

import { DcaClientFactory } from "../../src/clients";
import { CONNECTION } from "../../src/constants";
import {
	Amount,
	DcaAccount,
} from "../../src/models";
import {
	findAssociatedTokenAddress,
	findVaultAddress,
	getClusterTime,
	nowInSec,
} from "../../src/utils";
import { delay } from "../scenarios/utils";
import {
	DEVNET_BASEMINT,
	DEVNET_QUOTEMINT,
	DEVNET_QUOTEMINT1,
	expectedStatus,
	ownerKeypair,
	WSOL_MINT,
} from "./shared";

const wallet = {
	publicKey: ownerKeypair.publicKey,
	async signTransaction(transaction: Transaction) {
		transaction.partialSign(ownerKeypair);
		return transaction;
	},
	async signAllTransactions(transactions: Transaction[]) {
		transactions.forEach(async (txn) => {
			txn.partialSign(ownerKeypair);
		});
		return transactions;
	},
};

const onlineDcaClient = new DcaClientFactory()
	.setConnection(CONNECTION["devnet"])
	.setCommitment("finalized")
	.setPreflightCommitment("finalized")
	.buildOnlineClient(wallet);

const dcaAccounts: PublicKey[] = [];

describe("Dca online client", async () => {
	describe("Test with token", () => {
		it("depositToken()", async () => {
			try {
				const {
					data: { signature },
					status,
				} = await onlineDcaClient.depositToken(wallet.publicKey, DEVNET_BASEMINT, new Amount(new BN("1000")));
				expect(status).to.equal(expectedStatus);
				expect(signature).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("initialize()", async () => {
			try {
				const {
					data: { signature: signature1, dcaAccount: dcaAccount },
					status: status1,
				} = await onlineDcaClient.initialize(
					wallet.publicKey,
					DEVNET_BASEMINT,
					DEVNET_QUOTEMINT,
					new BN(nowInSec() + 1),
					new Amount(new BN("1000")),
					new BN(3),
				);
				dcaAccounts[0] = dcaAccount;
				expect(status1).to.equal(expectedStatus);
				expect(signature1).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("swap()", async () => {
			try {
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
				const clusterTime = await getClusterTime(CONNECTION["devnet"]);
				const differenceBetweenWallClock = dcaAccount.startTime.sub(clusterTime);
				await delay((Number(differenceBetweenWallClock) + 2) * 1000);
				const {
					data: { signature: signature2 },
					status: status2,
				} = await onlineDcaClient.swap(
					wallet.publicKey,
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
		it("withdrawToken()", async () => {
			try {
				const vault = await findVaultAddress(wallet.publicKey);
				const tokenAccount = await findAssociatedTokenAddress(vault, DEVNET_QUOTEMINT);
				const {
					value: { amount },
				} = await CONNECTION["devnet"].getTokenAccountBalance(tokenAccount, "confirmed");
				const {
					data: { signature: signature3 },
					status: status3,
				} = await onlineDcaClient.withdrawToken(wallet.publicKey, DEVNET_QUOTEMINT, new Amount(new BN(amount)));
				expect(status3).to.equal(expectedStatus);
				expect(signature3).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
	});

	describe("Test with sol", () => {
		it("depositToken()", async () => {
			try {
				const {
					data: { signature },
					status,
				} = await onlineDcaClient.depositToken(wallet.publicKey, WSOL_MINT, new Amount(new BN("1000")));
				expect(status).to.equal(expectedStatus);
				expect(signature).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("initialize()", async () => {
			try {
				const {
					data: { signature: signature1, dcaAccount: dcaAccount },
					status: status1,
				} = await onlineDcaClient.initialize(
					wallet.publicKey,
					WSOL_MINT,
					DEVNET_QUOTEMINT1,
					new BN(nowInSec() + 1),
					new Amount(new BN("1000")),
					new BN(3),
				);
				dcaAccounts[0] = dcaAccount;
				expect(status1).to.equal(expectedStatus);
				expect(signature1).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
		it("swap()", async () => {
			try {
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
				const clusterTime = await getClusterTime(CONNECTION["devnet"]);
				const differenceBetweenWallClock = dcaAccount.startTime.sub(clusterTime);
				await delay((Number(differenceBetweenWallClock) + 2) * 1000);
				const {
					data: { signature: signature2 },
					status: status2,
				} = await onlineDcaClient.swap(
					wallet.publicKey,
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
		it("withdrawToken()", async () => {
			try {
				const vault = await findVaultAddress(wallet.publicKey);
				const tokenAccount = await findAssociatedTokenAddress(vault, DEVNET_QUOTEMINT1);
				const {
					value: { amount },
				} = await CONNECTION["devnet"].getTokenAccountBalance(tokenAccount, "confirmed");
				const {
					data: { signature: signature3 },
					status: status3,
				} = await onlineDcaClient.withdrawToken(wallet.publicKey, DEVNET_QUOTEMINT1, new Amount(new BN(amount)));
				expect(status3).to.equal(expectedStatus);
				expect(signature3).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
	});
});
