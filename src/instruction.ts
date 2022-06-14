import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

type DepositTokenInstructionParam = {
    depositor: PublicKey,
    vault: PublicKey,
    mint: PublicKey,
    nativeMint: PublicKey,
    ownerAta: PublicKey,
    vaultAta: PublicKey,
    nmVaultAta: PublicKey,
    dcaAccount: PublicKey,
    amount: BN
}


/**
 * The DCA program instruction factory class. 
 */
export class DcaInstruction {

    /**
     * Generate instruction to deposit token
     */
    static depositToken({ depositor, vault, mint, nativeMint, ownerAta, nmVaultAta, dcaAccount, amount }: DepositTokenInstructionParam) {

    }
}