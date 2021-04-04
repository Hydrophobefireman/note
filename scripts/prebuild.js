const { rmSync } = require("fs");
const { join } = require("path");
const config = require("../ui.config.json");

const currPath = __dirname;
const outputDir = join(currPath, "..", config.outputDir);
console.log(`$ rm -rf ${outputDir}`);
rmSync(outputDir, { recursive: true, force: true });
