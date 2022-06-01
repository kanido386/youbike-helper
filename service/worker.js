const amqp = require('amqplib/callback_api');

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
      channel.consume(queueName, (data) => {
        // console.log(JSON.parse(data.content.toString()));
        const info = JSON.parse(data.content.toString());
        console.log(info['sna']);
        console.log('v1');
        console.log(info['sbi']);
        console.log(info['lat']);
        console.log(info['lng']);
        console.log(info['mday']);
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