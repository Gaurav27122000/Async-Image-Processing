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

async function shutdown() {
  try {
    await producer.disconnect();
    console.log('Producer disconnected successfully.');
  } catch (e) {
    console.error('Error while disconnecting producer:', e);
  }
}


process.on('SIGINT', async () => {
  console.log('Received SIGINT. Shutting down producer...');
  await shutdown();
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Shutting down producer...');
  await shutdown();
});

process.on('SIGQUIT', async () => {
  console.log('Received SIGQUIT. Shutting down producer...');
  await shutdown();
});


module.exports = {
  sendMessage,
};
