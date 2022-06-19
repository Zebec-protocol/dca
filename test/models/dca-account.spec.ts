import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { expect } from "chai";
import { connection } from "../../src/constants";
import { DcaAccount } from "../../src/models";

describe("DcaAccount Test", () => {
    const totalAmount = new BN("1000");
    const authority = new PublicKey("DwUpLYhWd2K5eufzuJubmHRheQcUAhwWPV8FYgy7Fg8U");
    const mintAddress = new PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R");
    const startTime = new BN("1655285987");
    const dcaAmount = new BN("1000");
    const dcaTime = new BN("1800");
    const minimumAmountOut = new BN("1000");

    describe('getDcaAccountInfo()', () => {
        it("deserialize and get Dca account data", async () => {
            const actual = await DcaAccount.getDcaAccountInfo(
                connection,
                new PublicKey("AtTJrt7hSCpT4pYB3R7S3Xi59dgp7jVRAEGKJSyjH1nX")
            );
            expect(actual).to.be.instanceOf(DcaAccount);
            expect(actual.totalAmount.toString()).eq(totalAmount.toString());
            expect(actual.authority).deep.equal(authority);
            expect(actual.mintAddress).deep.equal(mintAddress);
            expect(actual.startTime.toString()).to.equal(startTime.toString());
            expect(actual.dcaAmount.toString()).to.equal(dcaAmount.toString());
            expect(actual.dcaTime.toString()).to.equal(dcaTime.toString());
            expect(actual.minimumAmountOut.toString()).to.equal(minimumAmountOut.toString());
            expect(actual.state).to.be.true;
            expect(actual.flag).to.equal(2);
        })
    })
})