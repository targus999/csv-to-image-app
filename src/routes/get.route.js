const express = require('express');
const router = express.Router();
const getController = require('../controllers/get.controller');

router.get('/csv', getController.getCSV);

module.exports = router;
