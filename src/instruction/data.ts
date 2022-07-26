import BN from "bn.js";
import { serialize } from "borsh";

enum InstructionTypes {
	DepositToken,
	Initialize,
	Swap,
	WithdrawToken,
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

export class InitializeData {
	private _instruction: InstructionTypes;
	private _startTime: BN;
	private _dcaAmount: BN;
	private _frequency: BN;

	constructor(startTime: BN, dcaAmount: BN, frequency: BN) {
		this._instruction = InstructionTypes.Initialize;
		this._startTime = startTime;
		this._dcaAmount = dcaAmount;
		this._frequency = frequency;
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
	public get frequency(): BN {
		return this._frequency;
	}

	encode() {
		return Buffer.from(serialize(initializeSchema, this));
	}
}

export class SwapData {
	private _instruction: InstructionTypes;
	private _minimumAmountOut: BN;

	constructor(minimumAmountOut: BN) {
		this._instruction = InstructionTypes.Swap;
		this._minimumAmountOut = minimumAmountOut;
	}

	public get instruction(): InstructionTypes {
		return this._instruction;
	}

	public get minimumAmountOut(): BN {
		return this._minimumAmountOut;
	}

	encode() {
		return Buffer.from(serialize(swapSchema, this));
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
				["frequency", "u64"],
			],
		},
	],
]);

const swapSchema = new Map([
	[
		SwapData,
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
