import { Cluster, clusterApiUrl, Commitment, Connection, Keypair, PublicKey, sendAndConfirmRawTransaction, Transaction } from "@solana/web3.js";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";
import BigNumber from "bignumber.js";
import { findAssociatedTokenAddress, findVaultAddress, getMintInfo } from "./utils";
import { NATIVE_MINT } from "@solana/spl-token";
import { convertToLamports } from "./utils/convertToLamports";
import { DcaInstruction } from "./instruction";
import { BN } from "bn.js";



export class DcaClient {
    private _connection: Connection;
    private _commitment: Commitment;
    private _walletProvider: BaseSignerWalletAdapter;

    constructor(
        walletProvider: BaseSignerWalletAdapter,
        cluster?: Cluster,
        commitment?: Commitment
    ) {
        this._commitment = commitment ? commitment : "confirmed";
        this._connection = cluster ?
            new Connection(clusterApiUrl(cluster)) :
            new Connection(clusterApiUrl("mainnet-beta"));
        this._walletProvider = walletProvider;
    }

    private async signAndSendTransaction(txn: Transaction): Promise<string> {
        const signedTxn = await this._walletProvider.signTransaction(txn);
        return await sendAndConfirmRawTransaction(
            this._connection,
            signedTxn.serialize(),
            {
                commitment: "confirmed",
                skipPreflight: false,
                preflightCommitment: "processed"
            }
        );
    }

