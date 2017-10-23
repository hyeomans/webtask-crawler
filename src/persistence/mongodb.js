const Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;

module.exports = mongoUrl => {
  return {
    saveAll
  };

  function saveAll(documents) {
    return ensureUniqueIdIndex()
      .then(db => {
        return documents.map(d => save(d));
      })
      .then(Promise.all);
  }

  function save(document) {
    return ensureUniqueIdIndex().then(db => {
      return addToCollection(db, document);
    });
  }

  function addToCollection(db, document) {
    console.log('Adding document', document.title, ' to storage');
    const withDate = Object.assign(document, {
      created: new Date()
    });

    return db
      .collection('properties')
      .insertOne(withDate)
      .catch(error => {
        if (error.message.startsWith('E11000 duplicate key error index')) {
          return Promise.resolve(
            Object.assign(document, {
              alreadySeen: true
            })
          );
        }

        return Promise.resolve(document, {
          error
        });
      });
  }

  function ensureUniqueIdIndex() {
    return MongoClient.connect(mongoUrl)
      .then(db => {
        const properties = db.collection('properties');

        return Promise.props({
          db,
          uniqueIndex: properties.createIndex(
            {
              id: 1
            },
            {
              unique: true
            }
          )
        });
      })
      .then(({ db }) => db);
  }
};
