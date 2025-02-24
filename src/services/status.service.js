const { Parser } = require("json2csv");



const CsvUpload = require("../models/csvUpload.model");

const getCsvStatus = async (id,req) => {
  return await CsvUpload.findOne({ requestId: id }).select("status").lean();
};

const getCsvFile = async (id,req) => {
  try{
  let csv = await CsvUpload.findOne({ requestId: id });
  if (!csv) {
    return null;
  }
 
  let jsonData = csv.products?.map((item) => {
    return {
      'S. No': item.serialNumber,
      'Product Name': item.productName,
      'Input Image Urls': item.images.map((image) => image.inputUrl).join(','),
      'Output Image Urls': item.images.map((image) => `${req.protocol}://${req.get("host")}/image/${id}/${image.imageId}`).join(',')
    }
  });
  console.log(jsonData);
  const parser = new Parser();
  return parser.parse(jsonData);
}
catch(e){
  console.log(e);
}
};
module.exports = {
  getCsvStatus,getCsvFile
};
