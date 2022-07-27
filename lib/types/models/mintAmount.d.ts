import BN from "bn.js";
import { Amount } from "./amount";
import { Mint } from "./mint";
export declare class MintAmount extends Amount {
    private _mint;
    constructor(mint: Mint, amount: BN);
    get mint(): Mint;
    toUiAmount(): string;
}
