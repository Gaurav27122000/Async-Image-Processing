require('dotenv').config();
const express = require('express');
const csvRoutes = require('./routes/csvRoutes');
const kafkaConsumer = require('./kafka/consumer');
const connectDB = require('./config/connectDB');
const { addProducts } = require('./services/productsService');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use('/api', csvRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  kafkaConsumer
    .runConsumer()
    .then(() => {
      console.log('Kafka consumer started successfully.');
    })
    .catch((error) => {
      console.error('Error starting Kafka consumer:', error);
    });
});
