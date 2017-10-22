const kwNext = require('./kwnext');
//https://www.kwnext.mx/
kwNext
  .searchPage('f=1&operation=2&city_id=1&type_id=Residenciales&page=5')
  .then(console.log);
