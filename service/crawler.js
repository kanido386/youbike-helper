const cron = require('node-cron');
const fetch = require('node-fetch');

const initCrawler1 = () => {
  const crawler1Job = cron.schedule('* * * * *', async () => {
    console.log('crawler1');
    const response = await fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json');
    const data = await response.json();
    console.log(data);
  })
  crawler1Job.start();
};

module.exports = {
  initCrawler1
};