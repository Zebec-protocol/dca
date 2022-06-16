import { PublicKey } from "@solana/web3.js";
import { expect } from "chai";
import { describe } from "mocha";
import { AccountMetaFactory } from "../../src/utils";


describe("accountMetasFactory utils test", () => {
    const testKey = new PublicKey("5swt9oXbzr57dmPMZniWFoETYotCpbT7bpYbYViFGuoN");

    describe("newWritable()", () => {
        it("creates writable signer account meta", () => {
            const expectation = {
                pubkey: testKey,
                isSigner: true,
                isWritable: true
            };
            const reality = AccountMetaFactory.newWritable(testKey, true);
            expect(reality).to.deep.equal(expectation);
        });

        it("creates writable non signer account meta", () => {
            const expectation = {
                pubkey: testKey,
                isSigner: false,
                isWritable: true
            };
            const reality = AccountMetaFactory.newWritable(testKey, false);
            expect(reality).to.deep.equal(expectation);
        });
    })

    describe("newReadable()", () => {
        it("creates readonly signer account meta", () => {
            const expectation = {
                pubkey: testKey,
                isSigner: true,
                isWritable: false
            };
            const reality = AccountMetaFactory.newReadonly(testKey, true);
            expect(reality).to.deep.equal(expectation);
        });

        it("creates readonly non signer account meta", () => {
            const expectation = {
                pubkey: testKey,
                isSigner: false,
                isWritable: false
            };
            const reality = AccountMetaFactory.newReadonly(testKey, false);
            expect(reality).to.deep.equal(expectation);
        });
    })
});
