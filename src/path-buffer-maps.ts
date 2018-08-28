import { PathBufferMap } from './types'
import { promises } from 'fs'
import { join } from 'path'
import { ensureParentDirectories } from './ensure-directories'
import { readdirFiles } from './readdir-files'

const { writeFile, readFile } = promises

export const writePathBufferMap = ( path: string, map: PathBufferMap ) => {
  const paths = Object.keys( map )

  return Promise.all( paths.map( async filePath => {
    const buffer = map[ filePath ]
    const writePath = join( path, filePath )

    await ensureParentDirectories( writePath )

    return writeFile( writePath, buffer )
  } ) )
}

export const createPathBufferMap = async ( paths: string[] ) => {
  const fileBuffers: PathBufferMap = {}

  return Promise.all( paths.map( async filePath => {
    fileBuffers[ filePath ] = await readFile( filePath )
  } ) ).then( () => fileBuffers )
}

export const readPathBufferMap = async ( path: string ) => {
  const filePaths = await readdirFiles( path )

  return createPathBufferMap( filePaths )
}
