import { stat } from 'fs'

export const exists = ( path: string ) => new Promise<boolean>(
  resolve => {
    stat( path, err => {
      if( err ){
        return resolve( false )
      }

      resolve( true )
    })
  }
)
