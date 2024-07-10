require('dotenv').config();
const express = require('express');
const csvRoutes = require('./src/routes/csvRoutes');
// const {runConsumer} = require('./src/kafka/consumer');
const connectDB = require('./src/config/connectDB');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api', csvRoutes);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
  // runConsumer()
  //   .then(async () => {
  //     console.log('Kafka consumer started successfully.');
  //   })
  //   .catch((error) => {
  //     console.error('Error starting Kafka consumer:', error);
  //   });
});
