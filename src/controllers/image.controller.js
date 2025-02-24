const statusService = require('../services/status.service');
const sharp = require("sharp");

exports.getImage = async (req, res) => {
    try{
        const requestId = req.params.requestid;
        const imageId = req.params.imageid;
        const imageData = await statusService.getImageData(requestId,imageId);
        if(!imageData){
            return res.status(404).json({ error: 'Requested resource not found' });
        }
        console.log(imageData);
        
        // Convert to JPEG format using Sharp
        const processedBuffer = await sharp(imageData.data).toFormat("jpeg").toBuffer();
        res.setHeader("Content-Type", "image/png"); // Set correct MIME type
        res.send(processedBuffer);
        // res.status(200).json({ status: status.status, requestId, message, data: csvFile });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong', details: err.message });
    }
  };
  