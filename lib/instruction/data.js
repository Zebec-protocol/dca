"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundSolData = exports.FundTokenData = exports.WithdrawSolData = exports.WithdrawTokenData = exports.SwapFromSolData = exports.SwapToSolData = exports.InitializeData = exports.DepositSolData = exports.DepositTokenData = void 0;
const borsh_1 = require("borsh");
var InstructionTypes;
(function (InstructionTypes) {
    InstructionTypes[InstructionTypes["DepositToken"] = 0] = "DepositToken";
    InstructionTypes[InstructionTypes["DepositSol"] = 1] = "DepositSol";
    InstructionTypes[InstructionTypes["Initialize"] = 2] = "Initialize";
    InstructionTypes[InstructionTypes["SwapToSol"] = 3] = "SwapToSol";
    InstructionTypes[InstructionTypes["SwapFromSol"] = 4] = "SwapFromSol";
    InstructionTypes[InstructionTypes["WithdrawToken"] = 5] = "WithdrawToken";
    InstructionTypes[InstructionTypes["WithdrawSol"] = 6] = "WithdrawSol";
    InstructionTypes[InstructionTypes["FundToken"] = 7] = "FundToken";
    InstructionTypes[InstructionTypes["FundSol"] = 8] = "FundSol";
})(InstructionTypes || (InstructionTypes = {}));
class DepositTokenData {
    constructor(amount) {
        this._instruction = InstructionTypes.DepositToken;
        this._amount = amount;
    }
    get instruction() {
        return this._instruction;
    }
    get amount() {
        return this._amount;
    }
    encode() {
        return Buffer.from((0, borsh_1.serialize)(depositTokenSchema, this));
    }
}
exports.DepositTokenData = DepositTokenData;
class DepositSolData {
    constructor(amount) {
        this._instruction = InstructionTypes.DepositSol;
        this._amount = amount;
    }
    get instruction() {
        return this._instruction;
    }
    get amount() {
        return this._amount;
    }
    encode() {
        return Buffer.from((0, borsh_1.serialize)(depositSolSchema, this));
    }
}
exports.DepositSolData = DepositSolData;
class InitializeData {
    constructor(startTime, dcaAmount, dcaTime, minimumAmountOut) {
        this._instruction = InstructionTypes.Initialize;
        this._startTime = startTime;
        this._dcaAmount = dcaAmount;
        this._dcaTime = dcaTime;
        this._minimumAmountOut = minimumAmountOut;
    }
    get instruction() {
        return this._instruction;
    }
    get startTime() {
        return this._startTime;
    }
    get dcaAmount() {
        return this._dcaAmount;
    }
    get dcaTime() {
        return this._dcaTime;
    }
    get minimumAmountOut() {
        return this._minimumAmountOut;
    }
    encode() {
        return Buffer.from((0, borsh_1.serialize)(initializeSchema, this));
    }
}
exports.InitializeData = InitializeData;
class SwapToSolData {
    constructor(minimumAmountOut) {
        this._instruction = InstructionTypes.SwapToSol;
        this._minimumAmountOut = minimumAmountOut;
    }
    get instruction() {
        return this._instruction;
    }
    get minimumAmountOut() {
        return this._minimumAmountOut;
    }
    encode() {
        return Buffer.from((0, borsh_1.serialize)(swapToSolSchema, this));
    }
}
exports.SwapToSolData = SwapToSolData;
class SwapFromSolData {
    constructor(minimumAmountOut) {
        this._instruction = InstructionTypes.SwapFromSol;
        this._minimumAmountOut = minimumAmountOut;
    }
    get instruction() {
        return this._instruction;
    }
    get minimumAmountOut() {
        return this._minimumAmountOut;
    }
    encode() {
        return Buffer.from((0, borsh_1.serialize)(swapFromSolSchema, this));
    }
}
exports.SwapFromSolData = SwapFromSolData;
class WithdrawTokenData {
    constructor(transferAmount) {
        this._instruction = InstructionTypes.WithdrawToken;
        this._transferAmount = transferAmount;
    }
    get instruction() {
        return this._instruction;
    }
    get transferAmount() {
        return this._transferAmount;
    }
    encode() {
        return Buffer.from((0, borsh_1.serialize)(withdrawTokenSchema, this));
    }
}
exports.WithdrawTokenData = WithdrawTokenData;
class WithdrawSolData {
    constructor(transferAmount) {
        this._instruction = InstructionTypes.WithdrawSol;
        this._transferAmount = transferAmount;
    }
    get instruction() {
        return this._instruction;
    }
    get transferAmount() {
        return this._transferAmount;
    }
    encode() {
        return Buffer.from((0, borsh_1.serialize)(withdrawSolSchema, this));
    }
}
exports.WithdrawSolData = WithdrawSolData;
class FundTokenData {
    constructor(transferAmount) {
        this._instruction = InstructionTypes.FundToken;
        this._transferAmount = transferAmount;
    }
    get instruction() {
        return this._instruction;
    }
    get transferAmount() {
        return this._transferAmount;
    }
    encode() {
        return Buffer.from((0, borsh_1.serialize)(fundTokenSchema, this));
    }
}
exports.FundTokenData = FundTokenData;
class FundSolData {
    constructor(transferAmount) {
        this._instruction = InstructionTypes.FundSol;
        this._transferAmount = transferAmount;
    }
    get instruction() {
        return this._instruction;
    }
    get transferAmount() {
        return this._transferAmount;
    }
    encode() {
        return Buffer.from((0, borsh_1.serialize)(fundSolSchema, this));
    }
}
exports.FundSolData = FundSolData;
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
//# sourceMappingURL=data.js.map