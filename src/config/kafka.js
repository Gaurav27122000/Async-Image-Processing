const Kafka = require('node-rdkafka');

const kafkaConfig = {
  'bootstrap.servers': process.env.CONFLUENT_CLOUD_BOOTSTRAP_SERVERS, // Example: 'pkc-abcde.kafka.us-west-2.amazonaws.com:9092'
  'sasl.mechanisms': 'PLAIN',
  'sasl.username': process.env.CONFLUENT_CLOUD_API_KEY,
  'sasl.password': process.env.CONFLUENT_CLOUD_API_SECRET,
  'session.timeout.ms': 45000,
  'security.protocol': 'SASL_SSL',
  'client.id': 'rdkafka',
  // 'group.id': 'your-group-id', // Used for consumer groups
  // 'enable.auto.commit': false
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
