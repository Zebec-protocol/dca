"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMetaFactory = void 0;
class AccountMetaFactory {
    /**
     * Create an writable account meta.
     */
    static newWritable(address, isSigner) {
        return {
            pubkey: address,
            isSigner: isSigner,
            isWritable: true
        };
    }
    /**
     * Create an readonly account meta.
     */
    static newReadonly(address, isSigner) {
        return {
            pubkey: address,
            isSigner: isSigner,
            isWritable: false
        };
    }
}
exports.AccountMetaFactory = AccountMetaFactory;
//# sourceMappingURL=account-meta-factory.js.map