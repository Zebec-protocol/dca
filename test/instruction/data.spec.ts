// import BN from "bn.js";
// import { Buffer } from "buffer";
// import { expect } from "chai";
// import { describe, it } from "mocha";

import { BN } from "bn.js";
import { expect } from "chai";

import {
	DepositTokenData,
	InitializeData,
	SwapData,
	WithdrawTokenData,
} from "../../src/instruction/data";

describe("Instruction data unit test: ", () => {
	describe("DepositTokenData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([0, 0, 101, 205, 29, 0, 0, 0, 0]);
			const reality = new DepositTokenData(new BN("500000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("InitializeData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([
				1, 20, 86, 134, 234, 128, 1, 0, 0, 0, 101, 205, 29, 0, 0, 0, 0, 0, 202, 154, 59, 0, 0, 0, 0,
			]);
			const reality = new InitializeData(new BN("1653202114068"), new BN("500000000"), new BN("1000000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("SwapToSolData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([2, 0, 202, 154, 59, 0, 0, 0, 0]);
			const reality = new SwapData(new BN("1000000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("WithdrawTokenData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([3, 0, 101, 205, 29, 0, 0, 0, 0]);
			const reality = new WithdrawTokenData(new BN("500000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});
});
