import BN from "bn.js";
import { serialize } from "borsh";

export enum InstructionTypes {
    DepositToken,
    DepositSol,
    Initialize,
    SwapToSol,
    SwapFromSol,
    WithdrawToken,
    WithdrawSol,
    FundToken,
    FundSol
}

export class DepositTokenData {
    private instruction: InstructionTypes;
    private amount: BN;

    constructor(param: {
        amount: BN
    }) {
        this.instruction = InstructionTypes.DepositToken;
        this.amount = param.amount;
    }

    encode() {
        return Buffer.from(serialize(depositTokenSchema, this));
    }
}

export class DepositSolData {
    private instruction: InstructionTypes;
    private amount: BN;

    constructor(param: {
        amount: BN
    }) {
        this.instruction = InstructionTypes.DepositSol;
        this.amount = param.amount;
    }

    encode() {
        return Buffer.from(serialize(depositSolSchema, this));
    }
}

export class InitializeData {
    private instruction: InstructionTypes;
    private startTime: BN;
    private dcaAmount: BN;
    private dcaTime: BN;
    private minimumAmountOut: BN;

    constructor(param: {
        startTime: BN,
        dcaAmount: BN,
        dcaTime: BN,
        minimumAmountOut: BN
    }) {
        this.instruction = InstructionTypes.Initialize;
        this.startTime = param.startTime;
        this.dcaAmount = param.dcaAmount;
        this.dcaTime = param.dcaTime;
        this.minimumAmountOut = param.minimumAmountOut;
    }

    encode() {
        return Buffer.from(serialize(initializeSchema, this))
    }
}

export class SwapToSolData {
    private instruction: InstructionTypes;
    private minimumAmountOut: BN;

    constructor(param: {
        minimumAmountOut: BN
    }) {
        this.instruction = InstructionTypes.SwapToSol;
        this.minimumAmountOut = param.minimumAmountOut;
    }

    encode() {
        return Buffer.from(serialize(swapToSolSchema, this))
    }
}

export class SwapFromSolData {
    private instruction: InstructionTypes;
    private minimumAmountOut: BN;

    constructor(param: {
        minimumAmountOut: BN
    }) {
        this.instruction = InstructionTypes.SwapFromSol;
        this.minimumAmountOut = param.minimumAmountOut;
    }

    encode() {
        return Buffer.from(serialize(swapFromSolSchema, this))
    }
}

export class WithdrawTokenData {
    private instruction: InstructionTypes;
    private transferAmount: BN;

    constructor(param: {
        transferAmount: BN
    }) {
        this.instruction = InstructionTypes.WithdrawToken;
        this.transferAmount = param.transferAmount;
    }

    encode() {
        return Buffer.from(serialize(withdrawTokenSchema, this))
    }
}

export class WithdrawSolData {
    private instruction: InstructionTypes;
    private transferAmount: BN;

    constructor(param: {
        transferAmount: BN
    }) {
        this.instruction = InstructionTypes.WithdrawSol;
        this.transferAmount = param.transferAmount;
    }

    encode() {
        return Buffer.from(serialize(withdrawSolSchema, this))
    }
}

export class FundTokenData {
    private instruction: InstructionTypes;
    private transferAmount: BN;

    constructor(param: {
        transferAmount: BN
    }) {
        this.instruction = InstructionTypes.FundToken;
        this.transferAmount = param.transferAmount;
    }

    encode() {
        return Buffer.from(serialize(fundTokenSchema, this))
    }
}

export class FundSolData {
    private instruction: InstructionTypes;
    private transferAmount: BN;

    constructor(param: {
        transferAmount: BN
    }) {
        this.instruction = InstructionTypes.FundSol;
        this.transferAmount = param.transferAmount;
    }

    encode() {
        return Buffer.from(serialize(fundSolSchema, this))
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
        }
    ]
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
                ["minimumAmountOut", "u64"]
            ]
        }
    ]
])

const depositSolSchema = new Map([
    [
        DepositSolData,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u64"],
            ],
        }
    ]
]);

const swapToSolSchema = new Map([
    [
        SwapToSolData,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["minimumAmountOut", "u64"],
            ]
        }
    ]
]);

const swapFromSolSchema = new Map([
    [
        SwapFromSolData,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["minimumAmountOut", "u64"],
            ]
        }
    ]
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
        }
    ]
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
        }
    ]
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
        }
    ]
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
        }
    ]
]);