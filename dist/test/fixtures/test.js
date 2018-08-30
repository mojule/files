"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const start = async () => {
    const bufferMap = await __1.readPathBufferMap('./src/test/fixtures/z');
    console.log(JSON.stringify(bufferMap));
};
start();
//# sourceMappingURL=test.js.map