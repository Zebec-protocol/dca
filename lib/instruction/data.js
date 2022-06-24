"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true,
});
exports.WithdrawTokenData =
	exports.WithdrawSolData =
	exports.SwapToSolData =
	exports.SwapFromSolData =
	exports.InitializeData =
	exports.FundTokenData =
	exports.FundSolData =
	exports.DepositTokenData =
	exports.DepositSolData =
		void 0;

var _borsh = require("borsh");

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

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	} else {
		obj[key] = value;
	}
	return obj;
}

var InstructionTypes;

(function (InstructionTypes) {
	InstructionTypes[(InstructionTypes["DepositToken"] = 0)] = "DepositToken";
	InstructionTypes[(InstructionTypes["DepositSol"] = 1)] = "DepositSol";
	InstructionTypes[(InstructionTypes["Initialize"] = 2)] = "Initialize";
	InstructionTypes[(InstructionTypes["SwapToSol"] = 3)] = "SwapToSol";
	InstructionTypes[(InstructionTypes["SwapFromSol"] = 4)] = "SwapFromSol";
	InstructionTypes[(InstructionTypes["WithdrawToken"] = 5)] = "WithdrawToken";
	InstructionTypes[(InstructionTypes["WithdrawSol"] = 6)] = "WithdrawSol";
	InstructionTypes[(InstructionTypes["FundToken"] = 7)] = "FundToken";
	InstructionTypes[(InstructionTypes["FundSol"] = 8)] = "FundSol";
})(InstructionTypes || (InstructionTypes = {}));

var DepositTokenData = /*#__PURE__*/ (function () {
	function DepositTokenData(amount) {
		_classCallCheck(this, DepositTokenData);

		_defineProperty(this, "_instruction", void 0);

		_defineProperty(this, "_amount", void 0);

		this._instruction = InstructionTypes.DepositToken;
		this._amount = amount;
	}

	_createClass(DepositTokenData, [
		{
			key: "instruction",
			get: function get() {
				return this._instruction;
			},
		},
		{
			key: "amount",
			get: function get() {
				return this._amount;
			},
		},
		{
			key: "encode",
			value: function encode() {
				return Buffer.from((0, _borsh.serialize)(depositTokenSchema, this));
			},
		},
	]);

	return DepositTokenData;
})();

exports.DepositTokenData = DepositTokenData;

var DepositSolData = /*#__PURE__*/ (function () {
	function DepositSolData(amount) {
		_classCallCheck(this, DepositSolData);

		_defineProperty(this, "_instruction", void 0);

		_defineProperty(this, "_amount", void 0);

		this._instruction = InstructionTypes.DepositSol;
		this._amount = amount;
	}

	_createClass(DepositSolData, [
		{
			key: "instruction",
			get: function get() {
				return this._instruction;
			},
		},
		{
			key: "amount",
			get: function get() {
				return this._amount;
			},
		},
		{
			key: "encode",
			value: function encode() {
				return Buffer.from((0, _borsh.serialize)(depositSolSchema, this));
			},
		},
	]);

	return DepositSolData;
})();

exports.DepositSolData = DepositSolData;

var InitializeData = /*#__PURE__*/ (function () {
	function InitializeData(startTime, dcaAmount, dcaTime, minimumAmountOut) {
		_classCallCheck(this, InitializeData);

		_defineProperty(this, "_instruction", void 0);

		_defineProperty(this, "_startTime", void 0);

		_defineProperty(this, "_dcaAmount", void 0);

		_defineProperty(this, "_dcaTime", void 0);

		_defineProperty(this, "_minimumAmountOut", void 0);

		this._instruction = InstructionTypes.Initialize;
		this._startTime = startTime;
		this._dcaAmount = dcaAmount;
		this._dcaTime = dcaTime;
		this._minimumAmountOut = minimumAmountOut;
	}

	_createClass(InitializeData, [
		{
			key: "instruction",
			get: function get() {
				return this._instruction;
			},
		},
		{
			key: "startTime",
			get: function get() {
				return this._startTime;
			},
		},
		{
			key: "dcaAmount",
			get: function get() {
				return this._dcaAmount;
			},
		},
		{
			key: "dcaTime",
			get: function get() {
				return this._dcaTime;
			},
		},
		{
			key: "minimumAmountOut",
			get: function get() {
				return this._minimumAmountOut;
			},
		},
		{
			key: "encode",
			value: function encode() {
				return Buffer.from((0, _borsh.serialize)(initializeSchema, this));
			},
		},
	]);

	return InitializeData;
})();

exports.InitializeData = InitializeData;

var SwapToSolData = /*#__PURE__*/ (function () {
	function SwapToSolData(minimumAmountOut) {
		_classCallCheck(this, SwapToSolData);

		_defineProperty(this, "_instruction", void 0);

		_defineProperty(this, "_minimumAmountOut", void 0);

		this._instruction = InstructionTypes.SwapToSol;
		this._minimumAmountOut = minimumAmountOut;
	}

	_createClass(SwapToSolData, [
		{
			key: "instruction",
			get: function get() {
				return this._instruction;
			},
		},
		{
			key: "minimumAmountOut",
			get: function get() {
				return this._minimumAmountOut;
			},
		},
		{
			key: "encode",
			value: function encode() {
				return Buffer.from((0, _borsh.serialize)(swapToSolSchema, this));
			},
		},
	]);

	return SwapToSolData;
})();

exports.SwapToSolData = SwapToSolData;

