import BigNumber from "bignumber.js";
import BN from "bn.js";

import { Liquidity, LiquidityPoolKeysV4, Percent, Token, TokenAmount } from "@raydium-io/raydium-sdk";
import { NATIVE_MINT } from "@solana/spl-token";
import {
	clusterApiUrl,
	Commitment,
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	PublicKey,
	Transaction,
} from "@solana/web3.js";

import { DcaInstruction } from "../instruction";
import { DcaAccount, DcaFlag } from "../models/dca-account";
import {
	convertToLamports,
	fetchPoolKeys,
	fetchPoolKeysDevnet,
	findAssociatedTokenAddress,
	findPoolIdByBaseAndQuoteMint,
	findPoolIdByBaseAndQuoteMintDevnet,
	findVaultAddress,
	getMintInfo,
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

	protected async makeDepositTokenTransaction(owner: PublicKey, mint: PublicKey, amount: BigNumber) {
		try {
			let dcaAccount = Keypair.generate();
			const vault = await findVaultAddress(owner, dcaAccount.publicKey);
			const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
			const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
			const vaultNativeMintAddress = await findAssociatedTokenAddress(vault, NATIVE_MINT);

			const mintInfo = await getMintInfo(this._connection, mint);
			const _amount = convertToLamports(amount, mintInfo.decimals);

			let txn = new Transaction().add(
				DcaInstruction.depositToken(
					owner,
					vault,
					mint,
					NATIVE_MINT,
					ownerTokenAccount,
					vaultTokenAccount,
					vaultNativeMintAddress,
					dcaAccount.publicKey,
					_amount,
				),
			);
			txn.feePayer = owner;

			return {
				transaction: txn,
				dcaAccount: dcaAccount,
			};
		} catch (e) {
			throw e;
		}
	}

	protected async makeDepositSolTransaction(owner: PublicKey, mint: PublicKey, amount: BigNumber) {
		try {
			let dcaAccount = Keypair.generate();
			const vaultAddress = await findVaultAddress(owner, dcaAccount.publicKey);
			const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
			const vaultTokenAccount = await findAssociatedTokenAddress(vaultAddress, mint);
			const vaultNativeMintAddress = await findAssociatedTokenAddress(vaultAddress, NATIVE_MINT);

			const _amount = convertToLamports(amount);

			let txn = new Transaction().add(
				DcaInstruction.depositSol(
					owner,
					vaultAddress,
					mint,
					NATIVE_MINT,
					ownerTokenAccount,
					vaultNativeMintAddress,
					vaultTokenAccount,
					dcaAccount.publicKey,
					_amount,
				),
			);
			txn.feePayer = owner;

			return {
				transaction: txn,
				dcaAccount: dcaAccount,
			};
		} catch (e) {
			throw e;
		}
	}

	protected async makeInitializeTransaction(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		flag: DcaFlag,
		startTime: BigNumber,
		dcaAmount: BigNumber,
		dcaTime: BigNumber,
	) {
		try {
			const vault = await findVaultAddress(owner, dcaAccount);
			const _startTime = new BN(startTime.toFixed());
			const _dcaTime = new BN(dcaTime.toFixed());
			let _dcaAmount = new BN(0);
			if (flag == DcaFlag["MINT-SOL"]) {
				const mintInfo = await getMintInfo(this._connection, mint);
				_dcaAmount = convertToLamports(dcaAmount, mintInfo.decimals);
			} else {
				_dcaAmount = convertToLamports(dcaAmount);
			}

			let txn = new Transaction().add(
				DcaInstruction.initialize(owner, vault, dcaAccount, _startTime, _dcaAmount, _dcaTime),
			);

			return txn;
		} catch (e) {
			throw e;
		}
	}

	protected async makeWithdrawTokenTransaction(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	) {
		try {
			const vaultAddress = await findVaultAddress(owner, dcaAccount);
			const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
			const vaultTokenAddress = await findAssociatedTokenAddress(vaultAddress, mint);
			const mintInfo = await getMintInfo(this._connection, mint);
			const transferAmount = convertToLamports(amount, mintInfo.decimals);

			let txn = new Transaction().add(
				DcaInstruction.withdrawToken(
					owner,
					vaultAddress,
					mint,
					ownerTokenAccount,
					vaultTokenAddress,
					dcaAccount,
					transferAmount,
				),
			);

			return txn;
		} catch (e) {
			throw e;
		}
	}

	protected async makeWithdrawSolTransaction(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	) {
		try {
			const vaultAddress = await findVaultAddress(owner, dcaAccount);
			const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
			const ownerNativeMintAccount = await findAssociatedTokenAddress(owner, NATIVE_MINT);
			const vaultTokenAddress = await findAssociatedTokenAddress(vaultAddress, mint);
			const vaultNativeMintAddress = await findAssociatedTokenAddress(vaultAddress, NATIVE_MINT);
			const transferAmount = convertToLamports(amount);

			let txn = new Transaction().add(
				DcaInstruction.withdrawSol(
					owner,
					vaultAddress,
					mint,
					ownerTokenAccount,
					vaultTokenAddress,
					dcaAccount,
					NATIVE_MINT,
					vaultNativeMintAddress,
					ownerNativeMintAccount,
					transferAmount,
				),
			);

			return txn;
		} catch (e) {
			throw e;
		}
	}

	protected async makeSwapFromSolTransaction(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey) {
		try {
			const vault = await findVaultAddress(owner, dcaAccount);
			const vaultNativeMintAccount = await findAssociatedTokenAddress(vault, NATIVE_MINT);
			const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
			let poolKeys: LiquidityPoolKeysV4;
			if (this._connection == new Connection(clusterApiUrl("devnet"))) {
				const poolKeyId = await findPoolIdByBaseAndQuoteMintDevnet(mint, NATIVE_MINT);
				poolKeys = await fetchPoolKeysDevnet(this._connection, new PublicKey(poolKeyId));
			} else {
				const poolKeyId = await findPoolIdByBaseAndQuoteMint(mint, NATIVE_MINT);
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
			const uiAmount = new BigNumber(dcaInfo.dcaAmount.toString()).div(new BigNumber(LAMPORTS_PER_SOL));
			const amountIn = new TokenAmount(new Token(poolKeys.baseMint, poolInfo.baseDecimals), uiAmount.toFixed(), false);
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
				DcaInstruction.swapFromSol(
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
					vaultNativeMintAccount,
					vaultTokenAccount,
					mint,
					owner,
					dcaAccount,
					NATIVE_MINT,
					minAmountOut.raw,
				),
			);

			return txn;
		} catch (e) {
			throw e;
		}
	}

	protected async makeSwapToSolTransaction(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey) {
		const vault = await findVaultAddress(owner, dcaAccount);
		const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
		const vaultNativeMintAccount = await findAssociatedTokenAddress(vault, NATIVE_MINT);
		let poolKeys: LiquidityPoolKeysV4;
		if (this._connection == new Connection(clusterApiUrl("devnet"))) {
			const poolKeyId = await findPoolIdByBaseAndQuoteMintDevnet(mint, NATIVE_MINT);
			poolKeys = await fetchPoolKeysDevnet(this._connection, new PublicKey(poolKeyId));
		} else {
			const poolKeyId = await findPoolIdByBaseAndQuoteMint(mint, NATIVE_MINT);
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
		const mintInfo = await getMintInfo(this._connection, mint);
		const uiAmount = new BigNumber(dcaInfo.dcaAmount.toString()).div(new BigNumber(10 ** mintInfo.decimals));
		const amountIn = new TokenAmount(new Token(poolKeys.baseMint, poolInfo.baseDecimals), uiAmount.toString(), false);
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
			DcaInstruction.swapToSol(
				poolKeys.programId,
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
				vaultNativeMintAccount,
				vaultTokenAccount,
				mint,
				owner,
				dcaAccount,
				NATIVE_MINT,
				minAmountOut.raw,
			),
		);

		return txn;
	}

	protected async makeFundTokenTransaction(
		owner: PublicKey,
		mint: PublicKey,
		dcaAccount: PublicKey,
		amount: BigNumber,
	) {
		try {
			const vault = await findVaultAddress(owner, dcaAccount);
			const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
			const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
			const mintInfo = await getMintInfo(this._connection, mint);
			const transferAmount = convertToLamports(amount, mintInfo.decimals);

			let txn = new Transaction().add(
				DcaInstruction.fundToken(owner, vault, mint, ownerTokenAccount, vaultTokenAccount, dcaAccount, transferAmount),
			);

			return txn;
		} catch (e) {
			throw e;
		}
	}

	protected async makeFundSolTransaction(owner: PublicKey, mint: PublicKey, dcaAccount: PublicKey, amount: BigNumber) {
		try {
			const vault = await findVaultAddress(owner, dcaAccount);
			const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
			const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
			const vaultNativeMintAccount = await findAssociatedTokenAddress(vault, NATIVE_MINT);
			const transferAmount = convertToLamports(amount);

			let txn = new Transaction().add(
				DcaInstruction.fundSol(
					owner,
					vault,
					mint,
					NATIVE_MINT,
					ownerTokenAccount,
					vaultNativeMintAccount,
					vaultTokenAccount,
					dcaAccount,
					transferAmount,
				),
			);

			return txn;
		} catch (e) {
			throw e;
		}
	}
}
