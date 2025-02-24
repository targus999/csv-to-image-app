require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/csvApp',
  WEB_HOOK_URL:process.env.WEB_HOOK_URL||null
};
