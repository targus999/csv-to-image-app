const csv = require('csv-parser');
const UploadService  = require('../services/upload.service');
const { v4: uuidv4 } = require('uuid');
const { WEB_HOOK_URL } = require('../config/dotenv.config');


exports.getCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const webhookURL=WEB_HOOK_URL||null;
    const results = [];

    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    bufferStream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const requestId = uuidv4();
        UploadService.saveCsvData(results, requestId, webhookURL);
        res.status(200).json({
          requestId,
          message: 'CSV file successfully parsed',
          data: results
        });
      })
      .on('error', (err) => {
        res.status(500).json({ error: 'Error parsing CSV file', details: err.message });
      });

  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
};
