const kafka = require('node-rdkafka');
const kafkaConfig = require('../config/kafka');
const { addProducts } = require('../services/productsService');
const { updateRequestStatus } = require('../services/requestStatusService');

const runConsumer = async () => {
  kafkaConfig['group.id'] = 'nodejs-group-1';
  const consumer = kafka.KafkaConsumer(
    { ...kafkaConfig },
    { 'auto.offset.reset': 'earliest' }
  );
  consumer.connect();
  consumer.on('ready', () => {
    console.log('Kafka Consumer is connected.');
    consumer.subscribe(['kafka-csv-cluster']);
    consumer.consume();
  });

  consumer.on('data', async (message) => {
    const { requestId, metadata } = JSON.parse(message.value.toString());
    await updateRequestStatus(requestId, 'Processing');
    await addProducts(requestId, metadata);
  });

  consumer.on('event.error', (err) => {
    handleError(err);
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
