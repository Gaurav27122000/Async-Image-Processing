const Kafka = require('node-rdkafka');
const kafkaConfig = require('../config/kafka');
const producer = new Kafka.Producer({ ...kafkaConfig, dr_cb: true });

const sendMessage = async (topic, key, value) => {
  return new Promise(async (resolve, reject) => {
    await producer.connect();

    await producer.on('ready', () => {
      console.log('Kafka Producer is connected and ready.');
      producer.produce(
        topic,
        -1,
        Buffer.from(value),
        Buffer.from(key),
        Date.now()
      );
      console.log(
        `Produced message to topic ${topic}: key = ${key} value = ${value}`
      );
      resolve();
    });

    await producer.on('event.error', (err) => {
      console.error('Error from producer:', err);
    });
  });
};



module.exports = {
  sendMessage,
};
