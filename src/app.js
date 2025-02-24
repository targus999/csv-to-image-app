const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const statusRoutes = require('./routes/status.route');
const uploadRoutes = require('./routes/upload.route');
const { connectDB } = require('./config/db');

dotenv.config();
connectDB();   
const app = express();

app.use(express.json());
app.use('/status', statusRoutes);
app.use('/upload', uploadRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

module.exports = app;
