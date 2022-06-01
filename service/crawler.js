const cron = require('node-cron');
const fetch = require('node-fetch');
const amqp = require('amqplib/callback_api');

const initCrawler1 = () => {
  const crawler1Job = cron.schedule('* * * * *', async () => {
    console.log('crawler1');
    // Fetch data
    const response = await fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json');
    const data = await response.json();

    amqp.connect('amqp://localhost', function(error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        const queueName = 'queue1';

        channel.assertQueue(queueName, {
          durable: false
        });

        const infos = Object.entries(data['retVal']);
        for (const [key, info] of infos) {
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(info)));
        }
      });

      setTimeout(() => {
        connection.close();
      }, 5000);
    });

  });
  crawler1Job.start();
};

module.exports = {
  initCrawler1
};