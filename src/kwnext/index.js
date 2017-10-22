const rp = require('request-promise');

const singlePage = require('./singlePage')(rp);

module.exports = {
  singlePage
};
