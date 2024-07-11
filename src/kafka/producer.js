const { Kafka } = require('kafkajs');
const { getProducer } = require('../config/kafka');
const producer = getProducer();

const sendMessage = async (topic, key, value) => {
  return new Promise(async (resolve, reject) => {
    await producer.connect();

    try {
      console.log('Kafka Producer is connected and ready.');
      producer.send({
        topic,
        messages: [{ key, value }],
      });
      console.log(
        `Produced message to topic ${topic}: key = ${key} value = ${value}`
      );
    } catch (error) {
      console.error('Error producing message:', error);
    } finally {
      await producer.disconnect();
      console.log('Kafka producer disconnected.');
    }
  });
};

module.exports = {
  sendMessage,
};
