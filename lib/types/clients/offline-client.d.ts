import BN from "bn.js";
import { Commitment, Connection, PublicKey, Signer } from "@solana/web3.js";
import { Amount, MintAmount } from "../models";
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
    depositToken(owner: PublicKey, mint: PublicKey, amount: Amount | MintAmount): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Intialize dca process
     */
    initialize(owner: PublicKey, tokenMintFrom: PublicKey, tokenMintTo: PublicKey, startTime: BN, dcaAmount: Amount | MintAmount, frequency: BN): Promise<{
        status: string;
        data: {
            signature: string;
            dcaAccount: PublicKey;
        };
    }>;
    /**
     * Withdraw non-native token from vault
     */
    withdrawToken(owner: PublicKey, mint: PublicKey, amount: Amount | MintAmount): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Swap token from sol
     */
    swap(owner: PublicKey, tokenMintFrom: PublicKey, tokenMintTo: PublicKey, dcaAccount: PublicKey): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
}
