import BigNumber from "bignumber.js";
import BN from "bn.js";
export declare function parseBigNumber(amount: number, decimals: number): BigNumber;
export declare class Amount extends BN {
    protected _amount: BN;
    constructor(amount: BN);
    get amount(): BN;
    toUiAmount(): string;
}
