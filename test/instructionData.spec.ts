import { describe, it } from "mocha";
import { Buffer } from "buffer";
import { InstructionTypes, DepositTokenData, DepositSolData, SwapFromSolData, SwapToSolData, WithdrawTokenData, WithdrawSolData, FundTokenData, FundSolData, InitializeData } from "../src/instructionData";
import { BN } from "bn.js";
import { expect } from "chai";

describe("Instruction data unit test: ", () => {
    describe("DepositTokenData", () => {
        it("should give output as expected", () => {
            const expectation = Buffer.from([0, 0, 101, 205, 29, 0, 0, 0, 0]);
            const reality = new DepositTokenData({
                amount: new BN("500000000")
            }).encode();
            expect(reality).to.deep.equal(expectation);
        })
    })

    describe("DepositSolData", () => {
        it("should give output as expected", () => {
            const expectation = Buffer.from([1, 0, 101, 205, 29, 0, 0, 0, 0]);
            const reality = new DepositSolData({
                amount: new BN("500000000")
            }).encode();
            expect(reality).to.deep.equal(expectation);
        })
    })

    describe("InitializeData", () => {
        it("should give output as expected", () => {
            const expectation = Buffer.from([2, 20, 86, 134, 234, 128, 1, 0, 0, 0, 101, 205, 29,
                0, 0, 0, 0, 0, 202, 154, 59, 0, 0, 0, 0, 0, 101, 205, 29, 0, 0, 0, 0]);
            const reality = new InitializeData({
                startTime: new BN("1653202114068"),
                dcaAmount: new BN("500000000"),
                dcaTime: new BN("1000000000"),
                minimumAmountOut: new BN("500000000")
            }).encode();
            expect(reality).to.deep.equal(expectation);
        })
    })

    describe("SwapToSolData", () => {
        it("should give output as expected", () => {
            const expectation = Buffer.from([3, 0, 202, 154, 59, 0, 0, 0, 0]);
            const reality = new SwapToSolData({
                minimumAmountOut: new BN("1000000000")
            }).encode();
            expect(reality).to.deep.equal(expectation);
        })
    })

    describe("SwapFromSolData", () => {
        it("should give output as expected", () => {
            const expectation = Buffer.from([4, 0, 202, 154, 59, 0, 0, 0, 0]);
            const reality = new SwapFromSolData({
                minimumAmountOut: new BN("1000000000")
            }).encode();
            expect(reality).to.deep.equal(expectation);
        })
    })

    describe("WithdrawTokenData", () => {
        it("should give output as expected", () => {
            const expectation = Buffer.from([5, 0, 101, 205, 29, 0, 0, 0, 0]);
            const reality = new WithdrawTokenData({
                transferAmount: new BN("500000000")
            }).encode();
            expect(reality).to.deep.equal(expectation);
        })
    })

    describe("WithdrawSolData", () => {
        it("should give output as expected", () => {
            const expectation = Buffer.from([6, 0, 101, 205, 29, 0, 0, 0, 0]);
            const reality = new WithdrawSolData({
                transferAmount: new BN("500000000")
            }).encode();
            expect(reality).to.deep.equal(expectation);
        })
    })

    describe("FundTokenData", () => {
        it("should give output as expected", () => {
            const expectation = Buffer.from([7, 0, 101, 205, 29, 0, 0, 0, 0]);
            const reality = new FundTokenData({
                transferAmount: new BN("500000000")
            }).encode();
            expect(reality).to.deep.equal(expectation);
        })
    })

    describe("FundSolData", () => {
        it("should give output as expected", () => {
            const expectation = Buffer.from([8, 0, 101, 205, 29, 0, 0, 0, 0]);
            const reality = new FundSolData({
                transferAmount: new BN("500000000")
            }).encode();
            expect(reality).to.deep.equal(expectation);
        })
    })
})