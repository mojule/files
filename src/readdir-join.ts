import { join } from 'path'
import { promises } from 'fs'

const { readdir } = promises

export const readdirJoin = async ( directoryPath: string ) => {
  const contents = await readdir( directoryPath )

  return contents.map( childPath => join( directoryPath, childPath ) )
}
