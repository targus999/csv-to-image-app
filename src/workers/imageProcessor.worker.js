const { parentPort, workerData } = require('worker_threads');
const sharp = require('sharp');
const axios = require('axios');

(async () => {
    try {
        const { imageData } = workerData;
        let processedImages = [];

        for (const image of imageData) {
            try {
                const response = await axios.get(image.inputUrl, { responseType: 'arraybuffer' });
                const compressedBuffer = await sharp(response.data)
                    .jpeg({ quality: 50 }) // Compress by 50%
                    .toBuffer();

                processedImages.push({ inputUrl: image.inputUrl, data: compressedBuffer });
            } catch (err) {
                console.error(`Error processing image: ${image.inputUrl}`, err);
            }
        }

        // Send processed images back to main thread for DB update
        parentPort.postMessage(processedImages);
    } catch (error) {
        console.error('Worker Thread Error:', error);
        parentPort.postMessage([]);
    }
})();
