import BigNumber from "bignumber.js";
import { BN } from "bn.js";
import { expect } from "chai";
import { convertToLamports, convertToDecimal } from "../../src/utils";

describe("Sol Helper utils test", () => {
	describe("convertToLamports()", () => {
		it("return output as expected", () => {
			const sol = new BigNumber("2");
			const acutal = convertToLamports(sol);

			expect(acutal).to.be.instanceOf(BN);
			expect(acutal).deep.equal(new BN("2000000000"));
		});
	});

	describe("convertToDecimal()", () => {
		it("return output as expected", () => {
			const lamports = new BN("2000000000");
			const acutal = convertToDecimal(lamports);

			expect(acutal).to.be.instanceOf(BigNumber);
			expect(acutal).deep.equal(new BigNumber("2"));
		});
	});
});
