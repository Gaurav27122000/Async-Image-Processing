const { Kafka } = require('kafkajs');

const kafkaConfig = {
  clientId: 'rdkafka',
  brokers: [process.env.CONFLUENT_CLOUD_BOOTSTRAP_SERVERS],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.CONFLUENT_CLOUD_API_KEY,
    password: process.env.CONFLUENT_CLOUD_API_SECRET,
  },
};
const kafka = new Kafka(kafkaConfig);
const producer = kafka.producer();
const consumer = kafka.consumer({
  groupId: 'nodejs-group-1',
  'auto.offset.reset': 'earliest',
});

const getProducer = () => {
  return producer;
};

const getConsumer = () => {
  return consumer;
};

module.exports = { getProducer, getConsumer };
