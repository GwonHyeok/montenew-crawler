const cron = require('node-cron');

const task = cron.schedule('* * * * * *', function() {
  console.log('will not execute anymore, nor be able to restart');
});

task.start();
// task.destroy();
