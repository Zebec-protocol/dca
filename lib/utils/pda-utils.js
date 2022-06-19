"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAssociatedTokenAddress = exports.findVaultAddress = exports.findProgramAddress = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
async function findProgramAddress(seeds, programId = constants_1.DCA_PROGRAM_ID) {
    return await web3_js_1.PublicKey.findProgramAddress(seeds, programId);
}
exports.findProgramAddress = findProgramAddress;
async function findVaultAddress(owner, dcaAccount) {
    return (await findProgramAddress([
        owner.toBuffer(),
        dcaAccount.toBuffer()
    ]))[0];
}
exports.findVaultAddress = findVaultAddress;
async function findAssociatedTokenAddress(owner, mint) {
    return (await findProgramAddress([
        owner.toBuffer(),
        spl_token_1.TOKEN_PROGRAM_ID.toBuffer(),
        mint.toBuffer()
    ], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID))[0];
}
exports.findAssociatedTokenAddress = findAssociatedTokenAddress;
//# sourceMappingURL=pda-utils.js.map