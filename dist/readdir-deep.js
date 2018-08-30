"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readdir_join_1 = require("./readdir-join");
const bucket_paths_1 = require("./bucket-paths");
const path_1 = require("path");
const assert_posix_1 = require("./assert-posix");
const { relative } = path_1.posix;
exports.readdirDeep = async (directoryPath) => {
    assert_posix_1.assertPosixPath(directoryPath, 'directoryPath');
    const directories = [];
    const paths = await readdir_join_1.readdirJoin(directoryPath);
    await bucket_paths_1.bucketPaths(paths, { directories });
    while (directories.length) {
        const nextPath = directories.shift();
        const childPaths = await readdir_join_1.readdirJoin(nextPath);
        paths.push(...childPaths);
        await bucket_paths_1.bucketPaths(childPaths, { directories });
    }
    return paths.map(p => relative(directoryPath, p));
};
//# sourceMappingURL=readdir-deep.js.map