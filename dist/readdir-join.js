"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const assert_posix_1 = require("./assert-posix");
const { join } = path_1.posix;
const { readdir } = fs_1.promises;
exports.readdirJoin = async (directoryPath) => {
    assert_posix_1.assertPosixPath(directoryPath, 'directoryPath');
    const contents = await readdir(directoryPath);
    return contents.map(childPath => join(directoryPath, childPath));
};
//# sourceMappingURL=readdir-join.js.map