const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');

router.get('/:requestid/:imageid', imageController.getImage);

module.exports = router;
