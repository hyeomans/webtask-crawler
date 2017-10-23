module.exports = (singlePage, allSearchResults) => {
  return startPage => {
    return allSearchResults(startPage).then(searchResults => {
      return Promise.all(searchResults.map(r => singlePage(r)));
    });
  };
};
