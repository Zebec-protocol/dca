import { expect } from 'chai';
import { describe } from 'mocha';

import {
  Keypair,
  PublicKey,
} from '@solana/web3.js';

import {
  DcaClientFactory,
  DcaOnlineClient,
} from '../../src/clients';
import { DcaOfflineClient } from '../../src/clients/offline-client';
import { connection } from '../../src/constants';

describe("Dca client factory test", () => {
  const dcaOfflineClient = new DcaClientFactory()
    .setConnection(connection)
    .buildPayerClient(Keypair.generate());

  const dcaOnlineClient = new DcaClientFactory()
    .setConnection(connection)
    .buildOnlineClient({
      publicKey: new PublicKey("DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHmZEYC8RTb"),
      async signTransaction(transaction) {
        return transaction;
      },
      async signAllTransactions(transactions) {
        return transactions;
      },
    });

  describe("Dca client factory", () => {
    it("create online client for DCA", () => {
      expect(dcaOfflineClient).to.be.instanceOf(DcaOfflineClient);
    });
  });

  describe("Dca client factory", () => {
    it("create offline client for Dca", () => {
      expect(dcaOnlineClient).to.be.instanceOf(DcaOnlineClient);
    });
  });
});
