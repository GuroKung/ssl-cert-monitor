const https = require("https");
const moment = require("moment");
const { hosts, expireLimit } = require("../config");
const fileService = require("./fileService");

function expirationFormatter(host, validFrom, validTo) {
  let currentDate = moment(new Date());
  let toDate = moment(new Date(validTo));
  return {
    host,
    from: validFrom,
    to: validTo,
    expires: toDate.diff(currentDate, "days")
  };
}

function validate(host) {
  if (host === null) {
    throw new Error("Invalid host.");
  }

  console.log(`Start checking ${host}...`);

  const options = {
    host: host,
    method: "GET",
    agent: false // create a new agent just for this one request
  };

  return new Promise((resolve, reject) => {
    let req = https
      .request(options, res => {
        const certInfo = res.connection.getPeerCertificate();
        const certData = expirationFormatter(
          host,
          certInfo.valid_from,
          certInfo.valid_to
        );
        // console.log(
        //   `Host '${host}' certificate authorized: ${res.socket.authorized}`
        // );
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

  try {
    let results = await Promise.all(hosts.map(host => validate(host, 443)));

    await fileService.exportToJsonFile("sortLists", getSortedLists(results));
    await fileService.exportToJsonFile("expireLists", getExpireLists(results));
  } catch (error) {
    console.error(error);
  }

  console.log("====================================");
  console.log("All Done");
  console.log("====================================");
}

function getExpireLists(lists) {
  return {
    items: lists
      .filter(data => typeof data == "object" && data.expires <= expireLimit)
      .sort((a, b) => a.expires - b.expires)
  };
}

function getSortedLists(lists) {
  return {
    items: lists
      .filter(data => typeof data == "object")
      .sort((a, b) => a.expires - b.expires)
  };
}

module.exports = { validateHosts };
