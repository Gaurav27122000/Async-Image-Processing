# Installation

## Prerequisites

- Node.js (v22.2.0 or later)
- MongoDB
- AWS S3 account
- Confluent Cloud account for Kafka

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/<username>/<repository>.git
   cd <repository>
   ```
2. Install dependencies:
   npm install
3. Create a .env file and add your configuration:
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=your-region
   AWS_BUCKET_NAME=your-bucket-name
   MONGODB_URI=your-mongodb-uri
   CONFLUENT_CLOUD_BOOTSTRAP_SERVERS=your-bootstrap-servers
   CONFLUENT_CLOUD_API_KEY=your-api-key
   CONFLUENT_CLOUD_API_SECRET=your-api-secret
4. Start the application:
   npm start

# Usage

## API Endpoints

### Upload CSV

- **URL**: `/api/upload`
- **Method**: `POST`
- **Description**: Upload a CSV file for processing.
- **Parameters**: `file` (form-data)

### Track Status

- **URL**: `/api/status/:requestId`
- **Method**: `GET`
- **Description**: Track the status of a CSV processing request.

## Example

1. Upload a CSV file:
   ```sh
   curl --location 'https://async-image-processing.onrender.com/api/upload-csv' \--form 'csvFile=@"{YOUR_FILE_LOCATION}"'
   ```
2. Check the status of a request:
   ```sh
   curl --location 'https://async-image-processing.onrender.com/api/status/7ec117e3-0b01-4335-ac84-9986c4333acd'
   ```

# Project Details

## Overview

The Image Processing Backend project is designed to handle the upload, processing, and tracking of image compression tasks. It leverages AWS S3 for storage, MongoDB for data persistence, and Kafka for message queuing between services. The primary goal of this project is to process CSV files containing image URLs, compress those images, and store the results while providing real-time status tracking.

## Features

- **CSV Upload**: Allows users to upload CSV files containing image URLs for processing.
- **Image Compression**: Compresses images to reduce their size while maintaining quality, and stores the compressed images in AWS S3.
- **Status Tracking**: Provides endpoints to track the processing status of uploaded CSV files.
- **Product Storage**: Stores product information including image URLs in a MongoDB database.

## Technologies Used

- **Node.js**: The main runtime environment used for the backend server.
- **Express**: A Node.js framework used to create the API endpoints.
- **MongoDB**: A NoSQL database used to store product data and request statuses.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **AWS S3**: Used for storing original and compressed images.
- **Sharp**: A high-performance image processing library used for compressing images.
- **Kafka**: A distributed streaming platform used for message queuing between services.
- **kafkajs**: A modern Apache Kafka client for Node.js.

## Directory Structure

- `controllers/`: Contains the controller functions for handling API requests.
  - `csvController.js`: Handles CSV upload and status tracking requests.
- `services/`: Contains service functions for image processing, S3 interaction, and database operations.
  - `imageService.js`: Contains functions for compressing images.
  - `s3Service.js`: Contains functions for interacting with AWS S3.
  - `productService.js`: Contains functions for handling product data in MongoDB.
- `models/`: Contains MongoDB models for products and request statuses.
  - `productModel.js`: Defines the schema for product data.
  - `requestStatusModel.js`: Defines the schema for request status data.
- `config/`: Contains configuration files for AWS, Kafka, and other services.
  - `aws.js`: Configuration for AWS SDK.
  - `kafka.js`: Configuration for Kafka client.
  - `db.js`: Configuration for MongoDB connection.
- `docs/`: Contains the documentation files.
- `.env`: Environment variables configuration file.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `app.js`: The main application file that sets up the Express server and connects to services.
- `package.json`: Contains metadata about the project and dependencies.

## Flow of Data

1. **CSV Upload**:

   - User uploads a CSV file via the `/api/upload` endpoint.
   - The file is processed, and metadata is extracted.
   - An entry is created in the MongoDB for tracking the request status.

2. **Kafka Message**:

   - A message containing the request ID and file metadata is sent to a Kafka topic.
   - The Kafka consumer picks up the message for processing.

3. **Image Processing**:

   - The consumer processes the message, compressing images listed in the CSV.
   - Compressed images are uploaded to AWS S3.
   - The MongoDB database is updated with the product data and compressed image URLs.

4. **Status Tracking**:
   - The status of the request can be checked via the `/api/status/:requestId` endpoint.
   - The status is updated in MongoDB as the processing progresses.

## API Endpoints

- **POST /api/upload**: Upload a CSV file for processing.
- **GET /api/status/:requestId**: Track the status of a CSV processing request.

## Environment Variables

The following environment variables need to be configured in the `.env` file:

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
- `AWS_REGION`: Your AWS region.
- `AWS_BUCKET_NAME`: Your S3 bucket name.
- `MONGODB_URI`: Your MongoDB connection URI.
- `CONFLUENT_CLOUD_BOOTSTRAP_SERVERS`: Kafka bootstrap servers.
- `CONFLUENT_CLOUD_API_KEY`: Your Confluent Cloud API key.
- `CONFLUENT_CLOUD_API_SECRET`: Your Confluent Cloud API secret.
