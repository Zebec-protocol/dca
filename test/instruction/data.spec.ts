import { describe, it } from "mocha";
import { Buffer } from "buffer";
import {
	DepositTokenData,
	DepositSolData,
	SwapFromSolData,
	SwapToSolData,
	WithdrawTokenData,
	WithdrawSolData,
	FundTokenData,
	FundSolData,
	InitializeData,
} from "../../src/instruction/data";
import { BN } from "bn.js";
import { expect } from "chai";

describe("Instruction data unit test: ", () => {
	describe("DepositTokenData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([0, 0, 101, 205, 29, 0, 0, 0, 0]);
			const reality = new DepositTokenData(new BN("500000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("DepositSolData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([1, 0, 101, 205, 29, 0, 0, 0, 0]);
			const reality = new DepositSolData(new BN("500000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("InitializeData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([
				2, 20, 86, 134, 234, 128, 1, 0, 0, 0, 101, 205, 29, 0, 0, 0, 0, 0, 202, 154, 59, 0, 0, 0, 0, 0, 101, 205, 29, 0,
				0, 0, 0,
			]);
			const reality = new InitializeData(
				new BN("1653202114068"),
				new BN("500000000"),
				new BN("1000000000"),
				new BN("500000000"),
			).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("SwapToSolData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([3, 0, 202, 154, 59, 0, 0, 0, 0]);
			const reality = new SwapToSolData(new BN("1000000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("SwapFromSolData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([4, 0, 202, 154, 59, 0, 0, 0, 0]);
			const reality = new SwapFromSolData(new BN("1000000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("WithdrawTokenData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([5, 0, 101, 205, 29, 0, 0, 0, 0]);
			const reality = new WithdrawTokenData(new BN("500000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("WithdrawSolData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([6, 0, 101, 205, 29, 0, 0, 0, 0]);
			const reality = new WithdrawSolData(new BN("500000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("FundTokenData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([7, 0, 101, 205, 29, 0, 0, 0, 0]);
			const reality = new FundTokenData(new BN("500000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});

	describe("FundSolData object when encoded", () => {
		it("gives output as expected", () => {
			const expectation = Buffer.from([8, 0, 101, 205, 29, 0, 0, 0, 0]);
			const reality = new FundSolData(new BN("500000000")).encode();
			expect(reality).to.deep.equal(expectation);
		});
	});
});
