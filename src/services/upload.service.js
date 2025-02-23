const  {Worker}  = require('worker_threads');
const { v4: uuidv4 } = require('uuid');
const CsvUpload = require('../models/csvUpload.model'); // Import Mongoose model

class UploadService {
    static async saveCsvData(data, requestId) {

        // Store data in the database
        const newUpload = new CsvUpload({
            requestId,
            products: data.map(p => ({
                serialNumber: p['S. No.'],
                productName: p['Product Name'],
                images: p['Input Image URLs'].split(",").map(url => ({
                    inputUrl: url.trim(),
                    imageId: uuidv4(),
                }))
            }))
        });

        await newUpload.save();

        // Spawn a worker thread for image processing
        const worker = new Worker('./src/workers/imageProcessor.worker.js', {
            workerData: { requestId }
        });

        worker.on('message', (msg) => {
            console.log(`Worker: ${msg}`);
        });

        worker.on('error', (err) => {
            console.error(`Worker error: ${err}`);
        });

        worker.on('exit', (code) => {
            console.log(`Worker stopped with exit code ${code}`);
        });
    }
}
module.exports = UploadService;
