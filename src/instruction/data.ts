import BN from "bn.js";
import { serialize } from "borsh";

enum InstructionTypes {
	DepositToken,
	DepositSol,
	Initialize,
	SwapToSol,
	SwapFromSol,
	WithdrawToken,
	WithdrawSol,
	FundToken,
	FundSol,
}

export class DepositTokenData {
	private _instruction: InstructionTypes;
	private _amount: BN;

	constructor(amount: BN) {
		this._instruction = InstructionTypes.DepositToken;
		this._amount = amount;
	}

	public get instruction(): InstructionTypes {
		return this._instruction;
	}

	public get amount(): BN {
		return this._amount;
	}

	encode() {
		return Buffer.from(serialize(depositTokenSchema, this));
	}
}

export class DepositSolData {
	private _instruction: InstructionTypes;
	private _amount: BN;

	constructor(amount: BN) {
		this._instruction = InstructionTypes.DepositSol;
		this._amount = amount;
	}

	public get instruction(): InstructionTypes {
		return this._instruction;
	}

	public get amount(): BN {
		return this._amount;
	}

	encode() {
		return Buffer.from(serialize(depositSolSchema, this));
	}
}

export class InitializeData {
	private _instruction: InstructionTypes;
	private _startTime: BN;
	private _dcaAmount: BN;
	private _dcaTime: BN;

	constructor(startTime: BN, dcaAmount: BN, dcaTime: BN) {
		this._instruction = InstructionTypes.Initialize;
		this._startTime = startTime;
		this._dcaAmount = dcaAmount;
		this._dcaTime = dcaTime;
	}

	public get instruction(): InstructionTypes {
		return this._instruction;
	}
	public get startTime(): BN {
		return this._startTime;
	}
	public get dcaAmount(): BN {
		return this._dcaAmount;
	}
	public get dcaTime(): BN {
		return this._dcaTime;
	}

	encode() {
		return Buffer.from(serialize(initializeSchema, this));
	}
}

export class SwapToSolData {
	private _instruction: InstructionTypes;
	private _minimumAmountOut: BN;

	constructor(minimumAmountOut: BN) {
		this._instruction = InstructionTypes.SwapToSol;
		this._minimumAmountOut = minimumAmountOut;
	}

	public get instruction(): InstructionTypes {
		return this._instruction;
	}

	public get minimumAmountOut(): BN {
		return this._minimumAmountOut;
	}

	encode() {
		return Buffer.from(serialize(swapToSolSchema, this));
	}
}

export class SwapFromSolData {
	private _instruction: InstructionTypes;
	private _minimumAmountOut: BN;

	constructor(minimumAmountOut: BN) {
		this._instruction = InstructionTypes.SwapFromSol;
		this._minimumAmountOut = minimumAmountOut;
	}

	public get instruction(): InstructionTypes {
		return this._instruction;
	}

	public get minimumAmountOut(): BN {
		return this._minimumAmountOut;
	}

	encode() {
		return Buffer.from(serialize(swapFromSolSchema, this));
	}
}

export class WithdrawTokenData {
	private _instruction: InstructionTypes;
	private _transferAmount: BN;

	constructor(transferAmount: BN) {
		this._instruction = InstructionTypes.WithdrawToken;
		this._transferAmount = transferAmount;
	}

	public get instruction(): InstructionTypes {
		return this._instruction;
	}

	public get transferAmount(): BN {
		return this._transferAmount;
	}

	encode() {
		return Buffer.from(serialize(withdrawTokenSchema, this));
	}
}

export class WithdrawSolData {
	private _instruction: InstructionTypes;
	private _transferAmount: BN;

	constructor(transferAmount: BN) {
		this._instruction = InstructionTypes.WithdrawSol;
		this._transferAmount = transferAmount;
	}

	public get instruction(): InstructionTypes {
		return this._instruction;
	}

	public get transferAmount(): BN {
		return this._transferAmount;
	}

	encode() {
		return Buffer.from(serialize(withdrawSolSchema, this));
	}
}

export class FundTokenData {
	private _instruction: InstructionTypes;
	private _transferAmount: BN;

	constructor(transferAmount: BN) {
		this._instruction = InstructionTypes.FundToken;
		this._transferAmount = transferAmount;
	}

	public get instruction(): InstructionTypes {
		return this._instruction;
	}

	public get transferAmount(): BN {
		return this._transferAmount;
	}

	encode() {
		return Buffer.from(serialize(fundTokenSchema, this));
	}
}

export class FundSolData {
	private _instruction: InstructionTypes;
	private _transferAmount: BN;

	constructor(transferAmount: BN) {
		this._instruction = InstructionTypes.FundSol;
		this._transferAmount = transferAmount;
	}

	public get instruction(): InstructionTypes {
		return this._instruction;
	}

	public get transferAmount(): BN {
		return this._transferAmount;
	}

	encode() {
		return Buffer.from(serialize(fundSolSchema, this));
	}
}

const depositTokenSchema = new Map([
	[
		DepositTokenData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["amount", "u64"],
			],
		},
	],
]);

const initializeSchema = new Map([
	[
		InitializeData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["startTime", "u64"],
				["dcaAmount", "u64"],
				["dcaTime", "u64"],
			],
		},
	],
]);

const depositSolSchema = new Map([
	[
		DepositSolData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["amount", "u64"],
			],
		},
	],
]);

const swapToSolSchema = new Map([
	[
		SwapToSolData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["minimumAmountOut", "u64"],
			],
		},
	],
]);

const swapFromSolSchema = new Map([
	[
		SwapFromSolData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["minimumAmountOut", "u64"],
			],
		},
	],
]);

const withdrawTokenSchema = new Map([
	[
		WithdrawTokenData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["transferAmount", "u64"],
			],
		},
	],
]);

const withdrawSolSchema = new Map([
	[
		WithdrawSolData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["transferAmount", "u64"],
			],
		},
	],
]);

const fundTokenSchema = new Map([
	[
		FundTokenData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["transferAmount", "u64"],
			],
		},
	],
]);

const fundSolSchema = new Map([
	[
		FundSolData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["transferAmount", "u64"],
			],
		},
	],
]);
