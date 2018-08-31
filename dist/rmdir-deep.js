"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readdir_join_1 = require("./readdir-join");
const bucket_paths_1 = require("./bucket-paths");
const fs_1 = require("fs");
const assert_posix_1 = require("./assert-posix");
const { unlink, rmdir } = fs_1.promises;
exports.rmdirDeep = async (directoryPath) => {
    assert_posix_1.assertPosixPath(directoryPath, 'directoryPath');
    const directories = [];
    const removeDirectories = [];
    const files = [];
    const paths = await readdir_join_1.readdirJoin(directoryPath);
    await bucket_paths_1.bucketPaths(paths, { directories, files });
    while (directories.length) {
        const nextPath = directories.shift();
        const childPaths = await readdir_join_1.readdirJoin(nextPath);
        removeDirectories.unshift(nextPath);
        paths.push(...childPaths);
        await bucket_paths_1.bucketPaths(childPaths, { directories, files });
    }
    await Promise.all(files.map(unlink));
    for (let i = 0; i < removeDirectories.length; i++) {
        await rmdir(removeDirectories[i]);
    }
    await rmdir(directoryPath);
};
//# sourceMappingURL=rmdir-deep.js.map