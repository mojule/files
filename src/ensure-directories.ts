import { promises } from 'fs'
import { posix } from 'path'
import { exists } from './exists'
import { assertPosixPath } from './assert-posix';

const { mkdir } = promises
const { resolve, parse } = posix

export const ensureParentDirectories = async ( targetPath: string ) => {
  assertPosixPath( targetPath, 'targetPath' )

  const full = resolve( '/', targetPath )
  const parsed = parse( full )
  const { dir } = parsed
  const segs = dir.split( '/' ).filter( s => s !== '' )

  const parents: string[] = []
  const { length } = segs

  for ( let i = 0; i < length; i++ ) {
    const currentPath = segs.slice( 0, i + 1 )
    parents.push( currentPath.join( '/' ) )
  }

  await ensureDirectories( parents )
}

export const ensureDirectories = async ( paths: string[] ) => {
  for( let i = 0; i < paths.length; i++ ){
    const path = paths[ i ]

    assertPosixPath( path, 'path' )

    const directoryExists = await exists( path )

    if( !directoryExists ) await mkdir( path )
  }
}
