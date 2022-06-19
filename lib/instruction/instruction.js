"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcaInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const data_1 = require("./data");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
/**
 * The DCA program instruction factory class.
 */
class DcaInstruction {
    /**
     * Generate transaction instruction that deposit token to DCA vault
     */
    static depositToken(source, vault, mint, nativeMint, sourceTokenAccount, vaultTokenAccount, vaultNativeMintAccount, dcaAccount, amount) {
        const data = new data_1.DepositTokenData(amount).encode();
        const keys = [
            utils_1.AccountMetaFactory.newWritable(source, true),
            utils_1.AccountMetaFactory.newWritable(vault, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(mint, false),
            utils_1.AccountMetaFactory.newWritable(nativeMint, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SystemProgram.programId, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SYSVAR_RENT_PUBKEY, false),
            utils_1.AccountMetaFactory.newWritable(sourceTokenAccount, false),
            utils_1.AccountMetaFactory.newWritable(vaultTokenAccount, false),
            utils_1.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(dcaAccount, true),
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.DCA_PROGRAM_ID,
            data: data
        });
    }
    /**
    * Generate transaction instruction that deposit native token to DCA vault
    */
    static depositSol(source, vault, mint, nativeMint, sourceTokenAccount, vaultNativeMintAccount, vaultTokenAccount, dcaAccount, amount) {
        const data = new data_1.DepositSolData(amount).encode();
        const keys = [
            utils_1.AccountMetaFactory.newWritable(source, true),
            utils_1.AccountMetaFactory.newWritable(vault, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(mint, false),
            utils_1.AccountMetaFactory.newWritable(nativeMint, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SystemProgram.programId, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SYSVAR_RENT_PUBKEY, false),
            utils_1.AccountMetaFactory.newWritable(sourceTokenAccount, false),
            utils_1.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            utils_1.AccountMetaFactory.newWritable(vaultTokenAccount, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(dcaAccount, true),
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.DCA_PROGRAM_ID,
            data: data
        });
    }
    /**
     * Generate transaction instruction that intialize the swap process
     */
    static initialize(source, vault, dcaAccount, startTime, dcaAmount, dcaTime, minimumAmountOut) {
        const data = new data_1.InitializeData(startTime, dcaAmount, dcaTime, minimumAmountOut).encode();
        const keys = [
            utils_1.AccountMetaFactory.newWritable(source, true),
            utils_1.AccountMetaFactory.newWritable(vault, false),
            utils_1.AccountMetaFactory.newWritable(dcaAccount, false),
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.DCA_PROGRAM_ID,
            data: data
        });
    }
    /**
     * Generate transaction instruction that swap token to sol
     */
    static swapToSol(liquidityProgramId, amm, ammAuthority, ammOpenOrder, ammTargetOrder, poolCoinToken, poolPcToken, serumMarketProgramId, serumMarket, serumBids, serumAsk, serumEventQueue, serumCoinVault, serumPcVault, serumVaultSigner, vault, vaultNativeMintAccount, vaultTokenAccount, mint, source, dcaAccount, nativeMint, minimumAmountOut) {
        const data = new data_1.SwapToSolData(minimumAmountOut).encode();
        const keys = [
            // amm liquidity pool (raydium)
            utils_1.AccountMetaFactory.newReadonly(liquidityProgramId, false),
            utils_1.AccountMetaFactory.newWritable(amm, false),
            utils_1.AccountMetaFactory.newReadonly(ammAuthority, false),
            utils_1.AccountMetaFactory.newWritable(ammOpenOrder, false),
            utils_1.AccountMetaFactory.newWritable(ammTargetOrder, false),
            utils_1.AccountMetaFactory.newWritable(poolCoinToken, false),
            utils_1.AccountMetaFactory.newWritable(poolPcToken, false),
            // serum market
            utils_1.AccountMetaFactory.newReadonly(serumMarketProgramId, false),
            utils_1.AccountMetaFactory.newWritable(serumMarket, false),
            utils_1.AccountMetaFactory.newWritable(serumBids, false),
            utils_1.AccountMetaFactory.newWritable(serumAsk, false),
            utils_1.AccountMetaFactory.newWritable(serumEventQueue, false),
            utils_1.AccountMetaFactory.newWritable(serumCoinVault, false),
            utils_1.AccountMetaFactory.newWritable(serumPcVault, false),
            utils_1.AccountMetaFactory.newReadonly(serumVaultSigner, false),
            // users  (raydium)
            utils_1.AccountMetaFactory.newWritable(vaultTokenAccount, false),
            utils_1.AccountMetaFactory.newWritable(vault, false),
            utils_1.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            // (dca)
            utils_1.AccountMetaFactory.newWritable(mint, false),
            utils_1.AccountMetaFactory.newWritable(source, false),
            utils_1.AccountMetaFactory.newWritable(dcaAccount, false),
            utils_1.AccountMetaFactory.newWritable(nativeMint, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.TOKEN_PROGRAM_ID, false),
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.DCA_PROGRAM_ID,
            data: data
        });
    }
    /**
     * Generate transaction instruction that swap token from sol
     */
    static swapFromSol(liquidityProgramId, amm, ammAuthority, ammOpenOrder, ammTargetOrder, poolCoinToken, poolPcToken, serumMarketProgramId, serumMarket, serumBids, serumAsk, serumEventQueue, serumCoinVault, serumPcVault, serumVaultSigner, vault, vaultNativeMintAccount, vaultTokenAccount, mint, source, dcaAccount, nativeMint, minimumAmountOut) {
        const data = new data_1.SwapFromSolData(minimumAmountOut).encode();
        const keys = [
            // amm liquidity pool (raydium)
            utils_1.AccountMetaFactory.newReadonly(liquidityProgramId, false),
            utils_1.AccountMetaFactory.newWritable(amm, false),
            utils_1.AccountMetaFactory.newReadonly(ammAuthority, false),
            utils_1.AccountMetaFactory.newWritable(ammOpenOrder, false),
            utils_1.AccountMetaFactory.newWritable(ammTargetOrder, false),
            utils_1.AccountMetaFactory.newWritable(poolCoinToken, false),
            utils_1.AccountMetaFactory.newWritable(poolPcToken, false),
            // serum market
            utils_1.AccountMetaFactory.newReadonly(serumMarketProgramId, false),
            utils_1.AccountMetaFactory.newWritable(serumMarket, false),
            utils_1.AccountMetaFactory.newWritable(serumBids, false),
            utils_1.AccountMetaFactory.newWritable(serumAsk, false),
            utils_1.AccountMetaFactory.newWritable(serumEventQueue, false),
            utils_1.AccountMetaFactory.newWritable(serumCoinVault, false),
            utils_1.AccountMetaFactory.newWritable(serumPcVault, false),
            utils_1.AccountMetaFactory.newReadonly(serumVaultSigner, false),
            // users  (raydium)
            utils_1.AccountMetaFactory.newWritable(vault, false),
            utils_1.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            utils_1.AccountMetaFactory.newWritable(vaultTokenAccount, false),
            // (dca)
            utils_1.AccountMetaFactory.newWritable(mint, false),
            utils_1.AccountMetaFactory.newWritable(source, false),
            utils_1.AccountMetaFactory.newWritable(dcaAccount, false),
            utils_1.AccountMetaFactory.newWritable(nativeMint, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.TOKEN_PROGRAM_ID, false),
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.DCA_PROGRAM_ID,
            data: data
        });
    }
    /**
     * Generate Transaction Instruction that withdraws non-native token from DCA vault
     */
    static withdrawToken(source, vault, mint, sourceTokenAccount, vaultTokenAccount, dcaAccount, transferAmount) {
        const data = new data_1.WithdrawTokenData(transferAmount).encode();
        const keys = [
            utils_1.AccountMetaFactory.newWritable(source, true),
            utils_1.AccountMetaFactory.newWritable(vault, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(mint, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SystemProgram.programId, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SYSVAR_RENT_PUBKEY, false),
            utils_1.AccountMetaFactory.newWritable(sourceTokenAccount, false),
            utils_1.AccountMetaFactory.newWritable(vaultTokenAccount, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(dcaAccount, false),
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.DCA_PROGRAM_ID,
            data: data
        });
    }
    /**
     * Generate Transaction Instruction that withdraws native token from DCA vault
     */
    static withdrawSol(source, vault, mint, sourceTokenAccount, vaultTokenAccount, dcaAccount, nativeMint, vaultNativeMintAccount, sourceNativeMintAccount, transferAmount) {
        const data = new data_1.WithdrawSolData(transferAmount).encode();
        const keys = [
            utils_1.AccountMetaFactory.newWritable(source, true),
            utils_1.AccountMetaFactory.newWritable(vault, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(mint, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SystemProgram.programId, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SYSVAR_RENT_PUBKEY, false),
            utils_1.AccountMetaFactory.newWritable(sourceTokenAccount, false),
            utils_1.AccountMetaFactory.newWritable(vaultTokenAccount, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(dcaAccount, false),
            utils_1.AccountMetaFactory.newWritable(nativeMint, false),
            utils_1.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            utils_1.AccountMetaFactory.newWritable(sourceNativeMintAccount, false),
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.DCA_PROGRAM_ID,
            data: data
        });
    }
    /**
     * Generate transaction instruction that fund token in initialized dca
     */
    static fundToken(source, vault, mint, sourceTokenAccount, vaultTokenAccount, dcaAccount, transferAmount) {
        const data = new data_1.FundTokenData(transferAmount).encode();
        const keys = [
            utils_1.AccountMetaFactory.newWritable(source, true),
            utils_1.AccountMetaFactory.newWritable(vault, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(mint, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SystemProgram.programId, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SYSVAR_RENT_PUBKEY, false),
            utils_1.AccountMetaFactory.newWritable(sourceTokenAccount, false),
            utils_1.AccountMetaFactory.newWritable(vaultTokenAccount, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(dcaAccount, false),
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.DCA_PROGRAM_ID,
            data: data
        });
    }
    /**
     * Generate transaction instruction that sol to intialized dca process
     */
    static fundSol(source, vault, mint, nativeMint, sourceTokenAccount, vaultNativeMintAccount, vaultTokenAccount, dcaAccount, transferAmount) {
        const data = new data_1.FundSolData(transferAmount).encode();
        const keys = [
            utils_1.AccountMetaFactory.newWritable(source, true),
            utils_1.AccountMetaFactory.newWritable(vault, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(mint, false),
            utils_1.AccountMetaFactory.newWritable(nativeMint, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SystemProgram.programId, false),
            utils_1.AccountMetaFactory.newReadonly(web3_js_1.SYSVAR_RENT_PUBKEY, false),
            utils_1.AccountMetaFactory.newWritable(sourceTokenAccount, false),
            utils_1.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            utils_1.AccountMetaFactory.newWritable(vaultTokenAccount, false),
            utils_1.AccountMetaFactory.newReadonly(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, false),
            utils_1.AccountMetaFactory.newWritable(dcaAccount, false),
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: constants_1.DCA_PROGRAM_ID,
            data: data
        });
    }
}
exports.DcaInstruction = DcaInstruction;
//# sourceMappingURL=instruction.js.map