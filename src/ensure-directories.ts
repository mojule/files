import { promises } from 'fs'
import { posix } from 'path'
import { exists } from './exists'

const { mkdir } = promises
const { resolve, parse } = posix

export const ensureParentDirectories = async ( targetPath: string ) => {
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

  await ensureDirectories( ...parents )
}

export const ensureDirectories = async ( ...paths ) => {
  for( let i = 0; i < paths.length; i++ ){
    const directoryExists = await exists( paths[ i ] )

    if( !directoryExists ) await mkdir( paths[ i ] )
  }
}
