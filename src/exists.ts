import { stat } from 'fs'

export const exists = ( path: string ) => new Promise<boolean>(
  resolve => stat( path, err => resolve( !err ) )
)
