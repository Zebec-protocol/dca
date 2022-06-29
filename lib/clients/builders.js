"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DcaClientFactory = void 0;

var _web = require("@solana/web3.js");

var _offlineClient = require("./offline-client");

var _onlineClient = require("./online-client");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DcaClientFactory = /*#__PURE__*/function () {
  function DcaClientFactory() {
    _classCallCheck(this, DcaClientFactory);

    _defineProperty(this, "_connection", void 0);

    _defineProperty(this, "_commitment", void 0);

    _defineProperty(this, "_preflightCommitment", void 0);

    this._connection = new _web.Connection((0, _web.clusterApiUrl)("mainnet-beta"));
    this._commitment = "finalized";
    this._preflightCommitment = "finalized";
  }

  _createClass(DcaClientFactory, [{
    key: "setConnection",
    value: function setConnection(connection) {
      this._connection = connection;
      return this;
    }
  }, {
    key: "setPreflightCommitment",
    value: function setPreflightCommitment(preflightCommitment) {
      this._preflightCommitment = preflightCommitment;
      return this;
    }
  }, {
    key: "setCommitment",
    value: function setCommitment(commitment) {
      this._commitment = commitment;
      return this;
    }
  }, {
    key: "buildOnlineClient",
    value: function buildOnlineClient(adapter) {
      return new _onlineClient.DcaOnlineClient({
        connection: this._connection,
        commitment: this._commitment,
        preflightCommitment: this._preflightCommitment,
        wallet: adapter
      });
    }
  }, {
    key: "buildOfflineClient",
    value: function buildOfflineClient(payer) {
      return new _offlineClient.DcaOfflineClient({
        connection: this._connection,
        commitment: this._commitment,
        preflightCommitment: this._preflightCommitment,
        payer: payer
      });
    }
  }]);

  return DcaClientFactory;
}();

exports.DcaClientFactory = DcaClientFactory;
//# sourceMappingURL=builders.js.map