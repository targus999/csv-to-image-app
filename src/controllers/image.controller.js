const statusService = require('../services/status.service');
const sharp = require("sharp");
const redisClient  = require('../utils/redisClient');
const { REDIS_URL } = require('../config/dotenv.config');


exports.getImage = async (req, res) => {
  try {
    const requestId = req.params.requestid;
    const imageId = req.params.imageid;
    let imageData;
    let image;
    // Check if image is cached in Redis
    
    image = await redisClient.getCachedImage(imageId);
    
    if (image) {
      console.log("[DEBUG] Image fetched from cache");
      imageData=image;
    } else {
      console.log("[DEBUG] Image saved to cache");
      image = await statusService.getImageData(requestId, imageId);
      if (!image) {
        return res.status(404).json({ error: 'Requested resource not found' });
      }
      imageData=image[0].data;
      redisClient.cacheImage(imageId, imageData);
    }
    res.setHeader("Content-Type", "image/png"); // Set correct MIME type
    res.send(imageData);
    // res.status(200).json({ status: status.status, requestId, message, data: csvFile });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
};
