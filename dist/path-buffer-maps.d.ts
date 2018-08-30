import { PathBufferMap } from './types';
export declare const writePathBufferMap: (path: string, map: PathBufferMap) => Promise<void>;
export declare const createPathBufferMap: (paths: string[], rootPath?: string) => Promise<PathBufferMap>;
export declare const readPathBufferMap: (path: string) => Promise<PathBufferMap>;
