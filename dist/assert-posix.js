"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertPosixPath = (targetPath, name = 'path') => {
    if (targetPath.includes('\\'))
        throw Error(`Expected ${name} in posix path format`);
};
//# sourceMappingURL=assert-posix.js.map