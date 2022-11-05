const {
  readdirSync,
  copyFileSync,
  lstatSync,
  mkdirSync,
  existsSync,
} = require("fs");
const { join } = require("path");
const config = require("../ui.config.json");

const currPath = __dirname;
const outputDir = join(currPath, "..", config.outputDir);
const BUILD_STATIC = join(currPath, "..", `${config.staticDir}/`);

function copyFolderSync(from, to) {
  if (!existsSync(to)) {
    mkdirSync(to);
  }
  console.log("Copying ", from, "to", to);
  readdirSync(from).forEach((element) => {
    if (lstatSync(join(from, element)).isFile()) {
      copyFileSync(join(from, element), join(to, element));
    } else {
      copyFolderSync(join(from, element), join(to, element));
    }
  });
}

copyFolderSync(BUILD_STATIC, outputDir);
