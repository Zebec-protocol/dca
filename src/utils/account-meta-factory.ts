import { PublicKey, AccountMeta } from "@solana/web3.js";

export class AccountMetaFactory {
    /**
     * Create an writable account meta.
     */
    static newWritable(address: PublicKey, isSigner: boolean): AccountMeta {
        return {
            pubkey: address,
            isSigner: isSigner,
            isWritable: true
        };
    }

    /**
     * Create an readonly account meta.
     */
    static newReadonly(address: PublicKey, isSigner: boolean): AccountMeta {
        return {
            pubkey: address,
            isSigner: isSigner,
            isWritable: false
        }
    }
}