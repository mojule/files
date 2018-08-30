"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const assert_posix_1 = require("./assert-posix");
const { stat } = fs_1.promises;
const isBucketOptions = (options) => options !== undefined &&
    (Array.isArray(options.directories) || Array.isArray(options.files));
exports.bucketPaths = async (paths, options) => {
    if (!isBucketOptions(options))
        throw Error('options must include either or both of directories and files');
    const { directories, files } = options;
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        assert_posix_1.assertPosixPath(path, 'path');
        const stats = await stat(path);
        if (directories !== undefined && stats.isDirectory()) {
            directories.push(path);
        }
        else if (files !== undefined && stats.isFile()) {
            files.push(path);
        }
    }
};
//# sourceMappingURL=bucket-paths.js.map