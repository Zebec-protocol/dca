import { ASSOCIATED_TOKEN_PROGRAM_ID, NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { AccountMeta, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { DcaInstruction } from "../../src/instruction/instruction";
import { findProgramAddress, findAssociatedTokenAddress } from "../../src/utils"

// describe("Instruction Test", () => {

//     const owner = new PublicKey("DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHmZEYC8RTb");
//     const dcaData = new PublicKey("9cf445gfnu7ZnKQXMRrddkBN8xvozFk5n8dDVusr4xoK");
//     const mint = new PublicKey("5swt9oXbzr57dmPMZniWFoETYotCpbT7bpYbYViFGuoN");

//     describe("Deposit Instruction", () => {
//         it("should have expected value in keys", async () => {
//             const [vault,] = await findProgramAddress([owner.toBuffer(), dcaData.toBuffer()]);
//             const [ownerAta,] = await findAssociatedTokenAddress(owner, mint);
//             const [nmVaultAta,] = await findAssociatedTokenAddress(vault, NATIVE_MINT);
//             const [vaultAta,] = await findAssociatedTokenAddress(vault, mint);
//             const amount = new BN("500000000");

//             const actual = DcaInstruction.depositToken({
//                 depositor: owner,
//                 vault,
//                 mint,
//                 nativeMint: NATIVE_MINT,
//                 ownerAta,
//                 vaultAta,
//                 nmVaultAta,
//                 dcaAccount: dcaData,
//                 amount
//             });

//             const keys: AccountMeta[] = [
//                 // { pubkey: }
//             ]
//         })
//     })

// })