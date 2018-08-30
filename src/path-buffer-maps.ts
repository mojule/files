import { PathBufferMap } from './types'
import { promises } from 'fs'
import { posix } from 'path'
import { ensureParentDirectories } from './ensure-directories'
import { readdirFiles } from './readdir-files'
import { assertPosixPath } from './assert-posix'

const { writeFile, readFile } = promises
const { join } = posix

export const writePathBufferMap = async ( path: string, map: PathBufferMap ) => {
  assertPosixPath( path, 'path' )

  const paths = Object.keys( map )

  for( let i = 0; i < paths.length; i++ ){
    const filePath = paths[ i ]
    const buffer = map[ filePath ]
    const writePath = join( path, filePath )

    await ensureParentDirectories( writePath )
    await writeFile( writePath, buffer )
  }
}

export const createPathBufferMap = async ( paths: string[], rootPath = '' ) => {
  assertPosixPath( rootPath, 'rootPath' )

  const fileBuffers: PathBufferMap = {}

  return Promise.all( paths.map( async filePath => {
    assertPosixPath( filePath, 'filePath' )

    fileBuffers[ filePath ] = await readFile( join( rootPath, filePath ) )
  } ) ).then( () => fileBuffers )
}

export const readPathBufferMap = async ( path: string ) => {
  assertPosixPath( path, 'path' )

  const filePaths = await readdirFiles( path )

  return createPathBufferMap( filePaths, path )
}
