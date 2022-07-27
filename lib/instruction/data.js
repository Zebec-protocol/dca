"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithdrawTokenData = exports.SwapData = exports.InitializeData = exports.DepositTokenData = void 0;

var _borsh = require("borsh");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InstructionTypes;

(function (InstructionTypes) {
  InstructionTypes[InstructionTypes["DepositToken"] = 0] = "DepositToken";
  InstructionTypes[InstructionTypes["Initialize"] = 1] = "Initialize";
  InstructionTypes[InstructionTypes["Swap"] = 2] = "Swap";
  InstructionTypes[InstructionTypes["WithdrawToken"] = 3] = "WithdrawToken";
})(InstructionTypes || (InstructionTypes = {}));

var DepositTokenData = /*#__PURE__*/function () {
  function DepositTokenData(amount) {
    _classCallCheck(this, DepositTokenData);

    _defineProperty(this, "_instruction", void 0);

    _defineProperty(this, "_amount", void 0);

    this._instruction = InstructionTypes.DepositToken;
    this._amount = amount;
  }

  _createClass(DepositTokenData, [{
    key: "instruction",
    get: function get() {
      return this._instruction;
    }
  }, {
    key: "amount",
    get: function get() {
      return this._amount;
    }
  }, {
    key: "encode",
    value: function encode() {
      return Buffer.from((0, _borsh.serialize)(depositTokenSchema, this));
    }
  }]);

  return DepositTokenData;
}();

exports.DepositTokenData = DepositTokenData;

var InitializeData = /*#__PURE__*/function () {
  function InitializeData(startTime, dcaAmount, frequency) {
    _classCallCheck(this, InitializeData);

    _defineProperty(this, "_instruction", void 0);

    _defineProperty(this, "_startTime", void 0);

    _defineProperty(this, "_dcaAmount", void 0);

    _defineProperty(this, "_frequency", void 0);

    this._instruction = InstructionTypes.Initialize;
    this._startTime = startTime;
    this._dcaAmount = dcaAmount;
    this._frequency = frequency;
  }

  _createClass(InitializeData, [{
    key: "instruction",
    get: function get() {
      return this._instruction;
    }
  }, {
    key: "startTime",
    get: function get() {
      return this._startTime;
    }
  }, {
    key: "dcaAmount",
    get: function get() {
      return this._dcaAmount;
    }
  }, {
    key: "frequency",
    get: function get() {
      return this._frequency;
    }
  }, {
    key: "encode",
    value: function encode() {
      return Buffer.from((0, _borsh.serialize)(initializeSchema, this));
    }
  }]);

  return InitializeData;
}();

exports.InitializeData = InitializeData;

var SwapData = /*#__PURE__*/function () {
  function SwapData(minimumAmountOut) {
    _classCallCheck(this, SwapData);

    _defineProperty(this, "_instruction", void 0);

    _defineProperty(this, "_minimumAmountOut", void 0);

    this._instruction = InstructionTypes.Swap;
    this._minimumAmountOut = minimumAmountOut;
  }

  _createClass(SwapData, [{
    key: "instruction",
    get: function get() {
      return this._instruction;
    }
  }, {
    key: "minimumAmountOut",
    get: function get() {
      return this._minimumAmountOut;
    }
  }, {
    key: "encode",
    value: function encode() {
      return Buffer.from((0, _borsh.serialize)(swapSchema, this));
    }
  }]);

  return SwapData;
}();

exports.SwapData = SwapData;

var WithdrawTokenData = /*#__PURE__*/function () {
  function WithdrawTokenData(transferAmount) {
    _classCallCheck(this, WithdrawTokenData);

    _defineProperty(this, "_instruction", void 0);

    _defineProperty(this, "_transferAmount", void 0);

    this._instruction = InstructionTypes.WithdrawToken;
    this._transferAmount = transferAmount;
  }

  _createClass(WithdrawTokenData, [{
    key: "instruction",
    get: function get() {
      return this._instruction;
    }
  }, {
    key: "transferAmount",
    get: function get() {
      return this._transferAmount;
    }
  }, {
    key: "encode",
    value: function encode() {
      return Buffer.from((0, _borsh.serialize)(withdrawTokenSchema, this));
    }
  }]);

  return WithdrawTokenData;
}();

exports.WithdrawTokenData = WithdrawTokenData;
var depositTokenSchema = new Map([[DepositTokenData, {
  kind: "struct",
  fields: [["instruction", "u8"], ["amount", "u64"]]
}]]);
var initializeSchema = new Map([[InitializeData, {
  kind: "struct",
  fields: [["instruction", "u8"], ["startTime", "u64"], ["dcaAmount", "u64"], ["frequency", "u64"]]
}]]);
var swapSchema = new Map([[SwapData, {
  kind: "struct",
  fields: [["instruction", "u8"], ["minimumAmountOut", "u64"]]
}]]);
var withdrawTokenSchema = new Map([[WithdrawTokenData, {
  kind: "struct",
  fields: [["instruction", "u8"], ["transferAmount", "u64"]]
}]]);
//# sourceMappingURL=data.js.map