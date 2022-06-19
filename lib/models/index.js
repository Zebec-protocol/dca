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
//# sourceMappingURL=index.js.map