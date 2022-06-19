import { ASSOCIATED_TOKEN_PROGRAM_ID, NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { AccountMeta, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import BN from "bn.js";
import { expect } from "chai";
import { DCA_PROGRAM_ID } from "../../src/constants";
import { DepositSolData, DepositTokenData, InitializeData } from "../../src/instruction/data";
import { DcaInstruction } from "../../src/instruction/instruction";
import { findAssociatedTokenAddress, findVaultAddress } from "../../src/utils"

describe("DcaInstruction Test", () => {

    const owner = new PublicKey("DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHmZEYC8RTb");
    const dcaData = new PublicKey("9cf445gfnu7ZnKQXMRrddkBN8xvozFk5n8dDVusr4xoK");
    const mint = new PublicKey("5swt9oXbzr57dmPMZniWFoETYotCpbT7bpYbYViFGuoN");

    describe("depositToken()", () => {
        it("should have expected value in its props", async () => {
            const vault = await findVaultAddress(owner, dcaData);
            const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
            const vaultNativeMintAccount = await findAssociatedTokenAddress(vault, NATIVE_MINT);
            const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
            const amount = new BN("500000000");

            const actual = DcaInstruction.depositToken(
                owner,
                vault,
                mint,
                NATIVE_MINT,
                ownerTokenAccount,
                vaultTokenAccount,
                vaultNativeMintAccount,
                dcaData,
                amount
            );

            const keys: AccountMeta[] = [
                { pubkey: owner, isSigner: true, isWritable: true },
                { pubkey: vault, isSigner: false, isWritable: true },
                { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
                { pubkey: mint, isSigner: false, isWritable: true },
                { pubkey: NATIVE_MINT, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
                { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
                { pubkey: ownerTokenAccount, isSigner: false, isWritable: true },
                { pubkey: vaultTokenAccount, isSigner: false, isWritable: true },
                { pubkey: vaultNativeMintAccount, isSigner: false, isWritable: true },
                { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
                { pubkey: dcaData, isSigner: true, isWritable: true },
            ];

            const data = new DepositTokenData(amount).encode();

            expect(actual.keys).deep.equal(keys);
            expect(actual.data).deep.equal(data);
            expect(actual.programId).equal(DCA_PROGRAM_ID);
        })
    })


    describe("depositSol()", () => {
        it("should have expected value in its props", async () => {
            const vault = await findVaultAddress(owner, dcaData);
            const ownerTokenAccount = await findAssociatedTokenAddress(owner, mint);
            const vaultNativeMintAccount = await findAssociatedTokenAddress(vault, NATIVE_MINT);
            const vaultTokenAccount = await findAssociatedTokenAddress(vault, mint);
            const amount = new BN("500000000");

            const actual = DcaInstruction.depositSol(
                owner,
                vault,
                mint,
                NATIVE_MINT,
                ownerTokenAccount,
                vaultNativeMintAccount,
                vaultTokenAccount,
                dcaData,
                amount
            );

            const keys: AccountMeta[] = [
                { pubkey: owner, isSigner: true, isWritable: true },
                { pubkey: vault, isSigner: false, isWritable: true },
                { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
                { pubkey: mint, isSigner: false, isWritable: true },
                { pubkey: NATIVE_MINT, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
                { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
                { pubkey: ownerTokenAccount, isSigner: false, isWritable: true },
                { pubkey: vaultNativeMintAccount, isSigner: false, isWritable: true },
                { pubkey: vaultTokenAccount, isSigner: false, isWritable: true },
                { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
                { pubkey: dcaData, isSigner: true, isWritable: true },
            ]

            const data = new DepositSolData(amount).encode();

            expect(actual.keys).deep.equal(keys);
            expect(actual.data).deep.equal(data);
            expect(actual.programId).equal(DCA_PROGRAM_ID);
        })
    })

    describe("initialize()", () => {
        it("should have expected value in its props", async () => {
            const vault = await findVaultAddress(owner, dcaData);
            const startTime = new BN("500000000");
            const dcaTime = new BN("500000000");
            const dcaAmount = new BN("500000000");
            const minimumAmountOut = new BN("500000000");

            const actual = DcaInstruction.initialize(
                owner,
                vault,
                dcaData,
                startTime,
                dcaAmount,
                dcaTime,
                minimumAmountOut
            );

            const keys: AccountMeta[] = [
                { pubkey: owner, isSigner: true, isWritable: true },
                { pubkey: vault, isSigner: false, isWritable: true },
                { pubkey: dcaData, isSigner: false, isWritable: true },
            ];

            const data = new InitializeData(startTime, dcaAmount, dcaTime, minimumAmountOut)
                .encode();

            expect(actual.keys).deep.equal(keys);
            expect(actual.data).deep.equal(data);
            expect(actual.programId).equal(DCA_PROGRAM_ID);
        })
    })
})