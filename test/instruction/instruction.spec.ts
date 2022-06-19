import { ASSOCIATED_TOKEN_PROGRAM_ID, NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { AccountMeta, Keypair, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import BN from "bn.js";
import { expect } from "chai";
import { DCA_PROGRAM_ID } from "../../src/constants";
import { DepositSolData, DepositTokenData, InitializeData, SwapFromSolData, SwapToSolData } from "../../src/instruction/data";
import { DcaInstruction } from "../../src/instruction/instruction";
import { findAssociatedTokenAddress, findVaultAddress } from "../../src/utils"

describe("DcaInstruction Test", () => {

    const owner = new Keypair().publicKey;
    const dcaData = new Keypair().publicKey;
    const mint = new Keypair().publicKey;
    const vault = new Keypair().publicKey;
    const ownerTokenAccount = new Keypair().publicKey;
    const ownerNativeMintAccount = new Keypair().publicKey;
    const vaultTokenAccount = new Keypair().publicKey;
    const vaultNativeMintAccount = new Keypair().publicKey;
    const liquidityProgramId = new Keypair().publicKey;
    const amm = new Keypair().publicKey;
    const ammAuthority = new Keypair().publicKey;
    const ammOpenOrder = new Keypair().publicKey;
    const ammTargetOrder = new Keypair().publicKey;
    const poolCoinToken = new Keypair().publicKey;
    const poolPcToken = new Keypair().publicKey;
    const serumMarketProgramId = new Keypair().publicKey;
    const serumMarket = new Keypair().publicKey;
    const serumBids = new Keypair().publicKey;
    const serumAsk = new Keypair().publicKey;
    const serumEventQueue = new Keypair().publicKey;
    const serumCoinVault = new Keypair().publicKey;
    const serumPcVault = new Keypair().publicKey;
    const serumVaultSigner = new Keypair().publicKey;

    const amount = new BN("500000000");
    const startTime = new BN("100000000");
    const dcaAmount = new BN("100000000");
    const dcaTime = new BN("100000000");
    const minimumAmountOut = new BN("100000000");


    describe("depositToken()", () => {
        it("should have expected value in its props", async () => {

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
        });
    });


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
        });
    });

    describe("initialize()", () => {
        it("should have expected value in its props", async () => {

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
        });
    });

    describe('swapToSol()', () => {
        it("should have expected value in its props", async () => {
            const actual = DcaInstruction.swapToSol(
                liquidityProgramId,
                amm,
                ammAuthority,
                ammOpenOrder,
                ammTargetOrder,
                poolCoinToken,
                poolPcToken,
                serumMarketProgramId,
                serumMarket,
                serumBids,
                serumAsk,
                serumEventQueue,
                serumCoinVault,
                serumPcVault,
                serumVaultSigner,
                vault,
                vaultNativeMintAccount,
                vaultTokenAccount,
                mint,
                owner,
                dcaData,
                NATIVE_MINT,
                minimumAmountOut
            );

            const keys: AccountMeta[] = [
                { pubkey: liquidityProgramId, isSigner: false, isWritable: false },
                { pubkey: amm, isSigner: false, isWritable: true },
                { pubkey: ammAuthority, isSigner: false, isWritable: false },
                { pubkey: ammOpenOrder, isSigner: false, isWritable: true },
                { pubkey: ammTargetOrder, isSigner: false, isWritable: true },
                { pubkey: poolCoinToken, isSigner: false, isWritable: true },
                { pubkey: poolPcToken, isSigner: false, isWritable: true },
                { pubkey: serumMarketProgramId, isSigner: false, isWritable: false },
                { pubkey: serumMarket, isSigner: false, isWritable: true },
                { pubkey: serumBids, isSigner: false, isWritable: true },
                { pubkey: serumAsk, isSigner: false, isWritable: true },
                { pubkey: serumEventQueue, isSigner: false, isWritable: true },
                { pubkey: serumCoinVault, isSigner: false, isWritable: true },
                { pubkey: serumPcVault, isSigner: false, isWritable: true },
                { pubkey: serumVaultSigner, isSigner: false, isWritable: false },
                { pubkey: vaultTokenAccount, isSigner: false, isWritable: true },
                { pubkey: vault, isSigner: false, isWritable: true },
                { pubkey: vaultNativeMintAccount, isSigner: false, isWritable: true },
                { pubkey: mint, isSigner: false, isWritable: true },
                { pubkey: owner, isSigner: false, isWritable: true },
                { pubkey: dcaData, isSigner: false, isWritable: true },
                { pubkey: NATIVE_MINT, isSigner: false, isWritable: true },
                { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            ];

            const data = new SwapToSolData(minimumAmountOut).encode();

            expect(actual.keys).deep.equal(keys);
            expect(actual.data).deep.equal(data);
            expect(actual.programId).equal(DCA_PROGRAM_ID);
        });
    });

    describe('swapFromSol()', () => {
        it("should have expected value in its props", async () => {
            const actual = DcaInstruction.swapFromSol(
                liquidityProgramId,
                amm,
                ammAuthority,
                ammOpenOrder,
                ammTargetOrder,
                poolCoinToken,
                poolPcToken,
                serumMarketProgramId,
                serumMarket,
                serumBids,
                serumAsk,
                serumEventQueue,
                serumCoinVault,
                serumPcVault,
                serumVaultSigner,
                vault,
                vaultNativeMintAccount,
                vaultTokenAccount,
                mint,
                owner,
                dcaData,
                NATIVE_MINT,
                minimumAmountOut
            );

            const keys: AccountMeta[] = [
                { pubkey: liquidityProgramId, isSigner: false, isWritable: false },
                { pubkey: amm, isSigner: false, isWritable: true },
                { pubkey: ammAuthority, isSigner: false, isWritable: false },
                { pubkey: ammOpenOrder, isSigner: false, isWritable: true },
                { pubkey: ammTargetOrder, isSigner: false, isWritable: true },
                { pubkey: poolCoinToken, isSigner: false, isWritable: true },
                { pubkey: poolPcToken, isSigner: false, isWritable: true },
                { pubkey: serumMarketProgramId, isSigner: false, isWritable: false },
                { pubkey: serumMarket, isSigner: false, isWritable: true },
                { pubkey: serumBids, isSigner: false, isWritable: true },
                { pubkey: serumAsk, isSigner: false, isWritable: true },
                { pubkey: serumEventQueue, isSigner: false, isWritable: true },
                { pubkey: serumCoinVault, isSigner: false, isWritable: true },
                { pubkey: serumPcVault, isSigner: false, isWritable: true },
                { pubkey: serumVaultSigner, isSigner: false, isWritable: false },
                { pubkey: vault, isSigner: false, isWritable: true },
                { pubkey: vaultNativeMintAccount, isSigner: false, isWritable: true },
                { pubkey: vaultTokenAccount, isSigner: false, isWritable: true },
                { pubkey: mint, isSigner: false, isWritable: true },
                { pubkey: owner, isSigner: false, isWritable: true },
                { pubkey: dcaData, isSigner: false, isWritable: true },
                { pubkey: NATIVE_MINT, isSigner: false, isWritable: true },
                { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            ];

            const data = new SwapFromSolData(minimumAmountOut).encode();

            expect(actual.keys).deep.equal(keys);
            expect(actual.data).deep.equal(data);
            expect(actual.programId).equal(DCA_PROGRAM_ID);
        });
    });
})