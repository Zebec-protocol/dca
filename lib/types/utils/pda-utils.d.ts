/// <reference types="node" />
import { PublicKey } from "@solana/web3.js";
export declare function findProgramAddress(seeds: Buffer[], programId?: PublicKey): Promise<[PublicKey, number]>;
export declare function findVaultAddress(owner: PublicKey): Promise<PublicKey>;
export declare function findAssociatedTokenAddress(owner: PublicKey, mint: PublicKey): Promise<PublicKey>;
