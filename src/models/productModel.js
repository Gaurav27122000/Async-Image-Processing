const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  inputImageUrls: {
    type: [String],
    required: true,
  },
  outputImageUrls: {
    type: [String],
    required: true,
  },
  requestId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  'ProductsDB',
  ProductSchema,
  'Image_Processing'
);
