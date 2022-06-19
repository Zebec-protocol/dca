"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _instruction = require("./instruction");

Object.keys(_instruction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _instruction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _instruction[key];
    }
  });
});
//# sourceMappingURL=index.js.map