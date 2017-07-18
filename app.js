const { CronJob } = require('cron');
const validator = require('./src/validator');


// validator.validateHosts();

let monitorJob = new CronJob ({
    cronTime: '0 */1 * * * *',
    onTick: () => {
        validator.validateHosts();
    },
    // init data on start
    runOnInit: true,
    timeZone: 'Asia/Bangkok'
});

// run job
monitorJob.start();
