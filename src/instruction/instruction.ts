import BN from 'bn.js';

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from '@solana/web3.js';

import { DCA_PROGRAM_ID } from '../constants';
import { AccountMetaFactory } from '../utils';
import {
  DepositSolData,
  DepositTokenData,
  FundSolData,
  FundTokenData,
  InitializeData,
  SwapFromSolData,
  SwapToSolData,
  WithdrawSolData,
  WithdrawTokenData,
} from './data';

/**
 * The DCA program instruction factory class.
 */
export class DcaInstruction {
  /**
   * Generate transaction instruction that deposit token to DCA vault
   */
  static depositToken(
    source: PublicKey,
    vault: PublicKey,
    mint: PublicKey,
    nativeMint: PublicKey,
    sourceTokenAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    vaultNativeMintAccount: PublicKey,
    dcaAccount: PublicKey,
    amount: BN
  ) {
    const data = new DepositTokenData(amount).encode();
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
      data: data,
    });
  }

  /**
   * Generate transaction instruction that deposit native token to DCA vault
   */
  static depositSol(
    source: PublicKey,
    vault: PublicKey,
    mint: PublicKey,
    nativeMint: PublicKey,
    sourceTokenAccount: PublicKey,
    vaultNativeMintAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    dcaAccount: PublicKey,
    amount: BN
  ) {
    const data = new DepositSolData(amount).encode();
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
      AccountMetaFactory.newWritable(dcaAccount, true),
    ];
    return new TransactionInstruction({
      keys: keys,
      programId: DCA_PROGRAM_ID,
      data: data,
    });
  }

  /**
   * Generate transaction instruction that intialize the swap process
   */
  static initialize(
    source: PublicKey,
    vault: PublicKey,
    dcaAccount: PublicKey,
    startTime: BN,
    dcaAmount: BN,
    dcaTime: BN,
    minimumAmountOut: BN
  ) {
    const data = new InitializeData(
      startTime,
      dcaAmount,
      dcaTime,
      minimumAmountOut
    ).encode();
    const keys = [
      AccountMetaFactory.newWritable(source, true),
      AccountMetaFactory.newWritable(vault, false),
      AccountMetaFactory.newWritable(dcaAccount, false),
    ];

    return new TransactionInstruction({
      keys: keys,
      programId: DCA_PROGRAM_ID,
      data: data,
    });
  }

  /**
   * Generate transaction instruction that swap token to sol
   */
  static swapToSol(
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
    vault: PublicKey,
    vaultNativeMintAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    mint: PublicKey,
    source: PublicKey,
    dcaAccount: PublicKey,
    nativeMint: PublicKey,
    minimumAmountOut: BN
  ) {
    const data = new SwapToSolData(minimumAmountOut).encode();
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
      data: data,
    });
  }

  /**
   * Generate transaction instruction that swap token from sol
   */
  static swapFromSol(
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
    vault: PublicKey,
    vaultNativeMintAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    mint: PublicKey,
    source: PublicKey,
    dcaAccount: PublicKey,
    nativeMint: PublicKey,
    minimumAmountOut: BN
  ) {
    const data = new SwapFromSolData(minimumAmountOut).encode();
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
      data: data,
    });
  }

  /**
   * Generate Transaction Instruction that withdraws non-native token from DCA vault
   */
  static withdrawToken(
    source: PublicKey,
    vault: PublicKey,
    mint: PublicKey,
    sourceTokenAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    dcaAccount: PublicKey,
    transferAmount: BN
  ) {
    const data = new WithdrawTokenData(transferAmount).encode();
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
      data: data,
    });
  }

  /**
   * Generate Transaction Instruction that withdraws native token from DCA vault
   */
  static withdrawSol(
    source: PublicKey,
    vault: PublicKey,
    mint: PublicKey,
    sourceTokenAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    dcaAccount: PublicKey,
    nativeMint: PublicKey,
    vaultNativeMintAccount: PublicKey,
    sourceNativeMintAccount: PublicKey,
    transferAmount: BN
  ) {
    const data = new WithdrawSolData(transferAmount).encode();
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
      AccountMetaFactory.newWritable(sourceNativeMintAccount, false),
    ];
    return new TransactionInstruction({
      keys: keys,
      programId: DCA_PROGRAM_ID,
      data: data,
    });
  }

  /**
   * Generate transaction instruction that fund token in initialized dca
   */
  static fundToken(
    source: PublicKey,
    vault: PublicKey,
    mint: PublicKey,
    sourceTokenAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    dcaAccount: PublicKey,
    transferAmount: BN
  ) {
    const data = new FundTokenData(transferAmount).encode();
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
      data: data,
    });
  }

  /**
   * Generate transaction instruction that sol to intialized dca process
   */
  static fundSol(
    source: PublicKey,
    vault: PublicKey,
    mint: PublicKey,
    nativeMint: PublicKey,
    sourceTokenAccount: PublicKey,
    vaultNativeMintAccount: PublicKey,
    vaultTokenAccount: PublicKey,
    dcaAccount: PublicKey,
    transferAmount: BN
  ) {
    const data = new FundSolData(transferAmount).encode();
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
      data: data,
    });
  }
}
