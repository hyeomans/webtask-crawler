const cheerio = require('cheerio');

const prefixUrl = 'https://www.kwnext.mx/propiedades?';
const propertiesSelector = '.propiedad_listado.listing-grid-item';

module.exports = requestPromise => {
  return queryString => {
    const uri = `${prefixUrl}/${queryString}`;
    const options = {
      uri
    };
    return requestPromise(options)
      .then(cheerio.load)
      .then($ => {
        const $properties = $(propertiesSelector);

        if ($properties.length === 0) {
          return {};
        }

        return $properties
          .map((i, elem) => {
            const $elem = $(elem);
            const link = $elem.find('a').attr('href');
            const title = $elem.find('.listing-title').text();
            return { title, link };
          })
          .get();
      })
      .catch(console.error);
  };
};
