import { PublicKey } from "@solana/web3.js";
export declare class Mint {
    private _address;
    private _decimals;
    static WSOL: PublicKey;
    constructor(address: PublicKey, decimals?: number);
    get address(): PublicKey;
    get decimals(): number;
    static isWSol(address: PublicKey): boolean;
}
