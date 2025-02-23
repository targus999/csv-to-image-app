const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/upload.controller');

const router = express.Router();

const upload = multer();

router.post('/', upload.single('file'), uploadController.getCSV);

module.exports = router;
