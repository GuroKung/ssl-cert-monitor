const hosts = require("./config").hosts;
const https = require('https');

hosts.map(host => {
  const options = {
    host,
    method: "get",
    path: "/"
  };

  const req = https
    .request(options, res => {
      console.log("certificate authorized:" + res.socket.authorized);
    //   console.log("certificate detail:", res.socket.getPeerCertificate());
    })
    .on("error", e => {
      console.error(e.message);
    });
    req.end();
});