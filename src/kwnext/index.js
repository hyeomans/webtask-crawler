const rp = require('request-promise');

const singlePage = require('./singlePage')(rp);
const searchPage = require('./searchPage')(rp);

const allSearchResults = require('./allSearchResults')(searchPage);
const allPages = require('./allPages')(singlePage, allSearchResults);
const persistence = require('../persistence');

module.exports = persistence => {
  const crawler = require('./crawler')(allPages, persistence);

  return {
    crawler
  };
};
