export const assertPosixPath = ( targetPath: string, name = 'path' ) => {
  if ( targetPath.includes( '\\' ) ) throw Error( `Expected ${ name } in posix path format` )
}
