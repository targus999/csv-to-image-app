const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  inputUrl: { type: String, required: true },
  imageId: { type: String, required: false, unique: true }, // UUID for tracking images
  data: { type: Buffer, required: false }, // Compressed image data
});

const ProductSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  productName: { type: String, required: true },
  images: [ImageSchema], // Array of images for this product
});

const CsvUploadSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true }, // UUID for tracking requests
  products: [ProductSchema], // Array of product entries
  webhookURL: { type: String, required: false }, // URL for sending notifications after completion
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp for tracking
});

const CsvUpload = mongoose.model('CsvUpload', CsvUploadSchema);
module.exports = CsvUpload;
