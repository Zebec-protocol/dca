import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import BN from "bn.js";
/**
 * The DCA program instruction factory class.
 */
export declare class DcaInstruction {
    /**
     * Generate transaction instruction that deposit token to DCA vault
     */
    static depositToken(source: PublicKey, vault: PublicKey, mint: PublicKey, nativeMint: PublicKey, sourceTokenAccount: PublicKey, vaultTokenAccount: PublicKey, vaultNativeMintAccount: PublicKey, dcaAccount: PublicKey, amount: BN): TransactionInstruction;
    /**
    * Generate transaction instruction that deposit native token to DCA vault
    */
    static depositSol(source: PublicKey, vault: PublicKey, mint: PublicKey, nativeMint: PublicKey, sourceTokenAccount: PublicKey, vaultNativeMintAccount: PublicKey, vaultTokenAccount: PublicKey, dcaAccount: PublicKey, amount: BN): TransactionInstruction;
    /**
     * Generate transaction instruction that intialize the swap process
     */
    static initialize(source: PublicKey, vault: PublicKey, dcaAccount: PublicKey, startTime: BN, dcaAmount: BN, dcaTime: BN, minimumAmountOut: BN): TransactionInstruction;
    /**
     * Generate transaction instruction that swap token to sol
     */
    static swapToSol(liquidityProgramId: PublicKey, amm: PublicKey, ammAuthority: PublicKey, ammOpenOrder: PublicKey, ammTargetOrder: PublicKey, poolCoinToken: PublicKey, poolPcToken: PublicKey, serumMarketProgramId: PublicKey, serumMarket: PublicKey, serumBids: PublicKey, serumAsk: PublicKey, serumEventQueue: PublicKey, serumCoinVault: PublicKey, serumPcVault: PublicKey, serumVaultSigner: PublicKey, vault: PublicKey, vaultNativeMintAccount: PublicKey, vaultTokenAccount: PublicKey, mint: PublicKey, source: PublicKey, dcaAccount: PublicKey, nativeMint: PublicKey, minimumAmountOut: BN): TransactionInstruction;
    /**
     * Generate transaction instruction that swap token from sol
     */
    static swapFromSol(liquidityProgramId: PublicKey, amm: PublicKey, ammAuthority: PublicKey, ammOpenOrder: PublicKey, ammTargetOrder: PublicKey, poolCoinToken: PublicKey, poolPcToken: PublicKey, serumMarketProgramId: PublicKey, serumMarket: PublicKey, serumBids: PublicKey, serumAsk: PublicKey, serumEventQueue: PublicKey, serumCoinVault: PublicKey, serumPcVault: PublicKey, serumVaultSigner: PublicKey, vault: PublicKey, vaultNativeMintAccount: PublicKey, vaultTokenAccount: PublicKey, mint: PublicKey, source: PublicKey, dcaAccount: PublicKey, nativeMint: PublicKey, minimumAmountOut: BN): TransactionInstruction;
    /**
     * Generate Transaction Instruction that withdraws non-native token from DCA vault
     */
    static withdrawToken(source: PublicKey, vault: PublicKey, mint: PublicKey, sourceTokenAccount: PublicKey, vaultTokenAccount: PublicKey, dcaAccount: PublicKey, transferAmount: BN): TransactionInstruction;
    /**
     * Generate Transaction Instruction that withdraws native token from DCA vault
     */
    static withdrawSol(source: PublicKey, vault: PublicKey, mint: PublicKey, sourceTokenAccount: PublicKey, vaultTokenAccount: PublicKey, dcaAccount: PublicKey, nativeMint: PublicKey, vaultNativeMintAccount: PublicKey, sourceNativeMint: PublicKey, transferAmount: BN): TransactionInstruction;
    /**
     * Generate transaction instruction that fund token in initialized dca
     */
    static fundToken(source: PublicKey, vault: PublicKey, mint: PublicKey, sourceTokenAccount: PublicKey, vaultTokenAccount: PublicKey, dcaAccount: PublicKey, transferAmount: BN): TransactionInstruction;
    /**
     * Generate transaction instruction that sol to intialized dca process
     */
    static fundSol(source: PublicKey, vault: PublicKey, mint: PublicKey, nativeMint: PublicKey, sourceTokenAccount: PublicKey, vaultNativeMintAccount: PublicKey, vaultTokenAccount: PublicKey, dcaAccount: PublicKey, transferAmount: BN): TransactionInstruction;
}
//# sourceMappingURL=instruction.d.ts.map