import { access } from 'fs'

export const exists = ( path: string ) => new Promise(
  resolve => access( path, err => resolve( !err ) )
)
