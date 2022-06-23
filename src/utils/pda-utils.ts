import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

import { DCA_PROGRAM_ID } from '../constants';

export async function findProgramAddress(
  seeds: Buffer[],
  programId = DCA_PROGRAM_ID
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(seeds, programId);
}

export async function findVaultAddress(
  owner: PublicKey,
  dcaAccount: PublicKey
): Promise<PublicKey> {
  return (
    await findProgramAddress([owner.toBuffer(), dcaAccount.toBuffer()])
  )[0];
}

export async function findAssociatedTokenAddress(
  owner: PublicKey,
  mint: PublicKey
): Promise<PublicKey> {
  return (
    await findProgramAddress(
      [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0];
}
