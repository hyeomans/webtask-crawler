'use latest';
module.exports = (ctx, cb) => {
  const { secrets } = ctx;
  const { MONGO_URL } = secrets;

  const crawler = require('./src')(MONGO_URL);
  return crawler.then(result => cb(null, result)).catch(err => cb(err, null));
};
