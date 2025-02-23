const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const getRoutes = require('./routes/get.route');
const uploadRoutes = require('./routes/upload.route');
const { connectDB } = require('./config/db');

dotenv.config();
connectDB();   
const app = express();

app.use(express.json());
app.use('/get', getRoutes);
app.use('/upload', uploadRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

module.exports = app;
