const cheerio = require('cheerio');

const prefixUrl = 'https://www.kwnext.mx/';

const caracteristicas = '.row .fila_caracteristicas';

module.exports = requestPromise => {
  return slug => {
    const uri = `${prefixUrl}/${slug}`;
    const options = {
      uri
    };

    return requestPromise(options)
      .then(cheerio.load)
      .then($ => {
        const $printableArea = $('#printableArea');
        const current = getCaracteristicas($);
        const id = getId($printableArea);
        const precio = getPrecio($printableArea);

        return {
          slug,
          id,
          precio,
          caracteristicas: current
        };
      })
      .catch(console.error);
  };
};

function getId($printableArea) {
  const $id = trim(
    $printableArea
      .find('p')
      .last()
      .text()
  );
  const kwNextId = $id
    .slice($id.indexOf(':') + 1)
    .replace(/-/g, '')
    .replace(/^\s/, '');

  return `knNextId:${kwNextId}`;
}

function getPrecio($printableArea) {
  const $precio = $printableArea.find('p > b');
  return trim($precio.text());
}

function getCaracteristicas($) {
  const $caracteristicas = $(caracteristicas);

  return $caracteristicas
    .map((index, elem) => {
      const $elem = $(elem);
      const $children = $elem.children();
      const $first = $children.first();
      const $sibling = $first.next();
      return { title: trim($first.text()), value: trim($sibling.text()) };
    })
    .get()
    .filter(x => x.title !== '');
}

function trim(text) {
  return text
    .replace(/\t|\n/g, '')
    .replace(/^\s/g, '')
    .replace(/\s$/g);
}
