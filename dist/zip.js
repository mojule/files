"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yazl = require("yazl");
const yauzl = require("yauzl");
const defaultZipToFileBuffersOptions = {
    filter: _s => true,
    map: s => s
};
exports.unzip = async (zipFileBuffer, options = defaultZipToFileBuffersOptions) => {
    options = Object.assign({}, defaultZipToFileBuffersOptions, options);
    const { filter, map } = options;
    const pathBufferMap = {};
    return new Promise((resolve, reject) => {
        yauzl.fromBuffer(zipFileBuffer, { lazyEntries: true }, (err, zipfile) => {
            if (err) {
                reject(err);
                return;
            }
            zipfile.readEntry();
            zipfile.on('entry', entry => {
                // skip empty folders and unexpected files
                if (/\/$/.test(entry.fileName)) {
                    zipfile.readEntry();
                }
                if (!filter(entry.fileName)) {
                    zipfile.readEntry();
                }
                else {
                    let chunks = [];
                    zipfile.openReadStream(entry, (err, readStream) => {
                        if (err)
                            return reject(err);
                        if (readStream === undefined)
                            return reject(Error('no readStream'));
                        readStream.on('data', (chunk) => chunks.push(chunk));
                        readStream.on('end', () => {
                            const buffer = Buffer.concat(chunks);
                            const fileName = map(entry.fileName);
                            pathBufferMap[fileName] = buffer;
                            zipfile.readEntry();
                        });
                        readStream.on('error', err => {
                            reject(err);
                        });
                    });
                }
            });
            zipfile.on('error', err => {
                reject(err);
            });
            // use end with fromBuffer because close is only emitted when streaming
            zipfile.on('end', () => {
                resolve(pathBufferMap);
            });
        });
    });
};
const defaultBeforeEnd = async (_zip) => { };
exports.zip = async (pathBufferMap, beforeEnd = defaultBeforeEnd) => {
    const zip = new yazl.ZipFile();
    Object.keys(pathBufferMap).forEach(key => zip.addBuffer(pathBufferMap[key], key, {
        mtime: new Date(),
        mode: parseInt("0100664", 8)
    }));
    await beforeEnd(zip);
    return new Promise((resolve, reject) => {
        try {
            const bufs = [];
            zip.outputStream.on('data', d => bufs.push(d));
            zip.outputStream.on('end', () => resolve(Buffer.concat(bufs)));
            zip.end();
        }
        catch (err) {
            reject(err);
        }
    });
};
//# sourceMappingURL=zip.js.map