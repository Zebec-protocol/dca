/// <reference types="node" />
import BN from "bn.js";
declare enum InstructionTypes {
    DepositToken = 0,
    DepositSol = 1,
    Initialize = 2,
    SwapToSol = 3,
    SwapFromSol = 4,
    WithdrawToken = 5,
    WithdrawSol = 6,
    FundToken = 7,
    FundSol = 8
}
export declare class DepositTokenData {
    private _instruction;
    private _amount;
    constructor(amount: BN);
    get instruction(): InstructionTypes;
    get amount(): BN;
    encode(): Buffer;
}
export declare class DepositSolData {
    private _instruction;
    private _amount;
    constructor(amount: BN);
    get instruction(): InstructionTypes;
    get amount(): BN;
    encode(): Buffer;
}
export declare class InitializeData {
    private _instruction;
    private _startTime;
    private _dcaAmount;
    private _dcaTime;
    private _minimumAmountOut;
    constructor(startTime: BN, dcaAmount: BN, dcaTime: BN, minimumAmountOut: BN);
    get instruction(): InstructionTypes;
    get startTime(): BN;
    get dcaAmount(): BN;
    get dcaTime(): BN;
    get minimumAmountOut(): BN;
    encode(): Buffer;
}
export declare class SwapToSolData {
    private _instruction;
    private _minimumAmountOut;
    constructor(minimumAmountOut: BN);
    get instruction(): InstructionTypes;
    get minimumAmountOut(): BN;
    encode(): Buffer;
}
export declare class SwapFromSolData {
    private _instruction;
    private _minimumAmountOut;
    constructor(minimumAmountOut: BN);
    get instruction(): InstructionTypes;
    get minimumAmountOut(): BN;
    encode(): Buffer;
}
export declare class WithdrawTokenData {
    private _instruction;
    private _transferAmount;
    constructor(transferAmount: BN);
    get instruction(): InstructionTypes;
    get transferAmount(): BN;
    encode(): Buffer;
}
export declare class WithdrawSolData {
    private _instruction;
    private _transferAmount;
    constructor(transferAmount: BN);
    get instruction(): InstructionTypes;
    get transferAmount(): BN;
    encode(): Buffer;
}
export declare class FundTokenData {
    private _instruction;
    private _transferAmount;
    constructor(transferAmount: BN);
    get instruction(): InstructionTypes;
    get transferAmount(): BN;
    encode(): Buffer;
}
export declare class FundSolData {
    private _instruction;
    private _transferAmount;
    constructor(transferAmount: BN);
    get instruction(): InstructionTypes;
    get transferAmount(): BN;
    encode(): Buffer;
}
export {};
//# sourceMappingURL=data.d.ts.map