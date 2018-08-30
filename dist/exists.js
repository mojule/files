"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.exists = (path) => new Promise(resolve => {
    fs_1.stat(path, err => {
        if (err) {
            return resolve(false);
        }
        resolve(true);
    });
});
//# sourceMappingURL=exists.js.map