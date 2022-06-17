import {
    Cluster,
    clusterApiUrl,
    Commitment,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmRawTransaction,
    Transaction
} from "@solana/web3.js";
import { NATIVE_MINT } from "@solana/spl-token";
import {
    EventEmitter,
    SignerWalletAdapterProps,
    WalletAdapterEvents,
    WalletAdapterProps
} from "@solana/wallet-adapter-base";
import BigNumber from "bignumber.js";
import { BN } from "bn.js";
import {
    Liquidity,
    Percent,
    Token,
    TokenAmount
} from "@raydium-io/raydium-sdk";
import {
    fetchPoolKeys,
    findAssociatedTokenAddress,
    findPoolIdByBaseAndQuoteMint,
    findVaultAddress,
    getMintInfo,
    convertToLamports
} from "./utils";
import { DcaInstruction } from "./instruction";
import { DcaAccount } from "./models/dca-account";

interface WalletAdapter extends WalletAdapterProps, EventEmitter<WalletAdapterEvents>, SignerWalletAdapterProps { }

export class DcaClient {
    private _connection: Connection;
    private _commitment: Commitment;
    private _wallet: WalletAdapter;

    constructor(
        walletProvider: WalletAdapter,
        cluster?: Cluster,
        commitment?: Commitment
    ) {
        this._commitment = commitment ? commitment : "confirmed";
        this._connection = cluster ?
            new Connection(clusterApiUrl(cluster)) :
            new Connection(clusterApiUrl("mainnet-beta"));
        this._wallet = walletProvider;
    }

    private async signAndSendTransaction(txn: Transaction): Promise<string> {
        const signedTxn = await this._wallet.signTransaction(txn);
        return await sendAndConfirmRawTransaction(
            this._connection,
            signedTxn.serialize(),
            {
                commitment: this._commitment,
                skipPreflight: false,
                preflightCommitment: "processed"
            }
        );
    }

