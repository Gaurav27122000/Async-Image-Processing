const {Kafka} = require('kafkajs');

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

// const kafka = new Kafka.Producer({
//   bootstrap:{
//     servers:[process.env.CONFLUENT_CLOUD_BOOTSTRAP_SERVERS]
//   },
//   security:{
//     protocol: 'SASL_SSL'
//   },
//   sasl: {
//     mechanism: 'plain',
//     username: process.env.CONFLUENT_CLOUD_API_KEY,
//     password: process.env.CONFLUENT_CLOUD_API_SECRET,
//   },
// });

module.exports = kafkaConfig;
