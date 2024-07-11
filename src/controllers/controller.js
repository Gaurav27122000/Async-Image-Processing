const ProductsDB = require('../models/productModel');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getS3Client } = require('../config/aws');
const { sendMessage } = require('../kafka/producer');
const extractMetadata = require('../utils/extractMetadata');
const { v4: uuidv4 } = require('uuid');
const {
  createRequestStatus,
  getRequestStatus,
} = require('../services/requestStatusService');
const client = getS3Client();

const uploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const requestId = uuidv4();
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: `csv-files/${requestId}.csv`,
    Body: req.file.buffer,
  };

  const uploadCommand = new PutObjectCommand(uploadParams);
  client.send(uploadCommand);
  try {
    const metadata = await extractMetadata(req.file.buffer);
    const message = { requestId, metadata };
    sendMessage('kafka-csv-cluster', requestId, JSON.stringify(message));
    await createRequestStatus(requestId, 'File will be processed soon');
    console.log(`New request created for request id: ${requestId}`);
    res.status(200).send({
      requestId,
      message: 'CSV file uploaded and message sent to Kafka successfully.',
    });
  } catch (error) {
    console.error('Error uploading CSV to S3 and Kafka:', error);
    res.status(500).send({ error: error.message });
  }
};

const getStatus = async (req, res) => {
  const { requestId } = req.params;

  try {
    const status = await getRequestStatus(requestId);
    if (!status) {
      return res.status(404).json({ message: 'Request ID not found' });
    }
    res.status(200).json(status);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving status: ${error.message}` });
  }
};

const getProductsByRequestId = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    const products = await ProductsDB.find({ requestId });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found for this requestId' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  uploadCSV,
  getStatus,
  getProductsByRequestId,
};
