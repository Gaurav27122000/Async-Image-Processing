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

