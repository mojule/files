import * as assert from 'assert'
import { readdirDeep, readdirFiles, readPathBufferMap } from '..'
import { assertPosixPath } from '../assert-posix'
import { bucketPaths } from '../bucket-paths'
import { PathBufferMap } from '../types'
import { writePathBufferMap } from '../path-buffer-maps'
import { rmdirDeep } from '../rmdir-deep'
import { zip, unzip } from '../zip'

const testPath = './src/test/fixtures/z'

describe( 'files', () => {
  it( 'readdirDeep', async () => {
    const expect = [ 'a.txt', 'b.txt', 'c', 'c/d.txt', 'c/e', 'c/e/f.txt' ]
    const allPaths = await readdirDeep( testPath )

    assert.deepEqual( allPaths, expect )
  })

  it( 'readdirFiles', async () => {
    const expect = [ 'a.txt', 'b.txt', 'c/d.txt', 'c/e/f.txt' ]
    const filePaths = await readdirFiles( testPath )

    assert.deepEqual( filePaths, expect )
  })

  it( 'readPathBufferMap', async () => {
    const expect = {
      'a.txt': [ 65 ],
      'b.txt': [ 66 ],
      'c/d.txt': [ 68 ],
      'c/e/f.txt': [ 70 ]
    }

    const map = await readPathBufferMap( testPath )

    assert.deepEqual( map, expect )
  })

  it( 'writePathBufferMap', async () => {
    const expect = [ 'a.txt', 'b.txt', 'c', 'c/d.txt', 'c/e', 'c/e/f.txt' ]
    const map = await readPathBufferMap( testPath )
    const newMap: PathBufferMap = {}

    Object.keys( map ).forEach( mapPath => {
      newMap[ `y/${ mapPath }` ] = map[ mapPath ]
    })

    await writePathBufferMap( './src/test/fixtures', newMap )

    const allPaths = await readdirDeep( './src/test/fixtures/y' )

    assert.deepEqual( allPaths, expect )

    await rmdirDeep( './src/test/fixtures/y' )
  })

  it( 'fails with non-posix path', () => {
    assert.throws( () => assertPosixPath( 'c:\\temp' ) )
  })

  it( 'bucketPath fails with no options', async () => {
    try {
      await bucketPaths( [ testPath ], (<any>{}) )
      assert( false )
    } catch( err ) {
      assert( err )
    }
  })

  it( 'zips and unzips', async () => {
    const expect = {
      'a.txt': [ 65 ],
      'b.txt': [ 66 ],
      'c/d.txt': [ 68 ],
      'c/e/f.txt': [ 70 ]
    }

    const map = await readPathBufferMap( testPath )

    const zipBuffer = await zip( map )
    const unzippedMap = await unzip( zipBuffer )

    assert.deepEqual( expect, unzippedMap )
  })

  it( 'unzip fails on bad zip buffer', async () => {
    try {
      await unzip( new Buffer( 0 ) )
    } catch ( err ) {
      assert( err )
    }
  })
})