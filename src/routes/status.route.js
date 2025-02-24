const express = require('express');
const router = express.Router();
const getController = require('../controllers/status.controller');

router.get('/:requestid', getController.getCSV);

module.exports = router;