    /**
     * Deposit non-native token in dca program vault
     */
    async depositToken(owner: PublicKey, mint: PublicKey, amount: BigNumber) {
        try {
            let dcaDataAccount = Keypair.generate();
            const vault = await findVaultAddress(owner, dcaDataAccount.publicKey);
            const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
            const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
            const vaultNativeMintAddress = await findAssociatedTokenAddress(vault, NATIVE_MINT);

            const mintInfo = await getMintInfo(this._connection, mint);
            const _amount = convertToLamports(amount, mintInfo.decimals);

            let txn = new Transaction()
                .add(DcaInstruction.depositToken(
                    owner,
                    vault,
                    mint,
                    NATIVE_MINT,
                    ownerTokenAccount,
                    vaultTokenAccount,
                    vaultNativeMintAddress,
                    dcaDataAccount.publicKey,
                    _amount
                ));

            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
            txn.partialSign(dcaDataAccount);

            const signature = await this.signAndSendTransaction(txn);

            return {
                status: "success",
                data: {
                    signature: signature,
                    dcaData: dcaDataAccount.publicKey.toBase58()
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
 * Deposit sol in dca vault
 */
    async depositSol(owner: PublicKey, mint: PublicKey, amount: BigNumber) {
        try {
            let dcaDataAccount = Keypair.generate();
            const vaultAddress = await findVaultAddress(owner, dcaDataAccount.publicKey);
            const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
            const vaultTokenAccount = await findAssociatedTokenAddress(vaultAddress, mint);
            const vaultNativeMintAddress = await findAssociatedTokenAddress(vaultAddress, NATIVE_MINT);

            const _amount = convertToLamports(amount);

            let txn = new Transaction()
                .add(DcaInstruction.depositSol(
                    owner,
                    vaultAddress,
                    mint,
                    NATIVE_MINT,
                    ownerTokenAccount,
                    vaultNativeMintAddress,
                    vaultTokenAccount,
                    dcaDataAccount.publicKey,
                    _amount
                ));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
            txn.partialSign(dcaDataAccount);

            const signature = await this.signAndSendTransaction(txn);

            return {
                status: "success",
                data: {
                    signature: signature,
                    dcaData: dcaDataAccount.publicKey.toBase58()
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Intialize dca process
     */
    async initialize(owner: PublicKey, mint: PublicKey, dcaData: PublicKey, startTime: BigNumber, dcaAmount: BigNumber, dcaTime: BigNumber) {
        try {
            const vault = await findVaultAddress(owner, dcaData);
            const _startTime = new BN(startTime.toFixed());
            const _dcaTime = new BN(dcaTime.toFixed());
            const mintInfo = await getMintInfo(this._connection, mint);
            const _dcaAmount = convertToLamports(dcaAmount, mintInfo.decimals);
            const minimumAmountOut = convertToLamports(dcaAmount, mintInfo.decimals);

            let txn = new Transaction()
                .add(DcaInstruction.initialize(
                    owner,
                    vault,
                    dcaData,
                    _startTime,
                    _dcaAmount,
                    _dcaTime,
                    minimumAmountOut
                ));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;

            const signature = await this.signAndSendTransaction(txn);

            return {
                status: "success",
                data: {
                    signature: signature,
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Withdraw non-native token from vault
     */
    async withdrawToken(owner: PublicKey, mint: PublicKey, dcaData: PublicKey, amount: BigNumber) {
        try {
            const vaultAddress = await findVaultAddress(owner, dcaData);
            const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
            const vaultTokenAddress = await findAssociatedTokenAddress(vaultAddress, mint);
            const mintInfo = await getMintInfo(this._connection, mint);
            const transferAmount = convertToLamports(amount, mintInfo.decimals);

            let txn = new Transaction()
                .add(DcaInstruction.withdrawToken(
                    owner,
                    vaultAddress,
                    mint,
                    ownerTokenAccount,
                    vaultTokenAddress,
                    dcaData,
                    transferAmount
                ));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;

            const signature = await this.signAndSendTransaction(txn);

            return {
                status: "success",
                data: {
                    signature: signature,
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Withdraw native token from vault
     */
    async withdrawSol(owner: PublicKey, mint: PublicKey, dcaData: PublicKey, amount: BigNumber) {
        try {
            const vaultAddress = await findVaultAddress(owner, dcaData);
            const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
            const ownerNativeMintAccount = await findAssociatedTokenAddress(owner, NATIVE_MINT);
            const vaultTokenAddress = await findAssociatedTokenAddress(vaultAddress, mint);
            const vaultNativeMintAddress = await findAssociatedTokenAddress(vaultAddress, NATIVE_MINT);
            const transferAmount = convertToLamports(amount);

            let txn = new Transaction()
                .add(DcaInstruction.withdrawSol(
                    owner,
                    vaultAddress,
                    mint,
                    ownerTokenAccount,
                    vaultTokenAddress,
                    dcaData,
                    NATIVE_MINT,
                    vaultNativeMintAddress,
                    ownerNativeMintAccount,
                    transferAmount
                ));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;

            const signature = await this.signAndSendTransaction(txn);

            return {
                status: "success",
                data: {
                    signature: signature,
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Swap token from sol
     */
    async swapFromSol(owner: PublicKey, mint: PublicKey, dcaData: PublicKey) {
        try {
            const vault = await findVaultAddress(owner, dcaData);
            const vaultNativeMintAccount = await findAssociatedTokenAddress(vault, NATIVE_MINT)
            const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint)
            const poolKeyId = await findPoolIdByBaseAndQuoteMint(NATIVE_MINT, mint);
            const poolKeys = await fetchPoolKeys(
                this._connection,
                new PublicKey(poolKeyId)
            );
            const poolInfo = await Liquidity.fetchInfo({ connection: this._connection, poolKeys });
            const dcaInfo = await DcaAccount.getDcaAccountInfo(this._connection, dcaData);
            if (dcaInfo.dcaAmount.toString() === "0") {
                throw new Error("Dca amout is zero")
            }
            const amount = new BigNumber(dcaInfo.dcaAmount.toString())
                .div(new BigNumber(LAMPORTS_PER_SOL));
            const amountIn = new TokenAmount(
                new Token(
                    poolKeys.baseMint,
                    poolInfo.baseDecimals
                ),
                amount.toFixed(),
                false
            )
            const currencyOut = new Token(poolKeys.quoteMint, poolInfo.quoteDecimals);
            const slippage = new Percent(5, 100);
            const { amountOut, minAmountOut, currentPrice, executionPrice, priceImpact, fee }
                = Liquidity.computeAmountOut({ poolKeys, poolInfo, amountIn, currencyOut, slippage, });

            let txn = new Transaction()
                .add(DcaInstruction.swapFromSol(
                    poolKeys.programId,         // liquidityProgramId
                    poolKeys.id,                // ammAddress
                    poolKeys.authority,         // ammAuthorityAddress
                    poolKeys.openOrders,        // ammOpenOrderAddress
                    poolKeys.targetOrders,      // ammTargetOrderAddress
                    poolKeys.baseVault,         // poolCoinTokenAddress
                    poolKeys.quoteVault,        // poolPcTokenAddress
                    poolKeys.marketProgramId,   // serumMarketProgramId
                    poolKeys.marketId,          // serumMarketAddress
                    poolKeys.marketBids,        // serumBidsAddress
                    poolKeys.marketAsks,        // serumAskAddress
                    poolKeys.marketEventQueue,  // serumEventQueueAddress
                    poolKeys.marketBaseVault,   // serumCoinVaultAddress
                    poolKeys.marketQuoteVault,  // serumVaultAddress
                    poolKeys.marketAuthority,   // serumVaultSigner
                    vault,
                    vaultNativeMintAccount,
                    vaultTokenAccount,
                    mint,
                    owner,
                    dcaData,
                    NATIVE_MINT,
                    minAmountOut.raw
                ));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;

            const signature = await this.signAndSendTransaction(txn);

            return {
                status: "success",
                data: {
                    signature: signature,
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Swap Token to Sol
     */
    async swapToSol(owner: PublicKey, mint: PublicKey, dcaData: PublicKey) {
        const vault = await findVaultAddress(owner, dcaData);
        const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
        const vaultNativeMintAccount = await findAssociatedTokenAddress(vault, NATIVE_MINT);
        const poolKeyId = await findPoolIdByBaseAndQuoteMint(mint, NATIVE_MINT);
        const poolKeys = await fetchPoolKeys(
            this._connection,
            new PublicKey(poolKeyId)
        );
        const poolInfo = await Liquidity.fetchInfo({ connection: this._connection, poolKeys });
        const dcaInfo = await DcaAccount.getDcaAccountInfo(this._connection, dcaData);
        if (dcaInfo.dcaAmount.toString() === "0") {
            throw new Error("Dca amount is zero")
        }
        const mintInfo = await getMintInfo(this._connection, mint);
        const amount = new BigNumber(dcaInfo.dcaAmount.toString())
            .div(new BigNumber(10 ** mintInfo.decimals));
        const amountIn = new TokenAmount(
            new Token(
                poolKeys.baseMint,
                poolInfo.baseDecimals
            ),
            amount.toString(),
            false
        )
        const currencyOut = new Token(poolKeys.quoteMint, poolInfo.quoteDecimals);
        const slippage = new Percent(5, 100);
        const { amountOut, minAmountOut, currentPrice, executionPrice, priceImpact, fee }
            = Liquidity.computeAmountOut({ poolKeys, poolInfo, amountIn, currencyOut, slippage, });

        let txn = new Transaction()
            .add(DcaInstruction.swapToSol(
                poolKeys.programId,
                poolKeys.id,                // ammAddress
                poolKeys.authority,         // ammAuthorityAddress
                poolKeys.openOrders,        // ammOpenOrderAddress
                poolKeys.targetOrders,      // ammTargetOrderAddress
                poolKeys.baseVault,         // poolCoinTokenAddress
                poolKeys.quoteVault,        // poolPcTokenAddress
                poolKeys.marketProgramId,   // serumMarketProgramId
                poolKeys.marketId,          // serumMarketAddress
                poolKeys.marketBids,        // serumBidsAddress
                poolKeys.marketAsks,        // serumAskAddress
                poolKeys.marketEventQueue,  // serumEventQueueAddress
                poolKeys.marketBaseVault,   // serumCoinVaultAddress
                poolKeys.marketQuoteVault,  // serumVaultAddress
                poolKeys.marketAuthority,   // serumVaultSigner
                vault,
                vaultNativeMintAccount,
                vaultTokenAccount,
                mint,
                owner,
                dcaData,
                NATIVE_MINT,
                minAmountOut.raw
            ));
        txn.feePayer = owner;
        txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;

        const signature = await this.signAndSendTransaction(txn);

        return {
            status: "success",
            data: {
                signature: signature,
            },
        }
    }

    /**
     * Fund non-native token to existing vault
     */
    async fundToken(owner: PublicKey, mint: PublicKey, dcaData: PublicKey, amount: BigNumber) {
        try {
            const vault = await findVaultAddress(owner, dcaData);
            const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
            const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
            const mintInfo = await getMintInfo(this._connection, mint);
            const transferAmount = convertToLamports(amount, mintInfo.decimals);

            let txn = new Transaction()
                .add(DcaInstruction.fundToken(
                    owner,
                    vault,
                    mint,
                    ownerTokenAccount,
                    vaultTokenAccount,
                    dcaData,
                    transferAmount
                ));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;

            const signature = await this.signAndSendTransaction(txn);

            return {
                status: "success",
                data: {
                    signature: signature,
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Fund native token to existing vault
     */
    async fundSol(owner: PublicKey, mint: PublicKey, dcaData: PublicKey, amount: BigNumber) {
        try {
            const vault = await findVaultAddress(owner, dcaData);
            const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
            const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
            const vaultNativeMintAccount = await findAssociatedTokenAddress(vault, NATIVE_MINT);
            const transferAmount = convertToLamports(amount);

            let txn = new Transaction()
                .add(DcaInstruction.fundSol(
                    owner,
                    vault,
                    mint,
                    NATIVE_MINT,
                    ownerTokenAccount,
                    vaultNativeMintAccount,
                    vaultTokenAccount,
                    dcaData,
                    transferAmount
                ));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;

            const signature = this.signAndSendTransaction(txn);

            return {
                status: "success",
                data: {
                    signature: signature,
                }
            }
        } catch (e) {
            throw e;
        }
    }


}