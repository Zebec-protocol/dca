import { BN } from "bn.js";
import { expect } from "chai";
import { describe, it } from "mocha";

import { PublicKey } from "@solana/web3.js";

import { CONNECTION } from "../../src/constants";
import { DcaAccount } from "../../src/models";

describe("DcaAccount Test", () => {
	const devnet_authority = new PublicKey("8zERi9tcZPfNPfqLMWvnyFEabArGLzkw491smyg3RvVk");
	const devnet_dca_account = new PublicKey("D5mzEdcBN4dLCebhPmZbHgHJNKNEJafWQbhJHNyydDi5");
	// const mainnet_authority = new PublicKey("DwUpLYhWd2K5eufzuJubmHRheQcUAhwWPV8FYgy7Fg8U");
	// const mainnet_dca_account = new PublicKey("AZaQNMQs7H8FW6fyJWrjdKQDxqPv7FpJFSJqvnoqoy8Q");

	describe("getDcaAccountInfo()", () => {
		it("deserialize and get Dca account data", async () => {
			const actual = await DcaAccount.getDcaAccountInfo(CONNECTION["devnet"], devnet_dca_account);
			expect(actual).to.be.instanceOf(DcaAccount);
			expect(actual.authority).deep.equal(devnet_authority);
			expect(actual.startTime).to.be.instanceOf(BN);
			expect(actual.dcaAmount).to.be.instanceOf(BN);
			expect(actual.frequency).to.be.instanceOf(BN);
			expect(actual.mintAddressFrom).to.be.instanceOf(PublicKey);
			expect(actual.mintAddressTo).to.be.instanceOf(PublicKey);
			expect(actual.state).to.be.true;
		});
	});
});
