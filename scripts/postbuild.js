const { readdirSync, copyFileSync } = require("fs");
const { join, basename } = require("path");
const config = require("../ui.config.json");

const currPath = __dirname;
const outputDir = join(currPath, "..", config.outputDir);
const BUILD_STATIC = join(currPath, "..", "build_static/");
readdirSync(BUILD_STATIC).forEach((x) => {
  console.log("Copying ", x, "to", outputDir);
  copyFileSync(join(BUILD_STATIC, x), join(outputDir, basename(x)));
});
