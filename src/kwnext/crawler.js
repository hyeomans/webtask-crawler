const Promise = require('bluebird');

module.exports = (allPages, persistence) => {
  return startPage => {
    return allPages(startPage)
      .then(allPages => {
        return persistence.saveAll(allPages);
      })
      .then(allPages => {
        return allPages.reduce(
          (prev, current) => {
            if (current.alreadySeen) {
              prev.alreadyStored += 1;
            } else {
              prev.newProperties += 1;
            }
            return prev;
          },
          { alreadyStored: 0, newProperties: 0 }
        );
      });
  };
};
