/// <reference types="node" />
export interface BucketsBase {
    directories?: string[];
    files?: string[];
}
export interface DirectoryBuckets extends BucketsBase {
    directories: string[];
}
export interface FileBuckets extends BucketsBase {
    files: string[];
}
export interface Buckets extends BucketsBase {
    directories: string[];
    files: string[];
}
export declare type BucketOptions = DirectoryBuckets | FileBuckets | Buckets;
export interface PathBufferMap {
    [path: string]: Buffer;
}
export interface ZipToFileBuffersOptions {
    filter: (fileName: string) => boolean;
    map: (fileName: string) => string;
}
