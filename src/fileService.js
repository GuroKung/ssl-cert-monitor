const { promisify } = require("util");

const fs = require("fs");
const writeFilePromise = promisify(fs.writeFile);

function exportToJsonFile(filename, data) {
  return writeFilePromise(
    `./src/json/${filename}.json`,
    JSON.stringify(data, null, 4),
    { flag: "w" }
  )
    .then(() => console.log(`Finish writing ${filename} into files...`))
    .catch(e => console.error(e));
}

module.exports = { exportToJsonFile };
