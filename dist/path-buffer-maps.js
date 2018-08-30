"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const ensure_directories_1 = require("./ensure-directories");
const readdir_files_1 = require("./readdir-files");
const assert_posix_1 = require("./assert-posix");
const { writeFile, readFile } = fs_1.promises;
const { join } = path_1.posix;
exports.writePathBufferMap = async (path, map) => {
    assert_posix_1.assertPosixPath(path, 'path');
    const paths = Object.keys(map);
    for (let i = 0; i < paths.length; i++) {
        const filePath = paths[i];
        const buffer = map[filePath];
        const writePath = join(path, filePath);
        await ensure_directories_1.ensureParentDirectories(writePath);
        await writeFile(writePath, buffer);
    }
};
exports.createPathBufferMap = async (paths, rootPath = '') => {
    assert_posix_1.assertPosixPath(rootPath, 'rootPath');
    const fileBuffers = {};
    return Promise.all(paths.map(async (filePath) => {
        assert_posix_1.assertPosixPath(filePath, 'filePath');
        fileBuffers[filePath] = await readFile(join(rootPath, filePath));
    })).then(() => fileBuffers);
};
exports.readPathBufferMap = async (path) => {
    assert_posix_1.assertPosixPath(path, 'path');
    const filePaths = await readdir_files_1.readdirFiles(path);
    return exports.createPathBufferMap(filePaths, path);
};
//# sourceMappingURL=path-buffer-maps.js.map