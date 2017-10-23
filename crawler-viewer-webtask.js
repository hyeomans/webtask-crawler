'use latest';

const Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');

const mongoUrl =
  'mongodb://crawler-user:cmNQ9z3qt9xR@ds227555.mlab.com:27555/webtask-crawler';

module.exports = (ctx, cb) => {
  const { secrets } = ctx;
  const { MONGO_URL } = secrets;

  return retrieveResults(MONGO_URL)
    .then(results => cb(null, results))
    .catch(err => cb(err, null));
};

function retrieveResults(mongoUrl) {
  return MongoClient.connect(mongoUrl)
    .then(db => {
      return db
        .collection('properties')
        .find({}, { sort: { created: -1 } })
        .toArray();
    })
    .then(result => {
      return result.reduce((prev, current) => {
        const date = moment(current.created).format('YYYY-MM-DD');
        if (!prev[date]) {
          prev[date] = [];
          prev[date].push(current);
        } else {
          prev[date].push(current);
        }

        return prev;
      }, {});
    });
}
