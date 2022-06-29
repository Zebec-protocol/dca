import BigNumber from "bignumber.js";
import { expect } from "chai";
import { describe, it } from "mocha";

import { DcaClientFactory } from "../../src/clients";
import { CONNECTION as connection } from "../../src/constants";
import { expectedStatus, MINT1, MINT2, nowInSec, ownerKeypair } from "./shared";

const dcaOfflineClient = new DcaClientFactory()
	.setConnection(connection)
	.setCommitment("finalized")
	.setPreflightCommitment("finalized")
	.buildOfflineClient(ownerKeypair);

describe("Dca offline client", async () => {
	describe("Test from token to sol process", () => {
		it("should pass", async () => {
			const {
				data: { dcaAccount, signature },
				status,
			} = await dcaOfflineClient.depositToken(ownerKeypair.publicKey, MINT1, new BigNumber("0.001"));
			console.log("dca account", dcaAccount.toString());
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;

			const {
				data: { signature: signature1 },
				status: status1,
			} = await dcaOfflineClient.initialize(
				ownerKeypair.publicKey,
				MINT1,
				dcaAccount,
				new BigNumber(nowInSec() + 120),
				new BigNumber(0.001),
				new BigNumber(3000),
			);
			expect(status1).to.equal(expectedStatus);
			expect(signature1).not.to.be.undefined;

			const {
				data: { signature: signature4 },
				status: status4,
			} = await dcaOfflineClient.fundToken(ownerKeypair.publicKey, MINT1, dcaAccount, new BigNumber(0.001));
			expect(status4).to.equal(expectedStatus);
			expect(signature4).not.to.be.undefined;
		});
	});

	describe("Test from sol to token process", () => {
		it("should pass", async () => {
			const {
				data: { signature, dcaAccount },
				status,
			} = await dcaOfflineClient.depositSol(ownerKeypair.publicKey, MINT2, new BigNumber("0.00001"));
			console.log("dca account", dcaAccount.toString());
			expect(status).to.equal(expectedStatus);
			expect(signature).not.to.be.undefined;

			const {
				data: { signature: signature1 },
				status: status1,
			} = await dcaOfflineClient.initialize(
				ownerKeypair.publicKey,
				MINT2,
				dcaAccount,
				new BigNumber(nowInSec() + 120),
				new BigNumber(0.00001),
				new BigNumber(3000),
			);
			expect(status1).to.equal(expectedStatus);
			expect(signature1).not.to.be.undefined;

			const {
				data: { signature: signature4 },
				status: status4,
			} = await dcaOfflineClient.fundSol(ownerKeypair.publicKey, MINT2, dcaAccount, new BigNumber(0.000001));
			expect(status4).to.equal(expectedStatus);
			expect(signature4).not.to.be.undefined;
		});
	});
});
