const rp = require('request-promise');

module.exports = searchPage => {
  let currentPageIndex = 1;
  return startPage => {
    let queryString = `${startPage}&page=${currentPageIndex}`;

    console.log('Fetching searchPage with queryString:', queryString);

    return searchPage(queryString)
      .then(function collect(searchResult) {
        if (Object.keys(searchResult).length === 0) {
          return searchResult;
        }

        currentPageIndex += 1;
        queryString = `${startPage}&page=${currentPageIndex}`;

        console.log('Fetching searchPage with queryString:', queryString);

        return searchPage(queryString)
          .then(collect)
          .then(inner => searchResult.concat(inner));
      })
      .then(removeEmpty)
      .then(removeDuplicates);
  };
};

function removeDuplicates(searchResults) {
  if (!searchResults) {
    return [];
  }

  const unique = {};
  const distinct = [];
  searchResults.forEach(element => {
    if (!unique[element.title]) {
      distinct.push(element);
      unique[element.title] = true;
    }
  });
  return distinct;
}

function removeEmpty(searchResults) {
  if (!searchResults) {
    return [];
  }

  return searchResults.filter(s => Object.keys(s).length !== 0);
}
