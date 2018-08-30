const { posix } = require( 'path' )
const { promises } = require( 'fs' )

const { join } = posix
const { unlink } = promises

const {
  bucketPaths, ensureDirectories, ensureParentDirectories, exists,
  writePathBufferMap, readPathBufferMap, createPathBufferMap, readdirDeep,
  readdirFiles, readdirJoin, rmdirDeep
} = require( './dist' )

const testPath = './src/test/fixtures/z'

/* jshint ignore:start */
const start = async () => {
  try {
    console.log( 'readdirDeep' )
    const allPaths = await readdirDeep( testPath )
    console.log( allPaths )

    console.log( 'readdirFiles' )
    const filePaths = await readdirFiles( testPath )
    console.log( filePaths )

    console.log( 'bucketPaths' )
    const bPaths = allPaths.map( p => join( testPath, p ) )
    const files = []
    const directories = []
    const bucketOptions = { files, directories }
    await bucketPaths( bPaths, bucketOptions )
    console.log( bucketOptions )

    console.log( 'readPathBufferMap' )
    const readInPathBufferMap = await readPathBufferMap( testPath )
    console.log( readInPathBufferMap )

    const writeOutPathBufferMap = {
      'g/h/i.txt': Buffer.from( 'I', 'utf8' ),
      'g/j/k.txt': Buffer.from( 'K', 'utf8' ),
      'g/j/l/m.txt': Buffer.from( 'M', 'utf8' )
    }

    console.log( 'writePathBufferMap' )
    await writePathBufferMap( testPath, writeOutPathBufferMap )

    console.log( 'removing g' )
    await rmdirDeep( join( testPath, 'g' ) )
  } catch( err ){
    console.error( err )
  }
}
/* jshint ignore:end */

start()