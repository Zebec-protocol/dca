"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountMetaFactory = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var AccountMetaFactory = /*#__PURE__*/function () {
  function AccountMetaFactory() {
    _classCallCheck(this, AccountMetaFactory);
  }

  _createClass(AccountMetaFactory, null, [{
    key: "newWritable",
    value:
    /**
     * Create an writable account meta.
     */
    function newWritable(address, isSigner) {
      return {
        pubkey: address,
        isSigner: isSigner,
        isWritable: true
      };
    }
    /**
     * Create an readonly account meta.
     */

  }, {
    key: "newReadonly",
    value: function newReadonly(address, isSigner) {
      return {
        pubkey: address,
        isSigner: isSigner,
        isWritable: false
      };
    }
  }]);

  return AccountMetaFactory;
}();

exports.AccountMetaFactory = AccountMetaFactory;
//# sourceMappingURL=account-meta-factory.js.map