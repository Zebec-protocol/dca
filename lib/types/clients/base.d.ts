import BN from "bn.js";
import { Commitment, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { Amount, MintAmount } from "../models";
export interface IWalletAdapter {
    publicKey: PublicKey;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
}
export declare abstract class DcaClient {
    protected _connection: Connection;
    protected _commitment: Commitment;
    protected _preflightCommitment: Commitment;
    constructor(params: {
        connection: Connection;
        commitment: Commitment;
        preflightCommitment: Commitment;
    });
    protected makeDepositTokenTransaction(source: PublicKey, tokenMint: PublicKey, amount: Amount | MintAmount): Promise<{
        transaction: Transaction;
    }>;
    protected makeInitializeTransaction(source: PublicKey, tokenMintFrom: PublicKey, tokenMintTo: PublicKey, startTime: BN, dcaAmount: Amount | MintAmount, frequency: BN): Promise<{
        transaction: Transaction;
        dcaAccount: Keypair;
    }>;
    protected makeWithdrawTokenTransaction(source: PublicKey, tokenMint: PublicKey, amount: Amount | MintAmount): Promise<{
        transaction: Transaction;
    }>;
    protected makeSwapTransaction(source: PublicKey, tokenMintFrom: PublicKey, tokenMintTo: PublicKey, dcaAccount: PublicKey): Promise<{
        transaction: Transaction;
    }>;
}
