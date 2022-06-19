import { Cluster, Commitment, PublicKey } from "@solana/web3.js";
import { EventEmitter, SignerWalletAdapterProps, WalletAdapterEvents, WalletAdapterProps } from "@solana/wallet-adapter-base";
import BigNumber from "bignumber.js";
interface WalletAdapter extends WalletAdapterProps, EventEmitter<WalletAdapterEvents>, SignerWalletAdapterProps {
}
export declare class DcaClient {
    private _connection;
    private _commitment;
    private _wallet;
    constructor(walletProvider: WalletAdapter, cluster?: Cluster, commitment?: Commitment);
    private signAndSendTransaction;
    /**
     * Deposit non-native token in dca program vault
     */
    depositToken(owner: PublicKey, mint: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
            dcaData: string;
        };
    }>;
    /**
 * Deposit sol in dca vault
 */
    depositSol(owner: PublicKey, mint: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
            dcaData: string;
        };
    }>;
    /**
     * Intialize dca process
     */
    initialize(owner: PublicKey, mint: PublicKey, dcaData: PublicKey, startTime: BigNumber, dcaAmount: BigNumber, dcaTime: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Withdraw non-native token from vault
     */
    withdrawToken(owner: PublicKey, mint: PublicKey, dcaData: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Withdraw native token from vault
     */
    withdrawSol(owner: PublicKey, mint: PublicKey, dcaData: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Swap token from sol
     */
    swapFromSol(owner: PublicKey, mint: PublicKey, dcaData: PublicKey): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Swap Token to Sol
     */
    swapToSol(owner: PublicKey, mint: PublicKey, dcaData: PublicKey): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Fund non-native token to existing vault
     */
    fundToken(owner: PublicKey, mint: PublicKey, dcaData: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: string;
        };
    }>;
    /**
     * Fund native token to existing vault
     */
    fundSol(owner: PublicKey, mint: PublicKey, dcaData: PublicKey, amount: BigNumber): Promise<{
        status: string;
        data: {
            signature: Promise<string>;
        };
    }>;
}
export {};
