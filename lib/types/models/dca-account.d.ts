/// <reference types="node" />
import BN from "bn.js";
import { Commitment, Connection, PublicKey } from "@solana/web3.js";
/**
 * The class for the dca account state in DCA program
 */
export declare class DcaAccount {
    private _totalAmount;
    private _authority;
    private _mintAddress;
    private _startTime;
    private _dcaAmount;
    private _dcaTime;
    private _flag;
    private _state;
    private _minimumAmountOut;
    constructor(param: {
        totalAmount: BN;
        authority: Uint8Array;
        mintAddress: Uint8Array;
        startTime: BN;
        dcaAmount: BN;
        dcaTime: BN;
        flag: number;
        state: number;
        minimumAmountOut: BN;
    });
    /**
     * The total amount of currency or token which will be used for dca process.
     */
    get totalAmount(): BN;
    /**
     * The address of authority who deposit and initiates the dca process.
     */
    get authority(): PublicKey;
    /**
     * The token mint address which is used to swap from or to sol (native mint).
     */
    get mintAddress(): PublicKey;
    /**
     * The unix timestamp from which the last swap is performed.
     */
    get startTime(): BN;
    /**
     * The amount of currency or token to be used for the swap from the total amount at a time.
     */
    get dcaAmount(): BN;
    /**
     * The time interval or span between to consecutive swap process. The value should be in seconds.
     */
    get dcaTime(): BN;
    /**
     * The state signifies whether the dca process has been initialized or not.
     */
    get state(): boolean;
    /**
     * The flag tells whether to swap from sol to mint or mint to sol.
     */
    get flag(): number;
    /**
     * The minimum amount out expected from the swap.
     */
    get minimumAmountOut(): BN;
    /**
     * Decode buffer data to DcaAccount Object
     */
    static decodeUnchecked(data: Buffer): DcaAccount;
    /**
     * Get Dca account info of given address
     */
    static getDcaAccountInfo(connection: Connection, address: PublicKey, commitment?: Commitment, programId?: PublicKey): Promise<DcaAccount>;
}
