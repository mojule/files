"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.exists = (path) => new Promise(resolve => fs_1.stat(path, err => resolve(!err)));
//# sourceMappingURL=exists.js.map