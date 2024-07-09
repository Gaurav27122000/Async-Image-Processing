const ProductsDB = require('../models/productModel');
const { v4: uuidv4 } = require('uuid');
const { compressImage } = require('./imageService');
const { updateRequestStatus } = require('./requestStatusService');

const addProducts = async (requestId, products) => {
  try {
    const productDocs = await Promise.all(
      products.map(async (product) => {
        const compressedImageUrls = await Promise.all(
          product['Input Image Urls'].split(',').map(async (url) => {
            return await compressImage(url, product['Product Name']);
          })
        );

        return {
          productId: uuidv4(),
          productName: product['Product Name'],
          inputImageUrls: product['Input Image Urls'],
          outputImageUrls: compressedImageUrls,
          requestId: requestId,
        };
      })
    );

    await ProductsDB.insertMany(productDocs);
    await updateRequestStatus(requestId, 'Completed');
    console.log('Products added to MongoDB:', productDocs);
  } catch (error) {
    console.error('Error adding products to MongoDB:', error);
  }
};

module.exports = {
  addProducts,
};
