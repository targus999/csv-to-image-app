const mongoose = require('mongoose');
const { MONGO_URI } = require('./dotenv.config');

// Connect to MongoDB
const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB Connected Successfully');
    } catch (error) {
      console.error('MongoDB Connection Error:', error);
      process.exit(1); // Exit process if unable to connect
    }
  };

  module.exports = { connectDB };