import BN from "bn.js";

import { Liquidity, LiquidityPoolKeysV4, Percent, Token, TokenAmount } from "@raydium-io/raydium-sdk";
import { Commitment, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";

import { CONNECTION } from "../constants";
import { DcaInstruction } from "../instruction";
import { Amount, DcaAccount, MintAmount } from "../models";
import {
	fetchPoolKeys,
	fetchPoolKeysDevnet,
	findAssociatedTokenAddress,
	findPoolIdByBaseAndQuoteMint,
	findPoolIdByBaseAndQuoteMintDevnet,
	findVaultAddress,
} from "../utils";

export interface IWalletAdapter {
	publicKey: PublicKey;
	signTransaction(transaction: Transaction): Promise<Transaction>;
	signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
}

export abstract class DcaClient {
	protected _connection: Connection;
	protected _commitment: Commitment;
	protected _preflightCommitment: Commitment;

	constructor(params: { connection: Connection; commitment: Commitment; preflightCommitment: Commitment }) {
		this._commitment = params.commitment;
		this._connection = params.connection;
		this._preflightCommitment = params.preflightCommitment;
	}

	protected async makeDepositTokenTransaction(source: PublicKey, tokenMint: PublicKey, amount: Amount | MintAmount) {
		try {
			const vault = await findVaultAddress(source);
			const sourceTokenAccount = await findAssociatedTokenAddress(source, tokenMint);
			const vaultTokenAccount = await findAssociatedTokenAddress(vault, tokenMint);

			let txn = new Transaction().add(
				DcaInstruction.depositToken(source, vault, tokenMint, sourceTokenAccount, vaultTokenAccount, amount),
			);

			return {
				transaction: txn,
			};
		} catch (e) {
			throw e;
		}
	}

	protected async makeInitializeTransaction(
		source: PublicKey,
		tokenMintFrom: PublicKey,
		tokenMintTo: PublicKey,
		startTime: BN,
		dcaAmount: Amount | MintAmount,
		frequency: BN,
	) {
		try {
			const dcaAccount = Keypair.generate();
			const vault = await findVaultAddress(source);
			const vaultTokenAccountFrom = await findAssociatedTokenAddress(vault, tokenMintFrom);
			const vaultTokenAccountTo = await findAssociatedTokenAddress(vault, tokenMintTo);
			let txn = new Transaction().add(
				DcaInstruction.initialize(
					source,
					vault,
					tokenMintFrom,
					tokenMintTo,
					vaultTokenAccountFrom,
					vaultTokenAccountTo,
					dcaAccount.publicKey,
					startTime,
					dcaAmount,
					frequency,
				),
			);

			return {
				transaction: txn,
				dcaAccount: dcaAccount,
			};
		} catch (e) {
			throw e;
		}
	}

	protected async makeWithdrawTokenTransaction(source: PublicKey, tokenMint: PublicKey, amount: Amount | MintAmount) {
		try {
			const vault = await findVaultAddress(source);
			const sourceTokenAccount = await findAssociatedTokenAddress(source, tokenMint);
			const vaultTokenAccount = await findAssociatedTokenAddress(vault, tokenMint);

			let txn = new Transaction().add(
				DcaInstruction.withdrawToken(source, vault, tokenMint, sourceTokenAccount, vaultTokenAccount, amount),
			);

			return {
				transaction: txn,
			};
		} catch (e) {
			throw e;
		}
	}

	protected async makeSwapTransaction(
		source: PublicKey,
		tokenMintFrom: PublicKey,
		tokenMintTo: PublicKey,
		dcaAccount: PublicKey,
	) {
		try {
			const vault = await findVaultAddress(source);
			const vaultTokenAccountFrom = await findAssociatedTokenAddress(vault, tokenMintFrom);
			const vaultTokenAccountTo = await findAssociatedTokenAddress(vault, tokenMintTo);

			let poolKeys: LiquidityPoolKeysV4;
			if (this._connection == CONNECTION["devnet"]) {
				const poolKeyId = await findPoolIdByBaseAndQuoteMintDevnet(tokenMintFrom, tokenMintTo);
				poolKeys = await fetchPoolKeysDevnet(this._connection, new PublicKey(poolKeyId));
			} else {
				const poolKeyId = await findPoolIdByBaseAndQuoteMint(tokenMintFrom, tokenMintTo);
				poolKeys = await fetchPoolKeys(this._connection, new PublicKey(poolKeyId));
			}
			const poolInfo = await Liquidity.fetchInfo({
				connection: this._connection,
				poolKeys,
			});
			const dcaInfo = await DcaAccount.getDcaAccountInfo(this._connection, dcaAccount);
			if (dcaInfo.dcaAmount.toString() === "0") {
				throw new Error("Dca amount is zero");
			}
			// const uiAmount = new BigNumber(dcaInfo.dcaAmount.toString()).div(new BigNumber(LAMPORTS_PER_SOL));
			const amountIn = new TokenAmount(new Token(poolKeys.baseMint, poolInfo.baseDecimals), dcaInfo.dcaAmount, true);
			const currencyOut = new Token(poolKeys.quoteMint, poolInfo.quoteDecimals);
			const slippage = new Percent(1, 100);
			const { minAmountOut } = Liquidity.computeAmountOut({
				poolKeys,
				poolInfo,
				amountIn,
				currencyOut,
				slippage,
			});

			let txn = new Transaction().add(
				DcaInstruction.swap(
					poolKeys.programId, // liquidityProgramId
					poolKeys.id, // ammAddress
					poolKeys.authority, // ammAuthorityAddress
					poolKeys.openOrders, // ammOpenOrderAddress
					poolKeys.targetOrders, // ammTargetOrderAddress
					poolKeys.baseVault, // poolCoinTokenAddress
					poolKeys.quoteVault, // poolPcTokenAddress
					poolKeys.marketProgramId, // serumMarketProgramId
					poolKeys.marketId, // serumMarketAddress
					poolKeys.marketBids, // serumBidsAddress
					poolKeys.marketAsks, // serumAskAddress
					poolKeys.marketEventQueue, // serumEventQueueAddress
					poolKeys.marketBaseVault, // serumCoinVaultAddress
					poolKeys.marketQuoteVault, // serumVaultAddress
					poolKeys.marketAuthority, // serumVaultSigner
					vault,
					vaultTokenAccountFrom,
					vaultTokenAccountTo,
					tokenMintFrom,
					tokenMintTo,
					source,
					dcaAccount,
					minAmountOut.raw,
				),
			);

			return {
				transaction: txn,
			};
		} catch (e) {
			throw e;
		}
	}
}
