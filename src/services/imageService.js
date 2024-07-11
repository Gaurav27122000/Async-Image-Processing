const axios = require('axios');
const sharp = require('sharp');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { getS3Client } = require('../config/aws');
const { v4: uuidv4 } = require('uuid');
const client = getS3Client();

const compressImage = async (imageUrl, productName) => {
  try {
    // Fetch the image from the provided URL
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });
    const originalImageBuffer = Buffer.from(response.data, 'binary');

    const metadata = await sharp(originalImageBuffer).metadata();

    if (!['jpeg', 'png', 'webp', 'tiff'].includes(metadata.format)) {
      throw new Error(`Unsupported image format: ${metadata.format}`);
    }

    // Compressing the image
    const compressedImageBuffer = await sharp(originalImageBuffer)
      .resize({ width: Math.round(0.5 * metadata.width) })
      .jpeg({ quality: 80 })
      .toBuffer();

    const compressedImageKey = `compressedImages/${productName}/${uuidv4()}.jpg`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: compressedImageKey,
      Body: compressedImageBuffer,
      ContentType: 'image/jpeg',
    };

    // Uploading the compressed image to S3
    const uploadCommand = new PutObjectCommand(uploadParams);
    await client.send(uploadCommand);

    return `https://${uploadParams.Bucket}.s3.amazonaws.com/${compressedImageKey}`;
  } catch (error) {
    console.error('Error compressing and uploading image:', error);
    throw error;
  }
};

module.exports = {
  compressImage,
};
