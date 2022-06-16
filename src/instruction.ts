import { AccountMeta, PublicKey, sendAndConfirmRawTransaction, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction } from "@solana/web3.js";
import BN from "bn.js";
import { DepositSolData, DepositTokenData, FundSolData, FundTokenData, InitializeData, SwapFromSolData, SwapToSolData, WithdrawSolData, WithdrawTokenData } from "./instructionData";
import { AccountMetaFactory } from "./utils";
import { DCA_PROGRAM_ID } from "./constants"
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, } from "@solana/spl-token";

type BaseInstructionParams = {
    source: PublicKey,
    vault: PublicKey,
    dcaAccount: PublicKey,
}

type DepositTokenInstructionParam = BaseInstructionParams & {
    mint: PublicKey,
    nativeMint: PublicKey,
    sourceTokenAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    vaultNativeMintAccount: PublicKey,
    amount: BN
}

type DepositSolInstructionParam = DepositTokenInstructionParam;

type InitializeInstructionParam = BaseInstructionParams & {
    startTime: BN,
    dcaAmount: BN,
    dcaTime: BN,
    minimumAmountOut: BN
}

type SwapFromSolInstructionParam = BaseInstructionParams & {
    liquidityProgramId: PublicKey,
    amm: PublicKey,
    ammAuthority: PublicKey,
    ammOpenOrder: PublicKey,
    ammTargetOrder: PublicKey,
    poolCoinToken: PublicKey,
    poolPcToken: PublicKey,
    serumMarketProgramId: PublicKey,
    serumMarket: PublicKey,
    serumBids: PublicKey,
    serumAsk: PublicKey,
    serumEventQueue: PublicKey,
    serumCoinVault: PublicKey,
    serumPcVault: PublicKey,
    serumVaultSigner: PublicKey,
    vaultTokenAccount: PublicKey,
    vaultNativeMintAccount: PublicKey,
    mint: PublicKey,
    nativeMint: PublicKey,
    minimumAmountOut: BN,
}

type SwapToSolInstructionParam = SwapFromSolInstructionParam;

type WithdrawSolInstructionParam = BaseInstructionParams & {
    mint: PublicKey,
    nativeMint: PublicKey,
    sourceTokenAccount: PublicKey,
    sourceNativeMint: PublicKey,
    vaultTokenAccount: PublicKey,
    vaultNativeMintAccount: PublicKey,
    transferAmount: BN
}

type WithdrawTokenInstructionParam = BaseInstructionParams & {
    mint: PublicKey,
    sourceTokenAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    transferAmount: BN
}

type FundTokenInstructionParam = WithdrawTokenInstructionParam;

type FundSolInstructionParam = BaseInstructionParams & {
    mint: PublicKey,
    nativeMint: PublicKey,
    sourceTokenAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    vaultNativeMintAccount: PublicKey,
    transferAmount: BN
}

/**
 * The DCA program instruction factory class. 
 */
export class DcaInstruction {

