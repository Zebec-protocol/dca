import BN from "bn.js";
import { Commitment, Connection, PublicKey } from "@solana/web3.js";
import { Amount, MintAmount } from "../models";
import { DcaClient, IWalletAdapter } from "./base";
export declare class DcaOnlineClient extends DcaClient {
    private _wallet;
    constructor(params: {
        wallet: IWalletAdapter;
        connection: Connection;
        commitment: Commitment;
        preflightCommitment: Commitment;
    });
    private signAndSendTransaction;
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
