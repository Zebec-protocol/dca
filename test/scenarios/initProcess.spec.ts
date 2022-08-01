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

const offlineDcaClient = new DcaClientFactory()
	.setConnection(CONNECTION["devnet"])
	.setCommitment("finalized")
	.setPreflightCommitment("processed")
	.buildOfflineClient(ownerKeypair);

describe("Test scenarios of Init Dca Process", async () => {
	describe("Test with token", () => {
		it("initialize()", async () => {
			try {
				const startTime = new BN(nowInSec() + 1);
				const amount = new Amount(new BN("1000"));
				const frequency = new BN(3);
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
				const dcaInfo = await DcaAccount.getDcaAccountInfo(
					CONNECTION["devnet"],
					new PublicKey(dcaAccount.toString()),
					"confirmed",
				);
				expect(dcaInfo.authority.toString()).to.equal(ownerKeypair.publicKey.toString());
				expect(dcaInfo.dcaAmount.toString()).to.equal(amount.toString());
				expect(dcaInfo.startTime.toString()).to.equal(startTime.toString());
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
	});

	describe("Test with sol", () => {
		it("initialize()", async () => {
			try {
				const amount = new Amount(new BN("1000"));
				const startTime = new BN(nowInSec() + 1);
				const frequency = new BN(3);
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
				const dcaInfo = await DcaAccount.getDcaAccountInfo(
					CONNECTION["devnet"],
					new PublicKey(dcaAccount.toString()),
					"confirmed",
				);
				expect(dcaInfo.authority.toString()).to.equal(ownerKeypair.publicKey.toString());
				expect(dcaInfo.dcaAmount.toString()).to.equal(amount.toString());
				expect(dcaInfo.startTime.toString()).to.equal(startTime.toString());
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
	});
});
