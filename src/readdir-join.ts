import { posix } from 'path'
import { promises } from 'fs'
import { assertPosixPath } from './assert-posix'

const { join } = posix
const { readdir } = promises

export const readdirJoin = async ( directoryPath: string ) => {
  assertPosixPath( directoryPath, 'directoryPath' )

  const contents = await readdir( directoryPath )

  return contents.map( childPath => join( directoryPath, childPath ) )
}
