module.exports = init;

function init(mongoUrl) {
  const persistence = require('./persistence')(mongoUrl);
  const kwNext = require('./kwnext')(persistence);

  const residencialesRentaQuery =
    'propiedades?f=1&operation=2&city_id=1&type_id=Residenciales';

  return kwNext.crawler(residencialesRentaQuery);
}
