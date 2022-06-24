import { Commitment, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import {
	EventEmitter,
	SignerWalletAdapterProps,
	WalletAdapterEvents,
	WalletAdapterProps,
} from "@solana/wallet-adapter-base";
import BigNumber from "bignumber.js";
export interface IWalletAdapter
	extends WalletAdapterProps,
		EventEmitter<WalletAdapterEvents>,
		SignerWalletAdapterProps {}
export declare abstract class DcaClient {
	protected _connection: Connection;
	protected _commitment: Commitment;
	protected _preflightCommitment: Commitment;
	constructor(params: { connection: Connection; commitment: Commitment; preflightCommitment: Commitment });
	protected makeDepositTokenTransaction(
		owner: PublicKey,
		mint: PublicKey,
		amount: BigNumber,
	): Promise<{
		transaction: Transaction;
		dcaAccount: Keypair;
	}>;
	protected makeDepositSolTransaction(
		owner: PublicKey,
		mint: PublicKey,
		amount: BigNumber,
	): Promise<{
		transaction: Transaction;
		dcaAccount: Keypair;
	}>;
	protected makeInitializeTransaction(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		startTime: BigNumber,
		dcaAmount: BigNumber,
		dcaTime: BigNumber,
	): Promise<Transaction>;
	protected makeWithdrawTokenTransaction(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	): Promise<Transaction>;
	protected makeWithdrawSolTransaction(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	): Promise<Transaction>;
	protected makeSwapFromSolTransaction(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey): Promise<Transaction>;
	protected makeSwapToSolTransaction(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey): Promise<Transaction>;
	protected makeFundTokenTransaction(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	): Promise<Transaction>;
	protected makeFundSolTransaction(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	): Promise<Transaction>;
}
