"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mint = void 0;

var _web = require("@solana/web3.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Mint = /*#__PURE__*/function () {
  function Mint(address) {
    var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

    _classCallCheck(this, Mint);

    _defineProperty(this, "_address", void 0);

    _defineProperty(this, "_decimals", void 0);

    this._address = address;
    this._decimals = decimals;
  }

  _createClass(Mint, [{
    key: "address",
    get: function get() {
      return this._address;
    }
  }, {
    key: "decimals",
    get: function get() {
      return this._decimals;
    }
  }], [{
    key: "isWSol",
    value: function isWSol(address) {
      return address.equals(this.WSOL);
    }
  }]);

  return Mint;
}();

exports.Mint = Mint;

_defineProperty(Mint, "WSOL", new _web.PublicKey("So11111111111111111111111111111111111111112"));
//# sourceMappingURL=mint.js.map