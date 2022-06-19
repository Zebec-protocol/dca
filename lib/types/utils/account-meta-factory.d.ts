import { PublicKey, AccountMeta } from "@solana/web3.js";
export declare class AccountMetaFactory {
    /**
     * Create an writable account meta.
     */
    static newWritable(address: PublicKey, isSigner: boolean): AccountMeta;
    /**
     * Create an readonly account meta.
     */
    static newReadonly(address: PublicKey, isSigner: boolean): AccountMeta;
}
//# sourceMappingURL=account-meta-factory.d.ts.map