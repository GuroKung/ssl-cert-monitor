const express = require("express");
const { CronJob } = require("cron");

const validator = require("./src/validator");
const { schedule } = require("./config");

const apiRoute = require("./routes/api");

const app = express();

const monitorJob = new CronJob({
  cronTime: schedule.time,
  onTick: () => {
    validator.validateHosts();
  },
  // init data on start
  runOnInit: true,
  timeZone: schedule.timeZone
});

// run job
monitorJob.start();

app.use("/api", apiRoute);

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log("Node app is running on port", app.get("port"));
});

module.exports = app;
