const https = require("https");
const { hosts } = require("../config");

function validate(host, port) {
  if (host === null || port === null) {
    throw new Error("Invalid host or port.");
  }

  const options = {
    host: host,
    port: port,
    method: "GET"
  };

  return new Promise((resolve, reject) => {
    let req = https
      .request(options, res => {
        const certInfo = res.socket.getPeerCertificate();
        const dateInfo = {
          from: certInfo.valid_from,
          to: certInfo.valid_to
        };
        // console.log(`Host '${host}' certificate authorized: ${res.socket.authorized}`);
        // console.log(dateInfo);
        resolve(
          `Host '${host}' certificate authorized: ${res.socket.authorized}`
        );
      })
      // Error handling here
      .on("error", e => {
        // console.error(`Host '${host}'`, e.message);
        resolve(`Host '${host}'`, e.message);
      });
    req.end();
  });
}

async function validateHosts() {
  console.log("Start validating hosts...");
  console.log("====================================");
  let results = await Promise.all(hosts.map(host => validate(host, 443)));
  results.forEach((result) => console.log(result));
  console.log("====================================");
  console.log("All Done");
  console.log("====================================");
}

module.exports = { validateHosts };
