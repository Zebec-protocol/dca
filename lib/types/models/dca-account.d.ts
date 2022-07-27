/// <reference types="node" />
import BN from "bn.js";
import { Commitment, Connection, PublicKey } from "@solana/web3.js";
import { Amount } from "./amount";
/**
 * The class for the dca account state in DCA program
 */
export declare class DcaAccount {
    private _authority;
    private _mintAddressFrom;
    private _mintAddressTo;
    private _startTime;
    private _dcaAmount;
    private _frequency;
    private _state;
    constructor(param: {
        authority: Uint8Array;
        mintAddressFrom: Uint8Array;
        mintAddressTo: Uint8Array;
        startTime: BN;
        dcaAmount: BN;
        frequency: BN;
        state: number;
    });
    /**
     * The address of authority who deposit and initiates the dca process.
     */
    get authority(): PublicKey;
    /**
     * The token mint address which is used to swap from or to sol (native mint).
     */
    get mintAddressFrom(): PublicKey;
    /**
     * The token mint address which is used to swap from or to sol (native mint).
     */
    get mintAddressTo(): PublicKey;
    /**
     * The unix timestamp from which the last swap is performed.
     */
    get startTime(): BN;
    /**
     * The amount of currency or token to be used for the swap from the total amount at a time.
     */
    get dcaAmount(): Amount;
    /**
     * The time interval or span between to consecutive swap process. The value should be in seconds.
     */
    get frequency(): BN;
    /**
     * The state signifies whether the dca process has been initialized or not.
     */
    get state(): boolean;
    /**
     * Decode buffer data to DcaAccount Object
     */
    static decodeUnchecked(data: Buffer): DcaAccount;
    /**
     * Get Dca account info of given address
     */
    static getDcaAccountInfo(connection: Connection, address: PublicKey, commitment?: Commitment, programId?: PublicKey): Promise<DcaAccount>;
}
