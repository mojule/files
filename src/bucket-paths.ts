import { promises } from 'fs'
import { BucketOptions } from './types'
import { assertPosixPath } from './assert-posix';

const { stat } = promises

const isBucketOptions = ( options: any ): options is BucketOptions =>
  options !== undefined &&
  ( Array.isArray( options.directories ) || Array.isArray( options.files ) )

export const bucketPaths = async ( paths: string[], options: BucketOptions ) => {
  if ( !isBucketOptions( options ) )
    throw Error( 'options must include either or both of directories and files' )

  const { directories, files } = options

  for ( let i = 0; i < paths.length; i++ ) {
    const path = paths[ i ]

    assertPosixPath( path, 'path' )

    const stats = await stat( path )

    if ( directories !== undefined && stats.isDirectory() ) {
      directories.push( path )
    } else if ( files !== undefined && stats.isFile() ) {
      files.push( path )
    }
  }
}
