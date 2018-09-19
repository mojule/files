/// <reference types="node" />
import { ZipToFileBuffersOptions, PathBufferMap } from './types';
export declare const unzip: (zipFileBuffer: Buffer, options?: ZipToFileBuffersOptions) => Promise<PathBufferMap>;
export declare const zip: (pathBufferMap: PathBufferMap, beforeEnd?: (_zip: any) => Promise<void>) => Promise<Buffer>;