    /**
     * Generate transaction instruction that deposit token to DCA vault
     */
    static depositToken(
        {
            source,
            vault,
            mint,
            nativeMint,
            sourceTokenAccount,
            vaultTokenAccount,
            vaultNativeMintAccount,
            dcaAccount,
            amount
        }: DepositTokenInstructionParam
    ) {
        const data = new DepositTokenData({ amount: amount }).encode();

        const keys = [
            AccountMetaFactory.newWritable(source, true),
            AccountMetaFactory.newWritable(vault, false),
            AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(mint, false),
            AccountMetaFactory.newWritable(nativeMint, false),
            AccountMetaFactory.newReadonly(SystemProgram.programId, false),
            AccountMetaFactory.newReadonly(SYSVAR_RENT_PUBKEY, false),
            AccountMetaFactory.newWritable(sourceTokenAccount, false),
            AccountMetaFactory.newWritable(vaultTokenAccount, false),
            AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            AccountMetaFactory.newReadonly(ASSOCIATED_TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(dcaAccount, true),
        ];

        return new TransactionInstruction({
            keys: keys,
            programId: DCA_PROGRAM_ID,
            data: data
        });
    }

    /**
    * Generate transaction instruction that deposit native token to DCA vault
    */
    static depositSol(
        {
            source,
            vault,
            mint,
            nativeMint,
            sourceTokenAccount,
            vaultNativeMintAccount,
            vaultTokenAccount,
            dcaAccount,
            amount
        }: DepositSolInstructionParam
    ) {
        const data = new DepositSolData({ amount: amount }).encode();
        const keys = [
            AccountMetaFactory.newWritable(source, true),
            AccountMetaFactory.newWritable(vault, false),
            AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(mint, false),
            AccountMetaFactory.newWritable(nativeMint, false),
            AccountMetaFactory.newReadonly(SystemProgram.programId, false),
            AccountMetaFactory.newReadonly(SYSVAR_RENT_PUBKEY, false),
            AccountMetaFactory.newWritable(sourceTokenAccount, false),
            AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            AccountMetaFactory.newReadonly(vaultTokenAccount, false),
            AccountMetaFactory.newReadonly(ASSOCIATED_TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(dcaAccount, true),
        ]
        return new TransactionInstruction({
            keys: keys,
            programId: DCA_PROGRAM_ID,
            data: data
        });
    }

    /**
     * Generate transaction instruction that intialize the swap process
     */
    static initialize(
        {
            source,
            vault,
            dcaAccount,
            startTime,
            dcaAmount,
            dcaTime,
            minimumAmountOut
        }: InitializeInstructionParam
    ) {
        const data = new InitializeData({
            startTime: startTime,
            dcaAmount: dcaAmount,
            dcaTime: dcaTime,
            minimumAmountOut: minimumAmountOut
        }).encode();
        const keys = [
            AccountMetaFactory.newWritable(source, true),
            AccountMetaFactory.newWritable(vault, false),
            AccountMetaFactory.newWritable(dcaAccount, false),
        ];

        return new TransactionInstruction({
            keys: keys,
            programId: DCA_PROGRAM_ID,
            data: data
        })
    }

    /**
     * Generate transaction instruction that swap token to sol
     */
    static swapToSol(
        {
            liquidityProgramId,
            amm,
            ammAuthority,
            ammOpenOrder,
            ammTargetOrder,
            poolCoinToken,
            poolPcToken,
            serumMarketProgramId,
            serumMarket,
            serumBids,
            serumAsk,
            serumEventQueue,
            serumCoinVault,
            serumPcVault,
            serumVaultSigner,
            vault,
            vaultNativeMintAccount,
            vaultTokenAccount,
            mint,
            source,
            dcaAccount,
            nativeMint,
            minimumAmountOut
        }: SwapToSolInstructionParam
    ) {
        const data = new SwapToSolData({ minimumAmountOut: minimumAmountOut }).encode();
        const keys = [
            // amm liquidity pool (raydium)
            AccountMetaFactory.newReadonly(liquidityProgramId, false),
            AccountMetaFactory.newWritable(amm, false),
            AccountMetaFactory.newReadonly(ammAuthority, false),
            AccountMetaFactory.newWritable(ammOpenOrder, false),
            AccountMetaFactory.newWritable(ammTargetOrder, false),
            AccountMetaFactory.newWritable(poolCoinToken, false),
            AccountMetaFactory.newWritable(poolPcToken, false),

            // serum market
            AccountMetaFactory.newReadonly(serumMarketProgramId, false),
            AccountMetaFactory.newWritable(serumMarket, false),
            AccountMetaFactory.newWritable(serumBids, false),
            AccountMetaFactory.newWritable(serumAsk, false),
            AccountMetaFactory.newWritable(serumEventQueue, false),
            AccountMetaFactory.newWritable(serumCoinVault, false),
            AccountMetaFactory.newWritable(serumPcVault, false),
            AccountMetaFactory.newReadonly(serumVaultSigner, false),

            // users  (raydium)
            AccountMetaFactory.newWritable(vaultTokenAccount, false),
            AccountMetaFactory.newWritable(vault, false),
            AccountMetaFactory.newWritable(vaultNativeMintAccount, false),

            // (dca)
            AccountMetaFactory.newWritable(mint, false),
            AccountMetaFactory.newWritable(source, false),
            AccountMetaFactory.newWritable(dcaAccount, false),
            AccountMetaFactory.newWritable(nativeMint, false),
            AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
        ];
        return new TransactionInstruction({
            keys: keys,
            programId: DCA_PROGRAM_ID,
            data: data
        });
    }

    /**
     * Generate transaction instruction that swap token from sol
     */
    static swapFromSol(
        {
            liquidityProgramId,
            amm,
            ammAuthority,
            ammOpenOrder,
            ammTargetOrder,
            poolCoinToken,
            poolPcToken,
            serumMarketProgramId,
            serumMarket,
            serumBids,
            serumAsk,
            serumEventQueue,
            serumCoinVault,
            serumPcVault,
            serumVaultSigner,
            vault,
            vaultNativeMintAccount,
            vaultTokenAccount,
            mint,
            source,
            dcaAccount,
            nativeMint,
            minimumAmountOut
        }: SwapFromSolInstructionParam
    ) {
        const data = new SwapFromSolData({ minimumAmountOut: minimumAmountOut }).encode();
        const keys = [
            // amm liquidity pool (raydium)
            AccountMetaFactory.newReadonly(liquidityProgramId, false),
            AccountMetaFactory.newWritable(amm, false),
            AccountMetaFactory.newReadonly(ammAuthority, false),
            AccountMetaFactory.newWritable(ammOpenOrder, false),
            AccountMetaFactory.newWritable(ammTargetOrder, false),
            AccountMetaFactory.newWritable(poolCoinToken, false),
            AccountMetaFactory.newWritable(poolPcToken, false),

            // serum market
            AccountMetaFactory.newReadonly(serumMarketProgramId, false),
            AccountMetaFactory.newWritable(serumMarket, false),
            AccountMetaFactory.newWritable(serumBids, false),
            AccountMetaFactory.newWritable(serumAsk, false),
            AccountMetaFactory.newWritable(serumEventQueue, false),
            AccountMetaFactory.newWritable(serumCoinVault, false),
            AccountMetaFactory.newWritable(serumPcVault, false),
            AccountMetaFactory.newReadonly(serumVaultSigner, false),

            // users  (raydium)
            AccountMetaFactory.newWritable(vault, false),
            AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            AccountMetaFactory.newWritable(vaultTokenAccount, false),

            // (dca)
            AccountMetaFactory.newWritable(mint, false),
            AccountMetaFactory.newWritable(source, false),
            AccountMetaFactory.newWritable(dcaAccount, false),
            AccountMetaFactory.newWritable(nativeMint, false),
            AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
        ];
        return new TransactionInstruction({
            keys: keys,
            programId: DCA_PROGRAM_ID,
            data: data
        });
    }

    /**
     * Generate Transaction Instruction that withdraws non-native token from DCA vault
     */
    static withdrawToken({
        source,
        vault,
        mint,
        sourceTokenAccount,
        vaultTokenAccount,
        dcaAccount,
        transferAmount
    }: WithdrawTokenInstructionParam
    ) {
        const data = new WithdrawTokenData({ transferAmount }).encode();
        const keys = [
            AccountMetaFactory.newWritable(source, true),
            AccountMetaFactory.newWritable(vault, false),
            AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(mint, false),
            AccountMetaFactory.newReadonly(SystemProgram.programId, false),
            AccountMetaFactory.newReadonly(SYSVAR_RENT_PUBKEY, false),
            AccountMetaFactory.newWritable(sourceTokenAccount, false),
            AccountMetaFactory.newWritable(vaultTokenAccount, false),
            AccountMetaFactory.newReadonly(ASSOCIATED_TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(dcaAccount, false),
        ];

        return new TransactionInstruction({
            keys: keys,
            programId: DCA_PROGRAM_ID,
            data: data
        })
    }

    /**
     * Generate Transaction Instruction that withdraws native token from DCA vault
     */
    static withdrawSol(
        {
            source,
            vault,
            mint,
            sourceTokenAccount,
            vaultTokenAccount,
            dcaAccount,
            nativeMint,
            vaultNativeMintAccount,
            sourceNativeMint,
            transferAmount
        }: WithdrawSolInstructionParam
    ) {
        const data = new WithdrawSolData({ transferAmount: transferAmount }).encode();
        const keys = [
            AccountMetaFactory.newWritable(source, true),
            AccountMetaFactory.newWritable(vault, false),
            AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(mint, false),
            AccountMetaFactory.newReadonly(SystemProgram.programId, false),
            AccountMetaFactory.newReadonly(SYSVAR_RENT_PUBKEY, false),
            AccountMetaFactory.newWritable(sourceTokenAccount, false),
            AccountMetaFactory.newWritable(vaultTokenAccount, false),
            AccountMetaFactory.newReadonly(ASSOCIATED_TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(dcaAccount, false),
            AccountMetaFactory.newWritable(nativeMint, false),
            AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            AccountMetaFactory.newWritable(sourceNativeMint, false),
        ];
        return new TransactionInstruction({
            keys: keys,
            programId: DCA_PROGRAM_ID,
            data: data
        })
    }


    /**
     * Generate transaction instruction that fund token in initialized dca
     */
    static fundToken(
        {
            source,
            vault,
            mint,
            sourceTokenAccount,
            vaultTokenAccount,
            dcaAccount,
            transferAmount
        }: FundTokenInstructionParam
    ) {
        const data = new FundTokenData({ transferAmount: transferAmount }).encode();
        const keys = [
            AccountMetaFactory.newWritable(source, true),
            AccountMetaFactory.newWritable(vault, false),
            AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(mint, false),
            AccountMetaFactory.newReadonly(SystemProgram.programId, false),
            AccountMetaFactory.newReadonly(SYSVAR_RENT_PUBKEY, false),
            AccountMetaFactory.newWritable(sourceTokenAccount, false),
            AccountMetaFactory.newWritable(vaultTokenAccount, false),
            AccountMetaFactory.newReadonly(ASSOCIATED_TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(dcaAccount, false),
        ];
        return new TransactionInstruction({
            keys: keys,
            programId: DCA_PROGRAM_ID,
            data: data
        })
    }

    /**
     * Generate transaction instruction that sol to intialized dca process
     */
    static fundSol(
        {
            source,
            vault,
            mint,
            nativeMint,
            sourceTokenAccount,
            vaultNativeMintAccount,
            vaultTokenAccount,
            dcaAccount,
            transferAmount
        }: FundSolInstructionParam
    ) {
        const data = new FundSolData({ transferAmount: transferAmount }).encode();
        const keys = [
            AccountMetaFactory.newWritable(source, true),
            AccountMetaFactory.newWritable(vault, false),
            AccountMetaFactory.newReadonly(TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(mint, false),
            AccountMetaFactory.newWritable(nativeMint, false),
            AccountMetaFactory.newReadonly(SystemProgram.programId, false),
            AccountMetaFactory.newReadonly(SYSVAR_RENT_PUBKEY, false),
            AccountMetaFactory.newWritable(sourceTokenAccount, false),
            AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
            AccountMetaFactory.newWritable(vaultTokenAccount, false),
            AccountMetaFactory.newReadonly(ASSOCIATED_TOKEN_PROGRAM_ID, false),
            AccountMetaFactory.newWritable(dcaAccount, false),
        ];
        return new TransactionInstruction({
            keys: keys,
            programId: DCA_PROGRAM_ID,
            data: data
        })
    }


}