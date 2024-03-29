import BigNumber from "bignumber.js";
import { Commitment, Connection, PublicKey, Signer } from "@solana/web3.js";
import { DcaClient } from "./base";
export declare class DcaOfflineClient extends DcaClient {
    private _payer;
    constructor(params: {
        connection: Connection;
        commitment: Commitment;
        preflightCommitment: Commitment;
        payer: Signer;
    });
    private sendTransaction;
    /**
     * Deposit non-native token in dca program vault
     */
    depositToken(owner: PublicKey, mint: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
            dcaAccount: PublicKey;
        };
    }>;
    /**
     * Deposit sol in dca vault
     */
    depositSol(owner: PublicKey, mint: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
            dcaAccount: PublicKey;
        };
    }>;
    /**
     * Intialize dca process
     */
    initialize(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey, startTime: BigNumber, dcaAmount: BigNumber, dcaTime: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Withdraw non-native token from vault
     */
    withdrawToken(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Withdraw native token from vault
     */
    withdrawSol(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Swap token from sol
     */
    swapFromSol(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Swap Token to Sol
     */
    swapToSol(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Fund non-native token to existing vault
     */
    fundToken(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Fund native token to existing vault
     */
    fundSol(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
}
