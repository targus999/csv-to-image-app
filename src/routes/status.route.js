const express = require('express');
const router = express.Router();
const statusController = require('../controllers/status.controller');

router.get('/:requestid', statusController.getCSV);

module.exports = router;
