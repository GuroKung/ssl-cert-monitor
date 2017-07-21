const { promisify } = require("util");

const fs = require("fs");
const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

function createDirIfNotExists() {
  if (!fs.existsSync("./src/json")) {
    fs.mkdirSync("./src/json");
  }
}

async function readFromJsonFile(filename) {
  try {
    createDirIfNotExists();

    let buffer = await readFilePromise(`./src/json/${filename}.json`);
    return JSON.parse(buffer);
  } catch (error) {
    console.error(error);
  }
}

async function exportToJsonFile(filename, data) {
  try {
    createDirIfNotExists();

    await writeFilePromise(
      `./src/json/${filename}.json`,
      JSON.stringify(data, null, 4),
      { flag: "w" }
    );

    console.log(`Finish writing ${filename} into files...`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { exportToJsonFile, readFromJsonFile };
