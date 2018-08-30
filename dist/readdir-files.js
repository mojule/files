"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readdir_join_1 = require("./readdir-join");
const bucket_paths_1 = require("./bucket-paths");
const path_1 = require("path");
const assert_posix_1 = require("./assert-posix");
const { relative } = path_1.posix;
exports.readdirFiles = async (directoryPath) => {
    assert_posix_1.assertPosixPath(directoryPath, 'directoryPath');
    const directories = [];
    const files = [];
    const buckets = { directories, files };
    const paths = await readdir_join_1.readdirJoin(directoryPath);
    await bucket_paths_1.bucketPaths(paths, buckets);
    while (directories.length) {
        const nextPath = directories.shift();
        const childPaths = await readdir_join_1.readdirJoin(nextPath);
        await bucket_paths_1.bucketPaths(childPaths, buckets);
    }
    return files.map(p => relative(directoryPath, p));
};
//# sourceMappingURL=readdir-files.js.map