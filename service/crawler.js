const cron = require('node-cron');

const initCrawler1 = () => {
  const crawler1Job = cron.schedule('* * * * *', () => {
    console.log('crawler1');
  })
  crawler1Job.start();
};

module.exports = {
  initCrawler1
};