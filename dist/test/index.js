"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const { unlink } = fs_1.promises;
const __1 = require("..");
describe('files', async () => {
    const bufferMap = await __1.readPathBufferMap('src\\test\\fixtures');
    console.log('wtf', bufferMap);
    before(async () => {
    });
    after(() => {
        //unlink( 'src\\test\\fixtures\\out' )
    });
    // describe( 'readdirJoin', () => {
    //   it( 'reads the dir and joins the contents to the root path', async () => {
    //     const contents = await readdirJoin( './src/test/fixtures' )
    //     const expect = [
    //       'src\\test\\fixtures\\a.txt',
    //       'src\\test\\fixtures\\b.txt',
    //       'src\\test\\fixtures\\c',
    //     ]
    //     assert.deepEqual( contents, expect )
    //   })
    // } )
    // describe( 'bucketPaths', () => {
    //   it( 'gets directories', async () => {
    //     const contents = await readdirJoin( './src/test/fixtures' )
    //     const directories: string[] = []
    //     const expect = [
    //       'src\\test\\fixtures\\c'
    //     ]
    //     await bucketPaths( contents, { directories } )
    //     assert.deepEqual( directories, expect )
    //   } )
    //   it( 'gets files', async () => {
    //     const contents = await readdirJoin( './src/test/fixtures' )
    //     const files: string[] = []
    //     const expect = [
    //       'src\\test\\fixtures\\a.txt',
    //       'src\\test\\fixtures\\b.txt'
    //     ]
    //     await bucketPaths( contents, { files } )
    //     assert.deepEqual( files, expect )
    //   } )
    //   it( 'gets both', async () => {
    //     const contents = await readdirJoin( './src/test/fixtures' )
    //     const directories: string[] = []
    //     const files: string[] = []
    //     const expectDirectories = [
    //       'src\\test\\fixtures\\c'
    //     ]
    //     const expectFiles = [
    //       'src\\test\\fixtures\\a.txt',
    //       'src\\test\\fixtures\\b.txt'
    //     ]
    //     await bucketPaths( contents, { files, directories } )
    //     assert.deepEqual( files, expectFiles )
    //     assert.deepEqual( directories, expectDirectories )
    //   } )
    // } )
    // describe( 'ensureDirectories', () => {
    //   /*
    //     bad test because it doesn't actually create any new directories
    //     we don't create any new directories because unlink doesn't work (perm)
    //     so the newly created directories interfere with other tests and also
    //     wouldn't be created next time it's run
    //     ideally we'd use mock-fs or similar but fs.promises aren't working
    //     properly in it atm
    //     we could do a tear down or something
    //   */
    //   it( 'creates directories as needed', async () => {
    //     const directories = [
    //       'src\\test\\fixtures\\c'
    //     ]
    //     await ensureDirectories( directories )
    //     for( let i = 0; i < directories.length; i++ ){
    //       const dirExists = await exists( directories[ i ] )
    //       assert( dirExists )
    //     }
    //   })
    // } )
    // describe( 'ensureParentDirectories', () => {
    //   // see comment above
    //   it( 'creates directories as needed', async () => {
    //     await ensureParentDirectories( 'src\\test\\fixtures\\c\\e\\f.txt' )
    //     const dirExists = await exists( 'src\\test\\fixtures\\c\\e' )
    //     assert( dirExists )
    //   } )
    // } )
    // describe( 'exists', () => {
    // } )
    // describe( 'writePathBufferMap', () => {
    // } )
    // describe( 'readPathBufferMap', () => {
    // } )
    // describe( 'createPathBufferMap', () => {
    // } )
    // describe( 'readdirDeep', () => {
    // } )
    // describe( 'readdirFiles', () => {
    // } )
});
//# sourceMappingURL=index.js.map