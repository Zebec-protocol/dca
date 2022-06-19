import { Commitment, Connection, PublicKey } from "@solana/web3.js";
export declare function getMintInfo(connection: Connection, address: PublicKey, commitment?: Commitment, programId?: PublicKey): Promise<{
    mintAuthority: any;
    supply: any;
    decimals: any;
    isInitialized: any;
    freezeAuthority: any;
}>;
//# sourceMappingURL=token-utils.d.ts.map