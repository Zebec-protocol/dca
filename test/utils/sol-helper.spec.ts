import BigNumber from "bignumber.js";
import { BN } from "bn.js";
import { expect } from "chai";
import { describe, it } from "mocha";

import { convertToDecimal, convertToLamports } from "../../src/utils";

describe("Sol Helper utils test", () => {
	describe("convertToLamports()", () => {
		it("return output as expected", () => {
			const sol = new BigNumber("2");
			const actual = convertToLamports(Number(sol));
			expect(actual).to.be.instanceOf(BN);
			expect(actual).deep.equal(new BN("2000000000"));
		});
	});

	describe("convertToDecimal()", () => {
		it("return output as expected", () => {
			const lamports = new BN("2000000000");
			const actual = convertToDecimal(lamports);
			expect(actual).to.be.instanceOf(BN);
			expect(actual).deep.equal(new BN("2"));
		});
	});
});
