import { BN } from "bn.js";
import { expect } from "chai";
import { describe } from "mocha";

import { PublicKey, SendTransactionError } from "@solana/web3.js";

import { DcaClientFactory } from "../../src/clients";
import { CONNECTION } from "../../src/constants";
import { Amount, DcaAccount } from "../../src/models";
import { findAssociatedTokenAddress, findVaultAddress } from "../../src/utils";
import {
	DEVNET_BASEMINT,
	DEVNET_QUOTEMINT,
	DEVNET_QUOTEMINT1,
	expectedStatus,
	nowInSec,
	ownerKeypair,
	WSOL_MINT,
} from "./shared";

const offlineDcaClient = new DcaClientFactory()
	.setConnection(CONNECTION["devnet"])
	.setCommitment("finalized")
	.setPreflightCommitment("processed")
	.buildOfflineClient(ownerKeypair);

describe("Dca offline client", async () => {
	describe("Test with token", () => {
		const dcaAccounts: PublicKey[] = [];

		it("depositToken()", async () => {
			try {
				const {
					data: { signature },
					status,
				} = await offlineDcaClient.depositToken(ownerKeypair.publicKey, DEVNET_BASEMINT, new Amount(new BN("1000")));
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
				} = await offlineDcaClient.initialize(
					ownerKeypair.publicKey,
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
				console.log(dcaAccounts[0].toString());
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
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
		it("withdrawToken()", async () => {
			try {
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				const tokenAccount = await findAssociatedTokenAddress(vault, DEVNET_QUOTEMINT);
				const {
					value: { amount },
				} = await CONNECTION["devnet"].getTokenAccountBalance(tokenAccount, "confirmed");
				const {
					data: { signature: signature3 },
					status: status3,
				} = await offlineDcaClient.withdrawToken(ownerKeypair.publicKey, DEVNET_QUOTEMINT, new Amount(new BN(amount)));
				expect(status3).to.equal(expectedStatus);
				expect(signature3).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
	});

	describe("Test with sol", () => {
		const dcaAccounts: PublicKey[] = [];

		it("depositToken()", async () => {
			try {
				const {
					data: { signature },
					status,
				} = await offlineDcaClient.depositToken(ownerKeypair.publicKey, WSOL_MINT, new Amount(new BN("1000")));
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
				} = await offlineDcaClient.initialize(
					ownerKeypair.publicKey,
					WSOL_MINT,
					DEVNET_QUOTEMINT1,
					new BN(nowInSec() + 1),
					new Amount(new BN("1000")),
					new BN(3),
				);
				console.log(dcaAccount.toString());
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
				console.log(dcaAccounts[0].toString());
				const dcaAccount = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], dcaAccounts[0], "confirmed");
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
		it("withdrawToken()", async () => {
			try {
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				const tokenAccount = await findAssociatedTokenAddress(vault, DEVNET_QUOTEMINT1);
				const {
					value: { amount },
				} = await CONNECTION["devnet"].getTokenAccountBalance(tokenAccount, "confirmed");
				const {
					data: { signature: signature3 },
					status: status3,
				} = await offlineDcaClient.withdrawToken(ownerKeypair.publicKey, DEVNET_QUOTEMINT1, new Amount(new BN(amount)));
				expect(status3).to.equal(expectedStatus);
				expect(signature3).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
	});
});