var SwapFromSolData = /*#__PURE__*/ (function () {
	function SwapFromSolData(minimumAmountOut) {
		_classCallCheck(this, SwapFromSolData);

		_defineProperty(this, "_instruction", void 0);

		_defineProperty(this, "_minimumAmountOut", void 0);

		this._instruction = InstructionTypes.SwapFromSol;
		this._minimumAmountOut = minimumAmountOut;
	}

	_createClass(SwapFromSolData, [
		{
			key: "instruction",
			get: function get() {
				return this._instruction;
			},
		},
		{
			key: "minimumAmountOut",
			get: function get() {
				return this._minimumAmountOut;
			},
		},
		{
			key: "encode",
			value: function encode() {
				return Buffer.from((0, _borsh.serialize)(swapFromSolSchema, this));
			},
		},
	]);

	return SwapFromSolData;
})();

exports.SwapFromSolData = SwapFromSolData;

var WithdrawTokenData = /*#__PURE__*/ (function () {
	function WithdrawTokenData(transferAmount) {
		_classCallCheck(this, WithdrawTokenData);

		_defineProperty(this, "_instruction", void 0);

		_defineProperty(this, "_transferAmount", void 0);

		this._instruction = InstructionTypes.WithdrawToken;
		this._transferAmount = transferAmount;
	}

	_createClass(WithdrawTokenData, [
		{
			key: "instruction",
			get: function get() {
				return this._instruction;
			},
		},
		{
			key: "transferAmount",
			get: function get() {
				return this._transferAmount;
			},
		},
		{
			key: "encode",
			value: function encode() {
				return Buffer.from((0, _borsh.serialize)(withdrawTokenSchema, this));
			},
		},
	]);

	return WithdrawTokenData;
})();

exports.WithdrawTokenData = WithdrawTokenData;

var WithdrawSolData = /*#__PURE__*/ (function () {
	function WithdrawSolData(transferAmount) {
		_classCallCheck(this, WithdrawSolData);

		_defineProperty(this, "_instruction", void 0);

		_defineProperty(this, "_transferAmount", void 0);

		this._instruction = InstructionTypes.WithdrawSol;
		this._transferAmount = transferAmount;
	}

	_createClass(WithdrawSolData, [
		{
			key: "instruction",
			get: function get() {
				return this._instruction;
			},
		},
		{
			key: "transferAmount",
			get: function get() {
				return this._transferAmount;
			},
		},
		{
			key: "encode",
			value: function encode() {
				return Buffer.from((0, _borsh.serialize)(withdrawSolSchema, this));
			},
		},
	]);

	return WithdrawSolData;
})();

exports.WithdrawSolData = WithdrawSolData;

var FundTokenData = /*#__PURE__*/ (function () {
	function FundTokenData(transferAmount) {
		_classCallCheck(this, FundTokenData);

		_defineProperty(this, "_instruction", void 0);

		_defineProperty(this, "_transferAmount", void 0);

		this._instruction = InstructionTypes.FundToken;
		this._transferAmount = transferAmount;
	}

	_createClass(FundTokenData, [
		{
			key: "instruction",
			get: function get() {
				return this._instruction;
			},
		},
		{
			key: "transferAmount",
			get: function get() {
				return this._transferAmount;
			},
		},
		{
			key: "encode",
			value: function encode() {
				return Buffer.from((0, _borsh.serialize)(fundTokenSchema, this));
			},
		},
	]);

	return FundTokenData;
})();

exports.FundTokenData = FundTokenData;

var FundSolData = /*#__PURE__*/ (function () {
	function FundSolData(transferAmount) {
		_classCallCheck(this, FundSolData);

		_defineProperty(this, "_instruction", void 0);

		_defineProperty(this, "_transferAmount", void 0);

		this._instruction = InstructionTypes.FundSol;
		this._transferAmount = transferAmount;
	}

	_createClass(FundSolData, [
		{
			key: "instruction",
			get: function get() {
				return this._instruction;
			},
		},
		{
			key: "transferAmount",
			get: function get() {
				return this._transferAmount;
			},
		},
		{
			key: "encode",
			value: function encode() {
				return Buffer.from((0, _borsh.serialize)(fundSolSchema, this));
			},
		},
	]);

	return FundSolData;
})();

exports.FundSolData = FundSolData;
var depositTokenSchema = new Map([
	[
		DepositTokenData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["amount", "u64"],
			],
		},
	],
]);
var initializeSchema = new Map([
	[
		InitializeData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["startTime", "u64"],
				["dcaAmount", "u64"],
				["dcaTime", "u64"],
				["minimumAmountOut", "u64"],
			],
		},
	],
]);
var depositSolSchema = new Map([
	[
		DepositSolData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["amount", "u64"],
			],
		},
	],
]);
var swapToSolSchema = new Map([
	[
		SwapToSolData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["minimumAmountOut", "u64"],
			],
		},
	],
]);
var swapFromSolSchema = new Map([
	[
		SwapFromSolData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["minimumAmountOut", "u64"],
			],
		},
	],
]);
var withdrawTokenSchema = new Map([
	[
		WithdrawTokenData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["transferAmount", "u64"],
			],
		},
	],
]);
var withdrawSolSchema = new Map([
	[
		WithdrawSolData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["transferAmount", "u64"],
			],
		},
	],
]);
var fundTokenSchema = new Map([
	[
		FundTokenData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["transferAmount", "u64"],
			],
		},
	],
]);
var fundSolSchema = new Map([
	[
		FundSolData,
		{
			kind: "struct",
			fields: [
				["instruction", "u8"],
				["transferAmount", "u64"],
			],
		},
	],
]);
//# sourceMappingURL=data.js.map
