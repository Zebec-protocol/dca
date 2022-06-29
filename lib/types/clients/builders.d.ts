import { Commitment, Connection, Keypair } from "@solana/web3.js";
import { IWalletAdapter } from "./base";
import { DcaOfflineClient } from "./offline-client";
import { DcaOnlineClient } from "./online-client";
export declare class DcaClientFactory {
    private _connection;
    private _commitment;
    private _preflightCommitment;
    constructor();
    setConnection(connection: Connection): this;
    setPreflightCommitment(preflightCommitment: Commitment): this;
    setCommitment(commitment: Commitment): this;
    buildOnlineClient(adapter: IWalletAdapter): DcaOnlineClient;
    buildOfflineClient(payer: Keypair): DcaOfflineClient;
}
