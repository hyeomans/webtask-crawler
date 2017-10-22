const rp = require('request-promise');

const singlePage = require('./singlePage')(rp);
const searchPage = require('./searchPage')(rp);

module.exports = {
  singlePage,
  searchPage
};
