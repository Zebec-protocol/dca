"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMintInfo = void 0;
const spl_token_1 = require("@solana/spl-token");
async function getMintInfo(connection, address, commitment, programId = spl_token_1.TOKEN_PROGRAM_ID) {
    const info = await connection.getAccountInfo(address, commitment);
    if (!info)
        throw new Error("Token not found.");
    if (!info.owner.equals(programId))
        throw new Error("Mint is not owned by Token Program.");
    if (info.data.length !== spl_token_1.MintLayout.span)
        throw new Error("Account size of mint is invalid.");
    const rawMint = spl_token_1.MintLayout.decode(Uint8Array.from(info.data));
    return {
        mintAuthority: rawMint.mintAuthorityOption ? rawMint.mintAuthority : null,
        supply: rawMint.supply,
        decimals: rawMint.decimals,
        isInitialized: rawMint.isInitialized,
        freezeAuthority: rawMint.freezeAuthorityOption ? rawMint.freezeAuthority : null,
    };
}
exports.getMintInfo = getMintInfo;
//# sourceMappingURL=token-utils.js.map