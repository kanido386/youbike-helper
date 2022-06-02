const amqp = require('amqplib/callback_api');
const { Info } = require('./model');

const initWorker1 = async () => {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      const queueName = 'queue1';
      channel.assertQueue(queueName, {
        durable: false
      });

      console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queueName);
      channel.consume(queueName, async (data) => {
        // console.log(JSON.parse(data.content.toString()));
        const info = JSON.parse(data.content.toString());
        // console.log(info['sna']);
        // console.log('v1');
        // console.log(info['sbi']);
        // console.log(Number(info['lng']).toFixed(4));
        // console.log(Number(info['lat']).toFixed(4));
        // console.log(info['mday']);
        // console.log('==============================');

        const newInfo = {
          station: info['sna'],
          version: 'v1',
          available: info['sbi'],
          location: {
            type: 'Point',
            coordinates: [
              Number(Number(info['lng']).toFixed(4)),
              Number(Number(info['lat']).toFixed(4))
            ]
          },
          // Transform '20220523235035' to '2022-05-23T23:50:35'
          datatime: new Date(`${info['mday'].slice(0,4)}-${info['mday'].slice(4,6)}-${info['mday'].slice(6,8)}T${info['mday'].slice(8,10)}:${info['mday'].slice(10,12)}:${info['mday'].slice(12,14)}`)
        };

        const theInfo = await Info.create(newInfo);
        console.log(theInfo);
        console.log('==============================');
        
      }, {
        noAck: true
      });
    });
  });
};

module.exports = {
  initWorker1
};