    /**
     * Deposit non-native token in dca program vault
     */
    async depositToken(this._connection: Connection, owner: PublicKey, mint: PublicKey, amount: BigNumber) {
        try {
            let dcaDataAccount = Keypair.generate();
            const ownerAddress = new PublicKey(owner);
            const mintAddress = new PublicKey(mint);
            const vaultAddress = await findVaultAddress(ownerAddress, dcaDataAccount.publicKey);
            constownerTokenAddress = await findAssociatedTokenAddress(ownerAddress, mintAddress);
            const vaultTokenAddress = await findAssociatedTokenAddress(vaultAddress, mintAddress);
            const vaultNativeMintAddress = await findAssociatedTokenAddress(vaultAddress, NATIVE_MINT);

            const mintInfo = await getMintInfo(this._connection, mintAddress);
            const _amount = convertToLamports(amount, mintInfo.decimals);

            let txn = new Transaction()
                .add(DcaInstruction.depositToken(
                    ownerAddress,
                    vaultAddress,
                    mintAddress,
                    NATIVE_MINT,
                    ownerTokenAddress,
                    vaultTokenAddress,
                    vaultNativeMintAddress,
                    dcaDataAccount.publicKey,
                    _amount
                ));

            txn.feePayer = ownerAddress;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
            txn.partialSign(dcaDataAccount);

            const signature = await this.signAndSendTransaction(txn);

            return {
                status: "success",
                data: {
                    signature: signature,
                    dcaDataAddress: dcaDataAccount.publicKey.toBase58()
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Intialize dca process
     */
    async initialize(this._connection: Connection, owner: PublicKey, mint: PublicKey, dcaData: PublicKey, startTime: BigNumber, dcaAmount: BigNumber, dcaTime: BigNumber) {
        try {
            const ownerAddress = new PublicKey(owner);
            const mintAddress = new PublicKey(mint);
            const dcaDataAddress = new PublicKey(dcaData);
            const vaultAddress = await findVaultAddress(ownerAddress, dcaDataAddress);
            const _startTime = new BN(startTime.toFixed());
            const _dcaTime = new BN(dcaTime.toFixed());
            const mintInfo = await getMintInfo(this._connection, mintAddress);
            const _dcaAmount = convertToLamports(dcaAmount, mintInfo.decimals);
            const minimumAmountOut = convertToLamports(dcaAmount, mintInfo.decimals);

            let txn = new Transaction()
                .add(DcaInstruction.initialize(
                    ownerAddress,
                    vaultAddress,
                    dcaDataAddress,
                    _startTime,
                    _dcaAmount,
                    _dcaTime,
                    minimumAmountOut
                ));
            txn.feePayer = ownerAddress;
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
     * Deposit sol in dca vault
     */
    async depositSol(this._connection: Connection, owner: PublicKey, mint: PublicKey, amount: BigNumber) {
        try {
            let dcaDataAccount = Keypair.generate();
            const ownerAddress = new PublicKey(owner);
            const mintAddress = new PublicKey(mint);
            const vaultAddress = await findVaultAddress(ownerAddress, dcaDataAccount.publicKey);
            constownerTokenAddress = await findAssociatedTokenAddress(ownerAddress, mintAddress);
            const vaultTokenAddress = await findAssociatedTokenAddress(vaultAddress, mintAddress);
            const vaultNativeMintAddress = await findAssociatedTokenAddress(vaultAddress, NATIVE_MINT);

            const _amount = convertToLamports(amount);

            let txn = new Transaction()
                .add(DcaInstruction.depositSol(
                    ownerAddress,
                    vaultAddress,
                    mintAddress,
                    NATIVE_MINT,
                    ownerTokenAddress,
                    vaultNativeMintAddress,
                    vaultTokenAddress,
                    dcaDataAccount.publicKey,
                    _amount
                ));
            txn.feePayer = ownerAddress;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
            txn.partialSign(dcaDataAccount);

            const signature = await this.signAndSendTransaction(txn);

            return {
                status: "success",
                data: {
                    signature: signature,
                    dcaDataAddress: dcaDataAccount.publicKey.toBase58()
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
            const ownerAddress = new PublicKey(owner);
            const mintAddress = new PublicKey(mint);
            const dcaDataAddress = new PublicKey(dcaData);
            const vaultAddress = await findVaultAddress(ownerAddress, dcaDataAddress);
            const ownerTokenAddress = await findAssociatedTokenAddress(ownerAddress, mintAddress);
            const vaultTokenAddress = await findAssociatedTokenAddress(vaultAddress, mintAddress);
            const mintInfo = await getMintInfo(this._connection, mintAddress);
            const transferAmount = convertToLamports(amount, mintInfo.decimals);

            let txn = new Transaction()
                .add(DcaInstruction.withdrawToken(
                    ownerAddress,
                    vaultAddress,
                    mintAddress,
                    ownerTokenAddress,
                    vaultTokenAddress,
                    dcaDataAddress,
                    transferAmount
                ));
            txn.feePayer = ownerAddress;
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

            const ownerAddress = new PublicKey(owner);
            const mintAddress = new PublicKey(mint);
            const dcaDataAddress = new PublicKey(dcaData);
            const vaultAddress = await findVaultAddress(ownerAddress, dcaDataAddress);
            const ownerTokenAddress = await findAssociatedTokenAddress(ownerAddress, mintAddress);
            const ownerNativeMintAddress = await findAssociatedTokenAddress(ownerAddress, NATIVE_MINT);
            const vaultTokenAddress = await findAssociatedTokenAddress(vaultAddress, mintAddress);
            const vaultNativeMintAddress = await findAssociatedTokenAddress(vaultAddress, NATIVE_MINT);
            const transferAmount = convertToLamports(amount);

            let txn = new Transaction()
                .add(DcaInstruction.withdrawSol(
                    ownerAddress,
                    vaultAddress,
                    mintAddress,
                    ownerTokenAddress,
                    vaultTokenAddress,
                    dcaDataAddress,
                    NATIVE_MINT,
                    vaultNativeMintAddress,
                    ownerNativeMintAddress,
                    transferAmount
                ));
            txn.feePayer = ownerAddress;
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
 * @param {Connection} this._connection The this._connection The Connection of solana json rpc network
 * @param {string} owner The address of the owner who initialize dca
 * @param {string} mint The address of token mint
 * @param {string} dcaData The address of the account which store dca state
 * @param {string} poolId The address of the amm liquidity pool account
 */
async function swapFromSol(this._connection, owner, mint, dcaData) {
    try {
        if (!this._connection || !owner || !mint || !dcaData) {
            throw new ReferenceError("Missing arguments.");
        }

        if (!(this._connection instanceof Connection) ||
            typeof owner != "string" ||
            typeof mint != "string" ||
            typeof dcaData != "string"
        ) {
            throw new TypeError("Invalid argument type.");
        }

        const ownerAddress = new PublicKey(owner);
        const mintAddress = new PublicKey(mint);
        const dcaDataAddress = new PublicKey(dcaData);
        const [vaultAddress,] = await findDcaDerivedAddress([ownerAddress.toBuffer(), dcaDataAddress.toBuffer()]);
        const [vaultNativeMintAddress,] = await findAssociatedTokenAddress(vaultAddress, NATIVE_MINT)
        const [vaultTokenAddress,] = await findAssociatedTokenAddress(vaultAddress, mintAddress)

        const poolKeysList = await fetchAllPoolKeys();
        if (poolKeysList.length === 0) throw new Error("Error in retreiving liquidity pool keys");

        const keys = poolKeysList.find(el => el.quoteMint.includes(mint) &&
            el.baseMint.includes(NATIVE_MINT.toBase58()));
        if (!keys) throw new Error("No liquidity pool found.")
        console.log(keys.id);
        // SOL_USDT
        // const POOL_ID = "384zMi9MbUKVUfkUdrnuMfWBwJR9gadSxYimuXeJ9DaJ";

        const poolKeys = await fetchPoolKeys(
            this._connection,
            new PublicKey(keys.id)
        );
        const poolInfo = await Liquidity.fetchInfo({ this._connection, poolKeys });

        const dcaInfo = await DcaAccount.getDcaAccountInfo(this._connection, dcaDataAddress);

        if (dcaInfo.dcaAmount.toString() === "0") {
            throw new Error("Dca amout is zero")
        }

        const amount = new BigNumber(dcaInfo.dcaAmount.toString())
            .div(new BigNumber(LAMPORTS_PER_SOL)); // todo : test this part for decimal output

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
                vaultAddress,
                vaultNativeMintAddress,
                vaultTokenAddress,
                mintAddress,
                ownerAddress,
                dcaDataAddress,
                NATIVE_MINT,
                minAmountOut.raw
            ));
        txn.feePayer = ownerAddress;
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
 * @param {Connection} this._connection The this._connection The Connection of solana json rpc network
 * @param {string} owner The address of the owner who initialize dca
 * @param {string} mint The address of token mint
 * @param {string} dcaData The address of the account which store dca state
 * @param {string} poolId The address of the amm liquidity pool account
 */
export async function swapToSol(this._connection, owner, mint, dcaData) {
    if (!this._connection || !owner || !mint || !dcaData) {
        throw new ReferenceError("Missing arguments.");
    }

    if (!(this._connection instanceof Connection) ||
        typeof owner != "string" ||
        typeof mint != "string" ||
        typeof dcaData != "string"
    ) {
        throw new TypeError("Invalid argument type.");
    }

    const ownerAddress = new PublicKey(owner);
    const mintAddress = new PublicKey(mint);
    const dcaDataAddress = new PublicKey(dcaData);
    const [vaultAddress,] = await findDcaDerivedAddress([ownerAddress.toBuffer(), dcaDataAddress.toBuffer()]);
    const [vaultTokenAddress,] = await findAssociatedTokenAddress(vaultAddress, mintAddress);
    const [vaultNativeMintAddress,] = await findAssociatedTokenAddress(vaultAddress, NATIVE_MINT);

    const poolKeysList = await fetchAllPoolKeys();
    if (poolKeysList.length === 0) throw new Error("Error in retreiving liquidity pool keys");
    const keys = poolKeysList.find(el => el.quoteMint.includes(NATIVE_MINT) &&
        el.baseMint.includes(mintAddress));
    if (!keys) throw new Error("No liquidity pool found.")
    console.log(keys.id);

    // RANDOM POOL
    // const POOL_ID = "HeD1cekRWUNR25dcvW8c9bAHeKbr1r7qKEhv7pEegr4f";

    const poolKeys = await fetchPoolKeys(
        this._connection,
        new PublicKey(keys.id)
    );
    const poolInfo = await Liquidity.fetchInfo({ this._connection, poolKeys });

    const dcaInfo = await DcaAccount.getDcaAccountInfo(this._connection, dcaDataAddress);
    if (dcaInfo.dcaAmount === "0" || dcaInfo.dcaAmount === 0) {
        throw new Error("Dca amount is zero")
    }

    const mintInfo = await getMintInfo(this._connection, mintAddress);

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
            vaultAddress,
            vaultNativeMintAddress,
            vaultTokenAddress,
            mintAddress,
            ownerAddress,
            dcaDataAddress,
            NATIVE_MINT,
            minAmountOut.raw
        ));
    txn.feePayer = ownerAddress;
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
        const vaultAddress = await findVaultAddress(ownerAddress, dcaDataAddress);
        const ownerTokenAddress = await findAssociatedTokenAddress(ownerAddress, mintAddress);
        const vaultTokenAddress = await findAssociatedTokenAddress(vaultAddress, mintAddress);
        const mintInfo = await getMintInfo(this._connection, mintAddress);
        const transferAmount = convertToLamports(amount, mintInfo.decimals);

        let txn = new Transaction()
            .add(DcaInstruction.fundToken(
                ownerAddress,
                vaultAddress,
                mintAddress,
                ownerTokenAddress,
                vaultTokenAddress,
                dcaDataAddress,
                transferAmount
            ));
        txn.feePayer = ownerAddress;
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
async  fundSol(owner, mint, dcaData, amount) {
    try {

        const ownerAddress = new PublicKey(owner);
        const mintAddress = new PublicKey(mint);
        const dcaDataAddress = new PublicKey(dcaData);
        const [vaultAddress,] = await findDcaDerivedAddress([ownerAddress.toBuffer(), dcaDataAddress.toBuffer()]);
        const ownerTokenAddress,] = await findAssociatedTokenAddress(ownerAddress, mintAddress);
        const [vaultTokenAddress,] = await findAssociatedTokenAddress(vaultAddress, mintAddress);
        const [vaultNativeMintAddress,] = await findAssociatedTokenAddress(vaultAddress, NATIVE_MINT);
        const transferAmount = convertToLamports(amount);

        let txn = new Transaction()
            .add(DcaInstruction.fundSol(
                ownerAddress,
                vaultAddress,
                mintAddress,
                NATIVE_MINT,
                ownerTokenAddress,
                vaultNativeMintAddress,
                vaultTokenAddress,
                dcaDataAddress,
                transferAmount
            ));
        txn.feePayer = ownerAddress;
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