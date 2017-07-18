const https = require("https");
const moment = require('moment');
const { hosts } = require("../config");

function expirationFormatter(host, validFrom, validTo) {
  let currentDate = moment(new Date());
  let toDate = moment(new Date (validTo));
  return {
    host,
    from: validFrom,
    to: validTo,
    expires: toDate.diff(currentDate, 'days')
  };
}

function validate(host) {
  if (host === null) {
    throw new Error("Invalid host.");
  }

  const options = {
    host: host,
    method: "GET",
    agent: false
  };

  return new Promise((resolve, reject) => {
    let req = https
      .request(options, res => {
        const certInfo = res.connection.getPeerCertificate();
        const certData = expirationFormatter(
          host,
          certInfo.valid_from,
          certInfo.valid_to,
        );
        resolve(certData);
      })
      // Error handling here
      .on("error", e => resolve(`FAILED Host '${host}: ${e.message}`));
    req.end();
  });
}

async function validateHosts() {
  console.log("Start validating hosts...");
  console.log("====================================");
  let results = await Promise.all(hosts.map(host => validate(host, 443)));
  results.forEach(result => console.log(result));
  console.log("====================================");
  console.log("All Done");
  console.log("====================================");
}

module.exports = { validateHosts };