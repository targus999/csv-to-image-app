const getService = require('../services/get.service');

exports.getCSV = async (req, res) => {
  try {
    const result = await getService.processCSV();
    res.status(200).json({ message: 'CSV processed successfully', data: result });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong while fetching CSV' });
  }
};
