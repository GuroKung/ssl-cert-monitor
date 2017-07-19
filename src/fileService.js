const { promisify } = require("util");

const fs = require("fs");
const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

function readFromJsonFile(filename) {
  if (!fs.existsSync("./src/json")) {
    fs.mkdirSync("./src/json");
  }

  return readFilePromise(`./src/json/${filename}.json`)
    .then(buffer => JSON.parse(buffer))
    .catch(e => console.error(e));
}

function exportToJsonFile(filename, data) {
  return writeFilePromise(
    `./src/json/${filename}.json`,
    JSON.stringify(data, null, 4),
    { flag: "w" }
  )
    .then(() => console.log(`Finish writing ${filename} into files...`))
    .catch(e => console.error(e));
}

module.exports = { exportToJsonFile, readFromJsonFile };
