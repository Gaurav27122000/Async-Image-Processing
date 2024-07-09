const axios = require('axios');
const sharp = require('sharp');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { client } = require('../config/aws');
const { v4: uuidv4 } = require('uuid');

const compressImage = async (imageUrl, productName) => {
  try {
    // Fetch the image from the provided URL
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });
    const originalImageBuffer = Buffer.from(response.data, 'binary');

    // Get metadata to check the image format
    const metadata = await sharp(originalImageBuffer).metadata();

    // Check if the image format is supported
    if (!['jpeg', 'png', 'webp', 'tiff'].includes(metadata.format)) {
      throw new Error(`Unsupported image format: ${metadata.format}`);
    }

    // Compress the image
    const compressedImageBuffer = await sharp(originalImageBuffer)
      .resize({ width: Math.round(0.5 * metadata.width) })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Prepare to upload the compressed image to S3
    const compressedImageKey = `compressedImages/${productName}/${uuidv4()}.jpg`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: compressedImageKey,
      Body: compressedImageBuffer,
      ContentType: 'image/jpeg',
    };

    // Upload the compressed image to S3
    const uploadCommand = new PutObjectCommand(uploadParams);
    // await client.send(uploadCommand);

    // Return the URL of the compressed image
    return `https://${uploadParams.Bucket}.s3.amazonaws.com/${compressedImageKey}`;
  } catch (error) {
    console.error('Error compressing and uploading image:', error);
    throw error;
  }
};

module.exports = {
  compressImage,
};
