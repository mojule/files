import { readdirJoin } from './readdir-join'
import { bucketPaths } from './bucket-paths'
import { posix } from 'path'

const { relative } = posix

export const readdirFiles = async ( directoryPath: string ) => {
  const directories: string[] = []
  const files: string[] = []
  const buckets = { directories, files }
  const paths = await readdirJoin( directoryPath )

  await bucketPaths( paths, buckets )

  while ( directories.length ) {
    const nextPath = directories.shift()!
    const childPaths = await readdirJoin( nextPath )

    await bucketPaths( childPaths, buckets )
  }

  return files.map( p => relative( directoryPath, p ) )
}
