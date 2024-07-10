require('dotenv').config();
const express = require('express');
const csvRoutes = require('./src/routes/csvRoutes');
const kafkaConsumer = require('./src/kafka/consumer');
const connectDB = require('./src/config/connectDB');
const cors = require('cors');

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use('/api', csvRoutes);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
  kafkaConsumer
    .runConsumer()
    .then(async () => {
      console.log('Kafka consumer started successfully.');
      await connectDB();
    })
    .catch((error) => {
      console.error('Error starting Kafka consumer:', error);
    });
});
