module.exports = mongoUrl => {
  const mongo = require('./mongodb')(mongoUrl);

  return {
    saveAll: mongo.saveAll
  };
};
