const statusService = require('../services/status.service');

exports.getCSV = async (req, res) => {
  try {
    const requestId = req.params.requestid;
    const status = await statusService.getCsvStatus(requestId);
    if (!status) {
      return res.status(404).json({ error: 'CSV not found' });
    }
    let message = '';
    let csvFile = null;
    switch (status.status) {
      case 'completed':
        csvFile = await statusService.getCsvFile(requestId, req);
        message = 'CSV processed successfully';
        break;
      case 'failed':
        message = 'CSV processing failed';
        break;
      case 'processing':
        message = 'CSV processing in progress';
        break;
      case 'pending':
        message = 'CSV processing pending';
    }
      res.status(200).json({ status: status.status, requestId, message, data: csvFile });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong while fetching CSV' });
  }
};
