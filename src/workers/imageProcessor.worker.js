const { parentPort, workerData } = require('worker_threads');
const sharp = require('sharp');
const axios = require('axios');
const CsvUpload = require('../models/csvUpload.model');
const { connectDB } = require('../config/db');

(async () => {
    try {
        const { requestId } = workerData;
        connectDB();

        // Fetch image data from DB
        const upload = await CsvUpload.findOne({
            requestId
        });
        parentPort.postMessage("Started processing images");
        upload.status = 'processing';
        upload.save();

        for (let product of upload.products) {
            for (const image of product.images) {
                try {
                    const response = await axios.get(image.inputUrl, { responseType: 'arraybuffer' });
                    const compressedBuffer = await sharp(response.data)
                        .jpeg({ quality: 50 }) // Compress by 50%
                        .toBuffer();
                    image.data = compressedBuffer;

                } catch (err) {
                    console.error(`Error processing image: ${image.imageId}`, err);
                }
            }
        }
        upload.status = 'completed';
        upload.save();
        parentPort.postMessage('Image processing completed');


        if (upload.webhookURL) axios.post(upload.webhookURL, {   //webhook call
            requestId,
            message: 'Image processing completed',
        });



       

    } catch (error) {
        upload.status = 'failed';
        upload.save();
        console.error('Worker Thread Error:', error);
    }
})();
