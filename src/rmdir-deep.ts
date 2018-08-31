import { readdirJoin } from './readdir-join'
import { bucketPaths } from './bucket-paths'
import { promises } from 'fs'
import { assertPosixPath } from './assert-posix'

const { unlink, rmdir } = promises

export const rmdirDeep = async ( directoryPath: string ) => {
  assertPosixPath( directoryPath, 'directoryPath' )

  const directories: string[] = []
  const removeDirectories: string[] = []
  const files: string[] = []
  const paths = await readdirJoin( directoryPath )

  await bucketPaths( paths, { directories, files } )

  while ( directories.length ) {
    const nextPath = directories.shift()!
    const childPaths = await readdirJoin( nextPath )

    removeDirectories.unshift( nextPath )
    paths.push( ...childPaths )

    await bucketPaths( childPaths, { directories, files } )
  }

  await Promise.all( files.map( unlink ) )

  for ( let i = 0; i < removeDirectories.length; i++ ){
    await rmdir( removeDirectories[ i ] )
  }

  await rmdir( directoryPath )
}
