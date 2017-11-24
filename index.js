const cron = require('node-cron');
const KeywordLogger = require('./workers/keywordLogger');
const montenewMongooseModel = require('./models');

// Database 설정
montenewMongooseModel.initialize();
montenewMongooseModel.connect()
  .then(result => console.log('연결 성공'))
  .catch(e => {
    throw e
  });

// 키워드 로거 실행
const keywordLogger = new KeywordLogger();
keywordLogger.work()
  .then(result => console.log(result))
  .catch(err => console.error(err));

// const task = cron.schedule('* * * * * *', function() {
//   console.log('will not execute anymore, nor be able to restart');
// });

// task.start();
