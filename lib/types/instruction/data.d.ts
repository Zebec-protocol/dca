/// <reference types="node" />
import BN from "bn.js";
declare enum InstructionTypes {
    DepositToken = 0,
    Initialize = 1,
    Swap = 2,
    WithdrawToken = 3
}
export declare class DepositTokenData {
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
    private _frequency;
    constructor(startTime: BN, dcaAmount: BN, frequency: BN);
    get instruction(): InstructionTypes;
    get startTime(): BN;
    get dcaAmount(): BN;
    get frequency(): BN;
    encode(): Buffer;
}
export declare class SwapData {
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
export {};
