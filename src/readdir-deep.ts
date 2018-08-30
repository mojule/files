import { readdirJoin } from './readdir-join'
import { bucketPaths } from './bucket-paths'
import { posix } from 'path'
import { assertPosixPath } from './assert-posix'

const { relative } = posix

export const readdirDeep = async ( directoryPath: string ) => {
  assertPosixPath( directoryPath, 'directoryPath' )

  const directories: string[] = []
  const paths = await readdirJoin( directoryPath )

  await bucketPaths( paths, { directories } )

  while ( directories.length ) {
    const nextPath = directories.shift()!
    const childPaths = await readdirJoin( nextPath )

    paths.push( ...childPaths )

    await bucketPaths( childPaths, { directories } )
  }

  return paths.map( p => relative( directoryPath, p ) )
}
