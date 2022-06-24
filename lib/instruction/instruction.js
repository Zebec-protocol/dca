"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true,
});
exports.DcaInstruction = void 0;

var _web = require("@solana/web3.js");

var _splToken = require("@solana/spl-token");

var _data = require("./data");

var _utils = require("../utils");

var _constants = require("../constants");

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}

function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}

/**
 * The DCA program instruction factory class.
 */
var DcaInstruction = /*#__PURE__*/ (function () {
	function DcaInstruction() {
		_classCallCheck(this, DcaInstruction);
	}

	_createClass(DcaInstruction, null, [
		{
			key: "depositToken",
			value:
				/**
				 * Generate transaction instruction that deposit token to DCA vault
				 */
				function depositToken(
					source,
					vault,
					mint,
					nativeMint,
					sourceTokenAccount,
					vaultTokenAccount,
					vaultNativeMintAccount,
					dcaAccount,
					amount,
				) {
					var data = new _data.DepositTokenData(amount).encode();
					var keys = [
						_utils.AccountMetaFactory.newWritable(source, true),
						_utils.AccountMetaFactory.newWritable(vault, false),
						_utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false),
						_utils.AccountMetaFactory.newWritable(mint, false),
						_utils.AccountMetaFactory.newWritable(nativeMint, false),
						_utils.AccountMetaFactory.newReadonly(_web.SystemProgram.programId, false),
						_utils.AccountMetaFactory.newReadonly(_web.SYSVAR_RENT_PUBKEY, false),
						_utils.AccountMetaFactory.newWritable(sourceTokenAccount, false),
						_utils.AccountMetaFactory.newWritable(vaultTokenAccount, false),
						_utils.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
						_utils.AccountMetaFactory.newReadonly(_splToken.ASSOCIATED_TOKEN_PROGRAM_ID, false),
						_utils.AccountMetaFactory.newWritable(dcaAccount, true),
					];
					return new _web.TransactionInstruction({
						keys: keys,
						programId: _constants.DCA_PROGRAM_ID,
						data: data,
					});
				},
			/**
			 * Generate transaction instruction that deposit native token to DCA vault
			 */
		},
		{
			key: "depositSol",
			value: function depositSol(
				source,
				vault,
				mint,
				nativeMint,
				sourceTokenAccount,
				vaultNativeMintAccount,
				vaultTokenAccount,
				dcaAccount,
				amount,
			) {
				var data = new _data.DepositSolData(amount).encode();
				var keys = [
					_utils.AccountMetaFactory.newWritable(source, true),
					_utils.AccountMetaFactory.newWritable(vault, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false),
					_utils.AccountMetaFactory.newWritable(mint, false),
					_utils.AccountMetaFactory.newWritable(nativeMint, false),
					_utils.AccountMetaFactory.newReadonly(_web.SystemProgram.programId, false),
					_utils.AccountMetaFactory.newReadonly(_web.SYSVAR_RENT_PUBKEY, false),
					_utils.AccountMetaFactory.newWritable(sourceTokenAccount, false),
					_utils.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
					_utils.AccountMetaFactory.newWritable(vaultTokenAccount, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.ASSOCIATED_TOKEN_PROGRAM_ID, false),
					_utils.AccountMetaFactory.newWritable(dcaAccount, true),
				];
				return new _web.TransactionInstruction({
					keys: keys,
					programId: _constants.DCA_PROGRAM_ID,
					data: data,
				});
			},
			/**
			 * Generate transaction instruction that intialize the swap process
			 */
		},
		{
			key: "initialize",
			value: function initialize(source, vault, dcaAccount, startTime, dcaAmount, dcaTime, minimumAmountOut) {
				var data = new _data.InitializeData(startTime, dcaAmount, dcaTime, minimumAmountOut).encode();
				var keys = [
					_utils.AccountMetaFactory.newWritable(source, true),
					_utils.AccountMetaFactory.newWritable(vault, false),
					_utils.AccountMetaFactory.newWritable(dcaAccount, false),
				];
				return new _web.TransactionInstruction({
					keys: keys,
					programId: _constants.DCA_PROGRAM_ID,
					data: data,
				});
			},
			/**
			 * Generate transaction instruction that swap token to sol
			 */
		},
		{
			key: "swapToSol",
			value: function swapToSol(
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
				source,
				dcaAccount,
				nativeMint,
				minimumAmountOut,
			) {
				var data = new _data.SwapToSolData(minimumAmountOut).encode();
				var keys = [
					// amm liquidity pool (raydium)
					_utils.AccountMetaFactory.newReadonly(liquidityProgramId, false),
					_utils.AccountMetaFactory.newWritable(amm, false),
					_utils.AccountMetaFactory.newReadonly(ammAuthority, false),
					_utils.AccountMetaFactory.newWritable(ammOpenOrder, false),
					_utils.AccountMetaFactory.newWritable(ammTargetOrder, false),
					_utils.AccountMetaFactory.newWritable(poolCoinToken, false),
					_utils.AccountMetaFactory.newWritable(poolPcToken, false), // serum market
					_utils.AccountMetaFactory.newReadonly(serumMarketProgramId, false),
					_utils.AccountMetaFactory.newWritable(serumMarket, false),
					_utils.AccountMetaFactory.newWritable(serumBids, false),
					_utils.AccountMetaFactory.newWritable(serumAsk, false),
					_utils.AccountMetaFactory.newWritable(serumEventQueue, false),
					_utils.AccountMetaFactory.newWritable(serumCoinVault, false),
					_utils.AccountMetaFactory.newWritable(serumPcVault, false),
					_utils.AccountMetaFactory.newReadonly(serumVaultSigner, false), // users  (raydium)
					_utils.AccountMetaFactory.newWritable(vaultTokenAccount, false),
					_utils.AccountMetaFactory.newWritable(vault, false),
					_utils.AccountMetaFactory.newWritable(vaultNativeMintAccount, false), // (dca)
					_utils.AccountMetaFactory.newWritable(mint, false),
					_utils.AccountMetaFactory.newWritable(source, false),
					_utils.AccountMetaFactory.newWritable(dcaAccount, false),
					_utils.AccountMetaFactory.newWritable(nativeMint, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false),
				];
				return new _web.TransactionInstruction({
					keys: keys,
					programId: _constants.DCA_PROGRAM_ID,
					data: data,
				});
			},
			/**
			 * Generate transaction instruction that swap token from sol
			 */
		},
		{
			key: "swapFromSol",
			value: function swapFromSol(
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
				source,
				dcaAccount,
				nativeMint,
				minimumAmountOut,
			) {
				var data = new _data.SwapFromSolData(minimumAmountOut).encode();
				var keys = [
					// amm liquidity pool (raydium)
					_utils.AccountMetaFactory.newReadonly(liquidityProgramId, false),
					_utils.AccountMetaFactory.newWritable(amm, false),
					_utils.AccountMetaFactory.newReadonly(ammAuthority, false),
					_utils.AccountMetaFactory.newWritable(ammOpenOrder, false),
					_utils.AccountMetaFactory.newWritable(ammTargetOrder, false),
					_utils.AccountMetaFactory.newWritable(poolCoinToken, false),
					_utils.AccountMetaFactory.newWritable(poolPcToken, false), // serum market
					_utils.AccountMetaFactory.newReadonly(serumMarketProgramId, false),
					_utils.AccountMetaFactory.newWritable(serumMarket, false),
					_utils.AccountMetaFactory.newWritable(serumBids, false),
					_utils.AccountMetaFactory.newWritable(serumAsk, false),
					_utils.AccountMetaFactory.newWritable(serumEventQueue, false),
					_utils.AccountMetaFactory.newWritable(serumCoinVault, false),
					_utils.AccountMetaFactory.newWritable(serumPcVault, false),
					_utils.AccountMetaFactory.newReadonly(serumVaultSigner, false), // users  (raydium)
					_utils.AccountMetaFactory.newWritable(vault, false),
					_utils.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
					_utils.AccountMetaFactory.newWritable(vaultTokenAccount, false), // (dca)
					_utils.AccountMetaFactory.newWritable(mint, false),
					_utils.AccountMetaFactory.newWritable(source, false),
					_utils.AccountMetaFactory.newWritable(dcaAccount, false),
					_utils.AccountMetaFactory.newWritable(nativeMint, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false),
				];
				return new _web.TransactionInstruction({
					keys: keys,
					programId: _constants.DCA_PROGRAM_ID,
					data: data,
				});
			},
			/**
			 * Generate Transaction Instruction that withdraws non-native token from DCA vault
			 */
		},
		{
			key: "withdrawToken",
			value: function withdrawToken(
				source,
				vault,
				mint,
				sourceTokenAccount,
				vaultTokenAccount,
				dcaAccount,
				transferAmount,
			) {
				var data = new _data.WithdrawTokenData(transferAmount).encode();
				var keys = [
					_utils.AccountMetaFactory.newWritable(source, true),
					_utils.AccountMetaFactory.newWritable(vault, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false),
					_utils.AccountMetaFactory.newWritable(mint, false),
					_utils.AccountMetaFactory.newReadonly(_web.SystemProgram.programId, false),
					_utils.AccountMetaFactory.newReadonly(_web.SYSVAR_RENT_PUBKEY, false),
					_utils.AccountMetaFactory.newWritable(sourceTokenAccount, false),
					_utils.AccountMetaFactory.newWritable(vaultTokenAccount, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.ASSOCIATED_TOKEN_PROGRAM_ID, false),
					_utils.AccountMetaFactory.newWritable(dcaAccount, false),
				];
				return new _web.TransactionInstruction({
					keys: keys,
					programId: _constants.DCA_PROGRAM_ID,
					data: data,
				});
			},
			/**
			 * Generate Transaction Instruction that withdraws native token from DCA vault
			 */
		},
		{
			key: "withdrawSol",
			value: function withdrawSol(
				source,
				vault,
				mint,
				sourceTokenAccount,
				vaultTokenAccount,
				dcaAccount,
				nativeMint,
				vaultNativeMintAccount,
				sourceNativeMintAccount,
				transferAmount,
			) {
				var data = new _data.WithdrawSolData(transferAmount).encode();
				var keys = [
					_utils.AccountMetaFactory.newWritable(source, true),
					_utils.AccountMetaFactory.newWritable(vault, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false),
					_utils.AccountMetaFactory.newWritable(mint, false),
					_utils.AccountMetaFactory.newReadonly(_web.SystemProgram.programId, false),
					_utils.AccountMetaFactory.newReadonly(_web.SYSVAR_RENT_PUBKEY, false),
					_utils.AccountMetaFactory.newWritable(sourceTokenAccount, false),
					_utils.AccountMetaFactory.newWritable(vaultTokenAccount, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.ASSOCIATED_TOKEN_PROGRAM_ID, false),
					_utils.AccountMetaFactory.newWritable(dcaAccount, false),
					_utils.AccountMetaFactory.newWritable(nativeMint, false),
					_utils.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
					_utils.AccountMetaFactory.newWritable(sourceNativeMintAccount, false),
				];
				return new _web.TransactionInstruction({
					keys: keys,
					programId: _constants.DCA_PROGRAM_ID,
					data: data,
				});
			},
			/**
			 * Generate transaction instruction that fund token in initialized dca
			 */
		},
		{
			key: "fundToken",
			value: function fundToken(
				source,
				vault,
				mint,
				sourceTokenAccount,
				vaultTokenAccount,
				dcaAccount,
				transferAmount,
			) {
				var data = new _data.FundTokenData(transferAmount).encode();
				var keys = [
					_utils.AccountMetaFactory.newWritable(source, true),
					_utils.AccountMetaFactory.newWritable(vault, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false),
					_utils.AccountMetaFactory.newWritable(mint, false),
					_utils.AccountMetaFactory.newReadonly(_web.SystemProgram.programId, false),
					_utils.AccountMetaFactory.newReadonly(_web.SYSVAR_RENT_PUBKEY, false),
					_utils.AccountMetaFactory.newWritable(sourceTokenAccount, false),
					_utils.AccountMetaFactory.newWritable(vaultTokenAccount, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.ASSOCIATED_TOKEN_PROGRAM_ID, false),
					_utils.AccountMetaFactory.newWritable(dcaAccount, false),
				];
				return new _web.TransactionInstruction({
					keys: keys,
					programId: _constants.DCA_PROGRAM_ID,
					data: data,
				});
			},
			/**
			 * Generate transaction instruction that sol to intialized dca process
			 */
		},
		{
			key: "fundSol",
			value: function fundSol(
				source,
				vault,
				mint,
				nativeMint,
				sourceTokenAccount,
				vaultNativeMintAccount,
				vaultTokenAccount,
				dcaAccount,
				transferAmount,
			) {
				var data = new _data.FundSolData(transferAmount).encode();
				var keys = [
					_utils.AccountMetaFactory.newWritable(source, true),
					_utils.AccountMetaFactory.newWritable(vault, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.TOKEN_PROGRAM_ID, false),
					_utils.AccountMetaFactory.newWritable(mint, false),
					_utils.AccountMetaFactory.newWritable(nativeMint, false),
					_utils.AccountMetaFactory.newReadonly(_web.SystemProgram.programId, false),
					_utils.AccountMetaFactory.newReadonly(_web.SYSVAR_RENT_PUBKEY, false),
					_utils.AccountMetaFactory.newWritable(sourceTokenAccount, false),
					_utils.AccountMetaFactory.newWritable(vaultNativeMintAccount, false),
					_utils.AccountMetaFactory.newWritable(vaultTokenAccount, false),
					_utils.AccountMetaFactory.newReadonly(_splToken.ASSOCIATED_TOKEN_PROGRAM_ID, false),
					_utils.AccountMetaFactory.newWritable(dcaAccount, false),
				];
				return new _web.TransactionInstruction({
					keys: keys,
					programId: _constants.DCA_PROGRAM_ID,
					data: data,
				});
			},
		},
	]);

	return DcaInstruction;
})();

exports.DcaInstruction = DcaInstruction;
//# sourceMappingURL=instruction.js.map
