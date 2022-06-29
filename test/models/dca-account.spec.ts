import { BN } from "bn.js";
import { expect } from "chai";
import { describe, it } from "mocha";

import { PublicKey } from "@solana/web3.js";

import { CONNECTION as connection } from "../../src/constants";
import { DcaAccount } from "../../src/models";

describe("DcaAccount Test", () => {
	const authority = new PublicKey("DwUpLYhWd2K5eufzuJubmHRheQcUAhwWPV8FYgy7Fg8U");
	const mintAddress = new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R");

	describe("getDcaAccountInfo()", () => {
		it("deserialize and get Dca account data", async () => {
			const actual = await DcaAccount.getDcaAccountInfo(
				connection,
				new PublicKey("AZaQNMQs7H8FW6fyJWrjdKQDxqPv7FpJFSJqvnoqoy8Q"),
			);
			expect(actual).to.be.instanceOf(DcaAccount);
			expect(actual.totalAmount).to.be.instanceOf(BN);
			expect(actual.authority).deep.equal(authority);
			expect(actual.mintAddress).deep.equal(mintAddress);
			expect(actual.startTime).to.be.instanceOf(BN);
			expect(actual.dcaAmount).to.be.instanceOf(BN);
			expect(actual.dcaTime).to.be.instanceOf(BN);
			expect(actual.minimumAmountOut).to.be.instanceOf(BN);
			expect(actual.state).to.be.true;
			expect(actual.flag).to.equal(2);
		});
	});
});
