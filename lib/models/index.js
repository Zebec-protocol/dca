"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dcaAccount = require("./dca-account");

Object.keys(_dcaAccount).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _dcaAccount[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dcaAccount[key];
    }
  });
});

var _amount = require("./amount");

Object.keys(_amount).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _amount[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _amount[key];
    }
  });
});

var _mint = require("./mint");

Object.keys(_mint).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mint[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mint[key];
    }
  });
});

var _mintAmount = require("./mintAmount");

Object.keys(_mintAmount).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mintAmount[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mintAmount[key];
    }
  });
});
//# sourceMappingURL=index.js.map