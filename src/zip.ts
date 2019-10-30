import * as yazl from 'yazl'
import * as yauzl from 'yauzl'
import { ZipToFileBuffersOptions, PathBufferMap } from './types'

const defaultZipToFileBuffersOptions: ZipToFileBuffersOptions = {
  filter: _s => true,
  map: s => s
}

export const unzip = async ( zipFileBuffer: Buffer, options = defaultZipToFileBuffersOptions ) => {
  options = { ...defaultZipToFileBuffersOptions, ...options }
  const { filter, map } = options

  const pathBufferMap: PathBufferMap = {}

  return new Promise<PathBufferMap>( ( resolve, reject ) => {
    yauzl.fromBuffer(
      zipFileBuffer,
      { lazyEntries: true },
      ( err, zipfile ) => {
        if ( err ) {
          reject( err )
          return
        }

        zipfile!.readEntry()

        zipfile!.on( 'entry', entry => {
          // skip empty folders and unexpected files
          if ( /\/$/.test( entry.fileName ) ) {
            zipfile!.readEntry()
          } else if ( !filter( entry.fileName ) ) {
            zipfile!.readEntry()
          } else {
            let chunks: Buffer[] = []

            zipfile!.openReadStream( entry, ( err, readStream ) => {
              if ( err ) return reject( err )
              if ( readStream === undefined )
                return reject( Error( 'no readStream' ) )

              readStream.on( 'data',
                ( chunk: Buffer ) => chunks.push( chunk )
              )
              readStream.on( 'end', () => {
                const buffer = Buffer.concat( chunks )
                const fileName = map( entry.fileName )

                pathBufferMap[ fileName ] = buffer

                zipfile!.readEntry()
              } )
              readStream.on( 'error', err => {
                reject( err )
              } )
            } )
          }
        } )

        zipfile!.on( 'error', err => {
          reject( err )
        } )

        // use end with fromBuffer because close is only emitted when streaming
        zipfile!.on( 'end', () => {
          resolve( pathBufferMap )
        } )
      }
    )
  } )
}

const defaultBeforeEnd = async ( _zip: any ) => { }

export const zip = async ( pathBufferMap: PathBufferMap, beforeEnd = defaultBeforeEnd ): Promise<Buffer> => {
  const zip = new yazl.ZipFile()

  Object.keys( pathBufferMap ).forEach( key =>
    zip.addBuffer( pathBufferMap[ key ], key, {
      mtime: new Date(),
      mode: parseInt( "0100664", 8 )
    } )
  )

  await beforeEnd( zip )

  return new Promise<Buffer>( ( resolve, reject ) => {
    try {
      const bufs: Buffer[] = []
      zip.outputStream.on( 'data', d => bufs.push( d ) )
      zip.outputStream.on( 'end', () => resolve( Buffer.concat( bufs ) ) )
      zip.end()
    } catch ( err ) {
      reject( err )
    }
  } )
}
