"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcaAccount = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const constants_1 = require("../constants");
/**
 * The class for the dca account state in DCA program
 */
class DcaAccount {
    constructor(param) {
        this._totalAmount = param.totalAmount;
        this._authority = new web3_js_1.PublicKey(param.authority);
        this._mintAddress = new web3_js_1.PublicKey(param.mintAddress);
        this._startTime = param.startTime;
        this._dcaAmount = param.dcaAmount;
        this._dcaTime = param.dcaTime;
        this._flag = param.flag;
        this._state = param.state === 1;
        this._minimumAmountOut = param.minimumAmountOut;
    }
    /**
     * The total amount of currency or token which will be used for dca process.
     */
    get totalAmount() {
        return this._totalAmount;
    }
    /**
     * The address of authority who deposit and initiates the dca process.
     */
    get authority() {
        return this._authority;
    }
    /**
     * The token mint address which is used to swap from or to sol (native mint).
     */
    get mintAddress() {
        return this._mintAddress;
    }
    /**
     * The unix timestamp from which the last swap is performed.
     */
    get startTime() {
        return this._startTime;
    }
    /**
     * The amount of currency or token to be used for the swap from the total amount at a time.
     */
    get dcaAmount() {
        return this._dcaAmount;
    }
    /**
     * The time interval or span between to consecutive swap process. The value should be in seconds.
     */
    get dcaTime() {
        return this._dcaTime;
    }
    /**
     * The state signifies whether the dca process has been initialized or not.
     */
    get state() {
        return this._state;
    }
    /**
     * The flag tells whether to swap from sol to mint or mint to sol.
     */
    get flag() {
        return this._flag;
    }
    /**
     * The minimum amount out expected from the swap.
     */
    get minimumAmountOut() {
        return this._minimumAmountOut;
    }
    /**
     * Decode buffer data to DcaAccount Object
     */
    static decodeUnchecked(data) {
        return (0, borsh_1.deserializeUnchecked)(dcaAccountSchema, this, data);
    }
    /**
     * Get Dca account info of given address
     */
    static async getDcaAccountInfo(connection, address, commitment, programId = constants_1.DCA_PROGRAM_ID) {
        const info = await connection.getAccountInfo(address, commitment);
        if (!info)
            throw new Error("Dca Account not found.");
        if (!info.owner.equals(programId))
            throw new Error("Account is not owned by Dca Program.");
        const dcaAcount = this.decodeUnchecked(info.data);
        return dcaAcount;
    }
}
exports.DcaAccount = DcaAccount;
const dcaAccountSchema = new Map([
    [
        DcaAccount,
        {
            kind: "struct",
            fields: [
                ["totalAmount", "u64"],
                ["authority", [32]],
                ["mintAddress", [32]],
                ["startTime", "u64"],
                ["dcaAmount", "u64"],
                ["dcaTime", "u64"],
                ["flag", "u8"],
                ["state", "u8"],
                ["minimumAmountOut", "u64"],
            ]
        }
    ]
]);
//# sourceMappingURL=dca-account.js.map