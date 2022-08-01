import { BN } from "bn.js";
import { expect } from "chai";
import { describe } from "mocha";

import { SendTransactionError } from "@solana/web3.js";

import { DcaClientFactory } from "../../src/clients";
import { CONNECTION } from "../../src/constants";
import { Amount } from "../../src/models";
import { findVaultAddress } from "../../src/utils";
import { DEVNET_BASEMINT, expectedStatus, ownerKeypair, WSOL_MINT } from "../clients/shared";
import { getBalanceOfSplToken, getNativeTokenBalance } from "./utils";

const offlineDcaClient = new DcaClientFactory()
	.setConnection(CONNECTION["devnet"])
	.setCommitment("finalized")
	.setPreflightCommitment("processed")
	.buildOfflineClient(ownerKeypair);

describe("Deposit Token Scenerio", async () => {
	describe("Test with token", () => {
		it("depositToken()", async () => {
			try {
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
				} = await offlineDcaClient.depositToken(ownerKeypair.publicKey, DEVNET_BASEMINT, new Amount(new BN("1000")));
				let senderBalanceAfterDeposit = await getBalanceOfSplToken(
					DEVNET_BASEMINT,
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let dcaVaultBalanceAfterDeposit = await getBalanceOfSplToken(DEVNET_BASEMINT, vault, CONNECTION["devnet"]);
				let expectedSenderBalanceAfterDeposit = senderBalanceBeforeDeposit.sub(new BN("1000"));
				let expectedDcaVaultBalanceAfterDeposit = dcaVaultBalanceBeforeDeposit.add(new BN("1000"));
				expect(expectedSenderBalanceAfterDeposit).to.deep.equal(senderBalanceAfterDeposit);
				expect(expectedDcaVaultBalanceAfterDeposit).to.deep.equal(dcaVaultBalanceAfterDeposit);
				expect(status).to.equal(expectedStatus);
				expect(signature).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
	});

	describe("Deposit Sol Scenerio", () => {
		it("depositSol()", async () => {
			try {
				const vault = await findVaultAddress(ownerKeypair.publicKey);
				let senderBalanceBeforeDepositNative = await getNativeTokenBalance(
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let senderBalanceBeforeDeposit = await getBalanceOfSplToken(
					WSOL_MINT,
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let dcaVaultBalanceBeforeDeposit = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				let dcaVaultBalanceBeforeDepositNative = await getNativeTokenBalance(vault, CONNECTION["devnet"]);
				const {
					data: { signature },
					status,
				} = await offlineDcaClient.depositToken(ownerKeypair.publicKey, WSOL_MINT, new Amount(new BN("1000")));
				let senderBalanceAfterDeposit = await getBalanceOfSplToken(
					WSOL_MINT,
					ownerKeypair.publicKey,
					CONNECTION["devnet"],
				);
				let senderBalanceAfterDepositNative = await getNativeTokenBalance(ownerKeypair.publicKey, CONNECTION["devnet"]);
				let dcaVaultBalanceAfterDeposit = await getBalanceOfSplToken(WSOL_MINT, vault, CONNECTION["devnet"]);
				let dcaVaultBalanceAfterDepositNative = await getNativeTokenBalance(vault, CONNECTION["devnet"]);
				console.log("dcaVaultBalanceBeforeDeposit", dcaVaultBalanceBeforeDeposit.toString());
				console.log("dcaVaultBalanceBeforeDepositNative", dcaVaultBalanceBeforeDepositNative.toString());
				console.log("dcaVaultBalanceAfterDeposit", dcaVaultBalanceAfterDeposit.toString());
				console.log("dcaVaultBalanceAfterDepositNative", dcaVaultBalanceAfterDepositNative.toString());
				console.log("senderBalanceAfterDeposit", senderBalanceAfterDeposit.toString());
				console.log("senderBalanceBeforeDeposit", senderBalanceBeforeDeposit.toString());
				console.log("senderBalanceBeforeDepositNative", senderBalanceBeforeDepositNative.toString());
				console.log("senderBalanceAfterDepositNative", senderBalanceAfterDepositNative.toString());
				let expectedSenderBalanceAfterDeposit = senderBalanceBeforeDeposit.sub(new BN("1000"));
				let expectedDcaVaultBalanceAfterDeposit = dcaVaultBalanceBeforeDeposit.add(new BN("1000"));
				expect(expectedSenderBalanceAfterDeposit).to.deep.equal(senderBalanceAfterDeposit);
				expect(expectedDcaVaultBalanceAfterDeposit).to.deep.equal(dcaVaultBalanceAfterDeposit);
				expect(status).to.equal(expectedStatus);
				expect(signature).not.to.be.undefined;
			} catch (error) {
				console.log(error instanceof SendTransactionError ? error.logs : error);
				throw error;
			}
		});
	});
});
