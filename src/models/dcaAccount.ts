import { Commitment, Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { deserializeUnchecked } from "borsh";
import { DCA_PROGRAM_ID } from "../constants";

/**
 * The class for the dca account state in DCA program
 */
export class DcaAccount {
    private _totalAmount: BN;
    private _authority: PublicKey;
    private _mintAddress: PublicKey;
    private _startTime: BN;
    private _dcaAmount: BN;
    private _dcaTime: BN;
    private _state: number;
    private _flag: number;
    private _minimumAmountOut: BN;

    constructor(param: {
        totalAmount: BN,
        authority: PublicKey,
        mintAddress: PublicKey,
        startTime: BN,
        dcaAmount: BN,
        dcaTime: BN,
        state: number,
        flag: number,
        minimumAmountOut: BN
    }) {
        this._totalAmount = param.totalAmount;
        this._authority = new PublicKey(param.authority);
        this._mintAddress = new PublicKey(param.mintAddress);
        this._startTime = param.startTime;
        this._dcaAmount = param.dcaAmount;
        this._dcaTime = param.dcaTime;
        this._state = param.flag;
        this._flag = param.state;
        this._minimumAmountOut = param.minimumAmountOut;
    }

    /**
     * The total amount of currency or token which will be used for dca process.
     */
    public get totalAmount(): BN {
        return this._totalAmount;
    }

    /**
     * The address of authority who deposit and initiates the dca process.
     */
    public get authority(): PublicKey {
        return this._authority;
    }

    /**
     * The token mint address which is used to swap from or to sol (native mint).
     */
    public get mintAddress(): PublicKey {
        return this._mintAddress;
    }

    /**
     * The unix timestamp from which the last swap is performed.
     */
    public get startTime(): BN {
        return this._startTime;
    }

    /**
     * The amount of currency or token to be used for the swap from the total amount at a time.
     */
    public get dcaAmount(): BN {
        return this._dcaAmount;
    }

    /**
     * The time interval or span between to consecutive swap process. The value should be in seconds. 
     */
    public get dcaTime(): BN {
        return this._dcaTime;
    }

    /**
     * The state signifies whether the dca process has been initialized or not.
     */
    public get state(): boolean {
        return this._state === 1;
    }

    /**
     * The flag tells whether to swap from sol to mint or mint to sol.
     */
    public get flag(): "SolToMint" | "MintToSol" | undefined {
        if (this._flag === 1) return "SolToMint";
        else if (this._flag === 2) return "MintToSol";
        else return undefined;
    }

    /**
     * The minimum amount out expected from the swap.
     */
    public get minimumAmountOut(): BN {
        return this._minimumAmountOut;
    }

    /**
     * Decode buffer data to DcaAccount Object
     */
    static decodeUnchecked(data: Buffer) {
        return deserializeUnchecked(dcaAccountSchema, this, data);
    }

    /**
     * Get Dca account info of given address
     */
    static async getDcaAccountInfo(connection: Connection, address: PublicKey, commitment?: Commitment, programId = DCA_PROGRAM_ID) {
        const info = await connection.getAccountInfo(address, commitment);
        if (!info) throw new Error("Dca Account not found.");
        if (!info.owner.equals(programId)) throw new Error("Account is not owned by Dca Program.");
        const dcaAcount = this.decodeUnchecked(info.data);
        return dcaAcount;
    }

}

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
                ["state", "u8"],
                ["flag", "u8"],
                ["minimumAmountOut", "u64"],
            ]
        }
    ]
]);