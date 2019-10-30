"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const __1 = require("..");
const assert_posix_1 = require("../assert-posix");
const bucket_paths_1 = require("../bucket-paths");
const path_buffer_maps_1 = require("../path-buffer-maps");
const rmdir_deep_1 = require("../rmdir-deep");
const zip_1 = require("../zip");
const testPath = './src/test/fixtures/z';
describe('files', () => {
    it('readdirDeep', async () => {
        const expect = ['a.txt', 'b.txt', 'c', 'c/d.txt', 'c/e', 'c/e/f.txt'];
        const allPaths = await __1.readdirDeep(testPath);
        assert.deepEqual(allPaths, expect);
    });
    it('readdirFiles', async () => {
        const expect = ['a.txt', 'b.txt', 'c/d.txt', 'c/e/f.txt'];
        const filePaths = await __1.readdirFiles(testPath);
        assert.deepEqual(filePaths, expect);
    });
    it('readPathBufferMap', async () => {
        const expect = {
            'a.txt': [65],
            'b.txt': [66],
            'c/d.txt': [68],
            'c/e/f.txt': [70]
        };
        const map = await __1.readPathBufferMap(testPath);
        assert.deepEqual(map, expect);
    });
    it('writePathBufferMap', async () => {
        const expect = ['a.txt', 'b.txt', 'c', 'c/d.txt', 'c/e', 'c/e/f.txt'];
        const map = await __1.readPathBufferMap(testPath);
        const newMap = {};
        Object.keys(map).forEach(mapPath => {
            newMap[`y/${mapPath}`] = map[mapPath];
        });
        await path_buffer_maps_1.writePathBufferMap('./src/test/fixtures', newMap);
        const allPaths = await __1.readdirDeep('./src/test/fixtures/y');
        assert.deepEqual(allPaths, expect);
        await rmdir_deep_1.rmdirDeep('./src/test/fixtures/y');
    });
    it('fails with non-posix path', () => {
        assert.throws(() => assert_posix_1.assertPosixPath('c:\\temp'));
    });
    it('bucketPath fails with no options', async () => {
        try {
            await bucket_paths_1.bucketPaths([testPath], {});
            assert(false);
        }
        catch (err) {
            assert(err);
        }
    });
    it('zips and unzips', async () => {
        const expect = {
            'a.txt': [65],
            'b.txt': [66],
            'c/d.txt': [68],
            'c/e/f.txt': [70]
        };
        const map = await __1.readPathBufferMap(testPath);
        const zipBuffer = await zip_1.zip(map);
        const unzippedMap = await zip_1.unzip(zipBuffer);
        assert.deepEqual(expect, unzippedMap);
    });
    it('unzip fails on bad zip buffer', async () => {
        try {
            await zip_1.unzip(Buffer.from([0]));
        }
        catch (err) {
            assert(err);
        }
    });
});
//# sourceMappingURL=index.js.map