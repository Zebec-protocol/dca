"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DcaInstruction = void 0;

var _splToken = require("@solana/spl-token");

var _web = require("@solana/web3.js");

var _constants = require("../constants");

var _utils = require("../utils");

var _data = require("./data");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * The DCA program instruction factory class.
 */
var DcaInstruction = /*#__PURE__*/function () {
  function DcaInstruction() {
    _classCallCheck(this, DcaInstruction);
  }

  _createClass(DcaInstruction, null, [{
    key: "depositToken",
    value:
    /**
     * Generate transaction instruction that deposit into DCA vault
     */
    function depositToken(source, vault, tokenMint, sourceTokenAccount, vaultTokenAccount, amount) {
      var data = new _data.DepositTokenData(amount).encode();
      var keys = [_utils.AccountMetaFactory.newWritable(source, true), _utils.AccountMetaFactory.newWritable(vault, false), _utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false), _utils.AccountMetaFactory.newWritable(tokenMint, false), _utils.AccountMetaFactory.newReadonly(_web.SystemProgram.programId, false), _utils.AccountMetaFactory.newReadonly(_web.SYSVAR_RENT_PUBKEY, false), _utils.AccountMetaFactory.newWritable(sourceTokenAccount, false), _utils.AccountMetaFactory.newWritable(vaultTokenAccount, false), _utils.AccountMetaFactory.newReadonly(_splToken.ASSOCIATED_TOKEN_PROGRAM_ID, false)];
      return new _web.TransactionInstruction({
        keys: keys,
        programId: _constants.DCA_PROGRAM_ID,
        data: data
      });
    }
    /**
     * Generate transaction instruction to intialize the dca process
     */

  }, {
    key: "initialize",
    value: function initialize(source, vault, tokenMintFrom, tokenMintTo, vaultTokenAccountFrom, vaultTokenAccountTo, dcaAccount, startTime, dcaAmount, frequency) {
      var data = new _data.InitializeData(startTime, dcaAmount, frequency).encode();
      var keys = [_utils.AccountMetaFactory.newWritable(source, true), _utils.AccountMetaFactory.newWritable(vault, false), _utils.AccountMetaFactory.newWritable(tokenMintFrom, false), _utils.AccountMetaFactory.newWritable(tokenMintTo, false), _utils.AccountMetaFactory.newWritable(vaultTokenAccountFrom, false), _utils.AccountMetaFactory.newWritable(vaultTokenAccountTo, false), _utils.AccountMetaFactory.newWritable(dcaAccount, true), _utils.AccountMetaFactory.newReadonly(_web.SystemProgram.programId, false), _utils.AccountMetaFactory.newReadonly(_web.SYSVAR_RENT_PUBKEY, false), _utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false), _utils.AccountMetaFactory.newReadonly(_splToken.ASSOCIATED_TOKEN_PROGRAM_ID, false)];
      return new _web.TransactionInstruction({
        keys: keys,
        programId: _constants.DCA_PROGRAM_ID,
        data: data
      });
    }
    /**
     * Generate transaction instruction to swap
     */

  }, {
    key: "swap",
    value: function swap(liquidityProgramId, ammAccount, ammAuthority, ammOpenOrder, ammTargetOrder, poolCoinTokenAccount, poolPcTokenAccount, serumMarketProgramId, serumMarket, serumBids, serumAsk, serumEventQueue, serumCoinVault, serumPcVault, serumVaultSigner, vault, vaultTokenAccountFrom, vaultTokenAccountTo, tokenMintFrom, tokenMintTo, source, dcaAccount, minimumAmountOut) {
      var data = new _data.SwapData(minimumAmountOut).encode();
      var keys = [_utils.AccountMetaFactory.newReadonly(liquidityProgramId, false), _utils.AccountMetaFactory.newWritable(ammAccount, false), _utils.AccountMetaFactory.newReadonly(ammAuthority, false), _utils.AccountMetaFactory.newWritable(ammOpenOrder, false), _utils.AccountMetaFactory.newWritable(ammTargetOrder, false), _utils.AccountMetaFactory.newWritable(poolCoinTokenAccount, false), _utils.AccountMetaFactory.newWritable(poolPcTokenAccount, false), _utils.AccountMetaFactory.newReadonly(serumMarketProgramId, false), _utils.AccountMetaFactory.newWritable(serumMarket, false), _utils.AccountMetaFactory.newWritable(serumBids, false), _utils.AccountMetaFactory.newWritable(serumAsk, false), _utils.AccountMetaFactory.newWritable(serumEventQueue, false), _utils.AccountMetaFactory.newWritable(serumCoinVault, false), _utils.AccountMetaFactory.newWritable(serumPcVault, false), _utils.AccountMetaFactory.newReadonly(serumVaultSigner, false), _utils.AccountMetaFactory.newWritable(vault, false), _utils.AccountMetaFactory.newWritable(vaultTokenAccountFrom, false), _utils.AccountMetaFactory.newWritable(vaultTokenAccountTo, false), _utils.AccountMetaFactory.newWritable(tokenMintFrom, false), _utils.AccountMetaFactory.newWritable(tokenMintTo, false), _utils.AccountMetaFactory.newWritable(source, false), _utils.AccountMetaFactory.newWritable(dcaAccount, false), _utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false)];
      return new _web.TransactionInstruction({
        keys: keys,
        programId: _constants.DCA_PROGRAM_ID,
        data: data
      });
    }
    /**
     * Generate Transaction Instruction to withdraw token from DCA vault
     */

  }, {
    key: "withdrawToken",
    value: function withdrawToken(source, vault, tokenMint, sourceTokenAccount, vaultTokenAccount, transferAmount) {
      var data = new _data.WithdrawTokenData(transferAmount).encode();
      var keys = [_utils.AccountMetaFactory.newWritable(source, true), _utils.AccountMetaFactory.newWritable(vault, false), _utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false), _utils.AccountMetaFactory.newWritable(tokenMint, false), _utils.AccountMetaFactory.newReadonly(_web.SystemProgram.programId, false), _utils.AccountMetaFactory.newReadonly(_web.SYSVAR_RENT_PUBKEY, false), _utils.AccountMetaFactory.newWritable(sourceTokenAccount, false), _utils.AccountMetaFactory.newWritable(vaultTokenAccount, false), _utils.AccountMetaFactory.newReadonly(_splToken.ASSOCIATED_TOKEN_PROGRAM_ID, false)];
      return new _web.TransactionInstruction({
        keys: keys,
        programId: _constants.DCA_PROGRAM_ID,
        data: data
      });
    }
  }]);

  return DcaInstruction;
}();

exports.DcaInstruction = DcaInstruction;
//# sourceMappingURL=instruction.js.map