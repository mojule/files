"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const exists_1 = require("./exists");
const assert_posix_1 = require("./assert-posix");
const { mkdir } = fs_1.promises;
const { resolve, parse } = path_1.posix;
exports.ensureParentDirectories = async (targetPath) => {
    assert_posix_1.assertPosixPath(targetPath, 'targetPath');
    const full = resolve('/', targetPath);
    const parsed = parse(full);
    const { dir } = parsed;
    const segs = dir.split('/').filter(s => s !== '');
    const parents = [];
    const { length } = segs;
    for (let i = 0; i < length; i++) {
        const currentPath = segs.slice(0, i + 1);
        parents.push(currentPath.join('/'));
    }
    await exports.ensureDirectories(parents);
};
exports.ensureDirectories = async (paths) => {
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        assert_posix_1.assertPosixPath(path, 'path');
        const directoryExists = await exists_1.exists(path);
        if (!directoryExists)
            await mkdir(path);
    }
};
//# sourceMappingURL=ensure-directories.js.map