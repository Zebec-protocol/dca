import BN from "bn.js";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
/**
 * The DCA program instruction factory class.
 */
export declare class DcaInstruction {
    /**
     * Generate transaction instruction that deposit into DCA vault
     */
    static depositToken(source: PublicKey, vault: PublicKey, tokenMint: PublicKey, sourceTokenAccount: PublicKey, vaultTokenAccount: PublicKey, amount: BN): TransactionInstruction;
    /**
     * Generate transaction instruction to intialize the dca process
     */
    static initialize(source: PublicKey, vault: PublicKey, tokenMintFrom: PublicKey, tokenMintTo: PublicKey, vaultTokenAccountFrom: PublicKey, vaultTokenAccountTo: PublicKey, dcaAccount: PublicKey, startTime: BN, dcaAmount: BN, frequency: BN): TransactionInstruction;
    /**
     * Generate transaction instruction to swap
     */
    static swap(liquidityProgramId: PublicKey, ammAccount: PublicKey, ammAuthority: PublicKey, ammOpenOrder: PublicKey, ammTargetOrder: PublicKey, poolCoinTokenAccount: PublicKey, poolPcTokenAccount: PublicKey, serumMarketProgramId: PublicKey, serumMarket: PublicKey, serumBids: PublicKey, serumAsk: PublicKey, serumEventQueue: PublicKey, serumCoinVault: PublicKey, serumPcVault: PublicKey, serumVaultSigner: PublicKey, vault: PublicKey, vaultTokenAccountFrom: PublicKey, vaultTokenAccountTo: PublicKey, tokenMintFrom: PublicKey, tokenMintTo: PublicKey, source: PublicKey, dcaAccount: PublicKey, minimumAmountOut: BN): TransactionInstruction;
    /**
     * Generate Transaction Instruction to withdraw token from DCA vault
     */
    static withdrawToken(source: PublicKey, vault: PublicKey, tokenMint: PublicKey, sourceTokenAccount: PublicKey, vaultTokenAccount: PublicKey, transferAmount: BN): TransactionInstruction;
}
