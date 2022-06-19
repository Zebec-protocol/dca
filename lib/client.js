"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcaClient = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const bn_js_1 = require("bn.js");
const raydium_sdk_1 = require("@raydium-io/raydium-sdk");
const utils_1 = require("./utils");
const instruction_1 = require("./instruction");
const dca_account_1 = require("./models/dca-account");
class DcaClient {
    constructor(walletProvider, cluster, commitment) {
        this._commitment = commitment ? commitment : "confirmed";
        this._connection = cluster ?
            new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)(cluster)) :
            new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("mainnet-beta"));
        this._wallet = walletProvider;
    }
    async signAndSendTransaction(txn) {
        const signedTxn = await this._wallet.signTransaction(txn);
        return await (0, web3_js_1.sendAndConfirmRawTransaction)(this._connection, signedTxn.serialize(), {
            commitment: this._commitment,
            skipPreflight: false,
            preflightCommitment: "processed"
        });
    }
    /**
     * Deposit non-native token in dca program vault
     */
    async depositToken(owner, mint, amount) {
        try {
            let dcaDataAccount = web3_js_1.Keypair.generate();
            const vault = await (0, utils_1.findVaultAddress)(owner, dcaDataAccount.publicKey);
            const ownerTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(owner, mint);
            const vaultTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(vault, mint);
            const vaultNativeMintAddress = await (0, utils_1.findAssociatedTokenAddress)(vault, spl_token_1.NATIVE_MINT);
            const mintInfo = await (0, utils_1.getMintInfo)(this._connection, mint);
            const _amount = (0, utils_1.convertToLamports)(amount, mintInfo.decimals);
            let txn = new web3_js_1.Transaction()
                .add(instruction_1.DcaInstruction.depositToken(owner, vault, mint, spl_token_1.NATIVE_MINT, ownerTokenAccount, vaultTokenAccount, vaultNativeMintAddress, dcaDataAccount.publicKey, _amount));
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
            };
        }
        catch (e) {
            throw e;
        }
    }
    /**
 * Deposit sol in dca vault
 */
    async depositSol(owner, mint, amount) {
        try {
            let dcaDataAccount = web3_js_1.Keypair.generate();
            const vaultAddress = await (0, utils_1.findVaultAddress)(owner, dcaDataAccount.publicKey);
            const ownerTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(owner, mint);
            const vaultTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(vaultAddress, mint);
            const vaultNativeMintAddress = await (0, utils_1.findAssociatedTokenAddress)(vaultAddress, spl_token_1.NATIVE_MINT);
            const _amount = (0, utils_1.convertToLamports)(amount);
            let txn = new web3_js_1.Transaction()
                .add(instruction_1.DcaInstruction.depositSol(owner, vaultAddress, mint, spl_token_1.NATIVE_MINT, ownerTokenAccount, vaultNativeMintAddress, vaultTokenAccount, dcaDataAccount.publicKey, _amount));
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
            };
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Intialize dca process
     */
    async initialize(owner, mint, dcaData, startTime, dcaAmount, dcaTime) {
        try {
            const vault = await (0, utils_1.findVaultAddress)(owner, dcaData);
            const _startTime = new bn_js_1.BN(startTime.toFixed());
            const _dcaTime = new bn_js_1.BN(dcaTime.toFixed());
            const mintInfo = await (0, utils_1.getMintInfo)(this._connection, mint);
            const _dcaAmount = (0, utils_1.convertToLamports)(dcaAmount, mintInfo.decimals);
            const minimumAmountOut = (0, utils_1.convertToLamports)(dcaAmount, mintInfo.decimals);
            let txn = new web3_js_1.Transaction()
                .add(instruction_1.DcaInstruction.initialize(owner, vault, dcaData, _startTime, _dcaAmount, _dcaTime, minimumAmountOut));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
            const signature = await this.signAndSendTransaction(txn);
            return {
                status: "success",
                data: {
                    signature: signature,
                }
            };
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Withdraw non-native token from vault
     */
    async withdrawToken(owner, mint, dcaData, amount) {
        try {
            const vaultAddress = await (0, utils_1.findVaultAddress)(owner, dcaData);
            const ownerTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(owner, mint);
            const vaultTokenAddress = await (0, utils_1.findAssociatedTokenAddress)(vaultAddress, mint);
            const mintInfo = await (0, utils_1.getMintInfo)(this._connection, mint);
            const transferAmount = (0, utils_1.convertToLamports)(amount, mintInfo.decimals);
            let txn = new web3_js_1.Transaction()
                .add(instruction_1.DcaInstruction.withdrawToken(owner, vaultAddress, mint, ownerTokenAccount, vaultTokenAddress, dcaData, transferAmount));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
            const signature = await this.signAndSendTransaction(txn);
            return {
                status: "success",
                data: {
                    signature: signature,
                }
            };
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Withdraw native token from vault
     */
    async withdrawSol(owner, mint, dcaData, amount) {
        try {
            const vaultAddress = await (0, utils_1.findVaultAddress)(owner, dcaData);
            const ownerTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(owner, mint);
            const ownerNativeMintAccount = await (0, utils_1.findAssociatedTokenAddress)(owner, spl_token_1.NATIVE_MINT);
            const vaultTokenAddress = await (0, utils_1.findAssociatedTokenAddress)(vaultAddress, mint);
            const vaultNativeMintAddress = await (0, utils_1.findAssociatedTokenAddress)(vaultAddress, spl_token_1.NATIVE_MINT);
            const transferAmount = (0, utils_1.convertToLamports)(amount);
            let txn = new web3_js_1.Transaction()
                .add(instruction_1.DcaInstruction.withdrawSol(owner, vaultAddress, mint, ownerTokenAccount, vaultTokenAddress, dcaData, spl_token_1.NATIVE_MINT, vaultNativeMintAddress, ownerNativeMintAccount, transferAmount));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
            const signature = await this.signAndSendTransaction(txn);
            return {
                status: "success",
                data: {
                    signature: signature,
                }
            };
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Swap token from sol
     */
    async swapFromSol(owner, mint, dcaData) {
        try {
            const vault = await (0, utils_1.findVaultAddress)(owner, dcaData);
            const vaultNativeMintAccount = await (0, utils_1.findAssociatedTokenAddress)(vault, spl_token_1.NATIVE_MINT);
            const vaultTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(vault, mint);
            const poolKeyId = await (0, utils_1.findPoolIdByBaseAndQuoteMint)(spl_token_1.NATIVE_MINT, mint);
            const poolKeys = await (0, utils_1.fetchPoolKeys)(this._connection, new web3_js_1.PublicKey(poolKeyId));
            const poolInfo = await raydium_sdk_1.Liquidity.fetchInfo({ connection: this._connection, poolKeys });
            const dcaInfo = await dca_account_1.DcaAccount.getDcaAccountInfo(this._connection, dcaData);
            if (dcaInfo.dcaAmount.toString() === "0") {
                throw new Error("Dca amout is zero");
            }
            const amount = new bignumber_js_1.default(dcaInfo.dcaAmount.toString())
                .div(new bignumber_js_1.default(web3_js_1.LAMPORTS_PER_SOL));
            const amountIn = new raydium_sdk_1.TokenAmount(new raydium_sdk_1.Token(poolKeys.baseMint, poolInfo.baseDecimals), amount.toFixed(), false);
            const currencyOut = new raydium_sdk_1.Token(poolKeys.quoteMint, poolInfo.quoteDecimals);
            const slippage = new raydium_sdk_1.Percent(5, 100);
            const { amountOut, minAmountOut, currentPrice, executionPrice, priceImpact, fee } = raydium_sdk_1.Liquidity.computeAmountOut({ poolKeys, poolInfo, amountIn, currencyOut, slippage, });
            let txn = new web3_js_1.Transaction()
                .add(instruction_1.DcaInstruction.swapFromSol(poolKeys.programId, // liquidityProgramId
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
            vault, vaultNativeMintAccount, vaultTokenAccount, mint, owner, dcaData, spl_token_1.NATIVE_MINT, minAmountOut.raw));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
            const signature = await this.signAndSendTransaction(txn);
            return {
                status: "success",
                data: {
                    signature: signature,
                }
            };
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Swap Token to Sol
     */
    async swapToSol(owner, mint, dcaData) {
        const vault = await (0, utils_1.findVaultAddress)(owner, dcaData);
        const vaultTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(vault, mint);
        const vaultNativeMintAccount = await (0, utils_1.findAssociatedTokenAddress)(vault, spl_token_1.NATIVE_MINT);
        const poolKeyId = await (0, utils_1.findPoolIdByBaseAndQuoteMint)(mint, spl_token_1.NATIVE_MINT);
        const poolKeys = await (0, utils_1.fetchPoolKeys)(this._connection, new web3_js_1.PublicKey(poolKeyId));
        const poolInfo = await raydium_sdk_1.Liquidity.fetchInfo({ connection: this._connection, poolKeys });
        const dcaInfo = await dca_account_1.DcaAccount.getDcaAccountInfo(this._connection, dcaData);
        if (dcaInfo.dcaAmount.toString() === "0") {
            throw new Error("Dca amount is zero");
        }
        const mintInfo = await (0, utils_1.getMintInfo)(this._connection, mint);
        const amount = new bignumber_js_1.default(dcaInfo.dcaAmount.toString())
            .div(new bignumber_js_1.default(10 ** mintInfo.decimals));
        const amountIn = new raydium_sdk_1.TokenAmount(new raydium_sdk_1.Token(poolKeys.baseMint, poolInfo.baseDecimals), amount.toString(), false);
        const currencyOut = new raydium_sdk_1.Token(poolKeys.quoteMint, poolInfo.quoteDecimals);
        const slippage = new raydium_sdk_1.Percent(5, 100);
        const { amountOut, minAmountOut, currentPrice, executionPrice, priceImpact, fee } = raydium_sdk_1.Liquidity.computeAmountOut({ poolKeys, poolInfo, amountIn, currencyOut, slippage, });
        let txn = new web3_js_1.Transaction()
            .add(instruction_1.DcaInstruction.swapToSol(poolKeys.programId, poolKeys.id, // ammAddress
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
        vault, vaultNativeMintAccount, vaultTokenAccount, mint, owner, dcaData, spl_token_1.NATIVE_MINT, minAmountOut.raw));
        txn.feePayer = owner;
        txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
        const signature = await this.signAndSendTransaction(txn);
        return {
            status: "success",
            data: {
                signature: signature,
            },
        };
    }
    /**
     * Fund non-native token to existing vault
     */
    async fundToken(owner, mint, dcaData, amount) {
        try {
            const vault = await (0, utils_1.findVaultAddress)(owner, dcaData);
            const ownerTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(owner, mint);
            const vaultTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(vault, mint);
            const mintInfo = await (0, utils_1.getMintInfo)(this._connection, mint);
            const transferAmount = (0, utils_1.convertToLamports)(amount, mintInfo.decimals);
            let txn = new web3_js_1.Transaction()
                .add(instruction_1.DcaInstruction.fundToken(owner, vault, mint, ownerTokenAccount, vaultTokenAccount, dcaData, transferAmount));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
            const signature = await this.signAndSendTransaction(txn);
            return {
                status: "success",
                data: {
                    signature: signature,
                }
            };
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Fund native token to existing vault
     */
    async fundSol(owner, mint, dcaData, amount) {
        try {
            const vault = await (0, utils_1.findVaultAddress)(owner, dcaData);
            const ownerTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(owner, mint);
            const vaultTokenAccount = await (0, utils_1.findAssociatedTokenAddress)(vault, mint);
            const vaultNativeMintAccount = await (0, utils_1.findAssociatedTokenAddress)(vault, spl_token_1.NATIVE_MINT);
            const transferAmount = (0, utils_1.convertToLamports)(amount);
            let txn = new web3_js_1.Transaction()
                .add(instruction_1.DcaInstruction.fundSol(owner, vault, mint, spl_token_1.NATIVE_MINT, ownerTokenAccount, vaultNativeMintAccount, vaultTokenAccount, dcaData, transferAmount));
            txn.feePayer = owner;
            txn.recentBlockhash = (await this._connection.getLatestBlockhash()).blockhash;
            const signature = this.signAndSendTransaction(txn);
            return {
                status: "success",
                data: {
                    signature: signature,
                }
            };
        }
        catch (e) {
            throw e;
        }
    }
}
exports.DcaClient = DcaClient;
//# sourceMappingURL=client.js.map