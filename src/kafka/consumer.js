const { Kafka } = require('kafkajs');
const kafkaConfig = require('../config/kafka');
const { addProducts } = require('../services/productsService');
const { updateRequestStatus } = require('../services/requestStatusService');

const kafka = new Kafka(kafkaConfig);

// Create consumer
const consumer = kafka.consumer({ groupId: 'nodejs-group-1', 'auto.offset.reset': 'earliest' });


const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'kafka-csv-cluster', fromBeginning: true });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { requestId, metadata } = JSON.parse(message.value.toString());
      await updateRequestStatus(requestId, 'Processing');
      await addProducts(requestId, metadata);
    },
  });

  function handleError(err) {
    if (
      Object.prototype.toString.call(err) === '[object Error]' ||
      err instanceof Error
    ) {
      console.error('Error from Kafka consumer:', err.message);
    } else {
      console.error('Unknown error from Kafka consumer:', err);
    }
  }
};

module.exports = {
  runConsumer,
};
