const allSearchResults = require(path.join(
  process.cwd(),
  'src',
  'kwnext',
  'allSearchResults'
));

describe('allSearchResults tests', () => {
  it('returns unique results', () => {
    const searchPage = getSearchPageMock();

    const sut = allSearchResults(searchPage);

    const result = sut(
      'propiedades?f=1&operation=2&city_id=1&type_id=Residenciales'
    );

    return result.then(r => {
      expect(searchPage.callCount).to.be.equal(4);

      expect(r).to.eql([
        {
          title: 'RENTO CASA UN PISO CERRADA REAL DEL LLANO',
          link:
            'https://www.kwnext.mx/propiedades/rento-casa-un-piso-cerrada-real-del-llano-12'
        },
        {
          title: 'Se Rentan Oficinas al Norte de la Ciudad',
          link:
            'https://www.kwnext.mx/propiedades/se-rentan-oficinas-al-norte-de-la-ciudad-32'
        },
        {
          title: 'Renta residencia en Corceles Residencial',
          link:
            'https://www.kwnext.mx/propiedades/renta-residencia-en-corceles-residencial-89'
        },
        {
          title: 'Casa habitación ideal para oficina.',
          link:
            'https://www.kwnext.mx/propiedades/casa-habitacion-ideal-para-oficina-119'
        },
        {
          title: 'Se rentan locales en villa de seris',
          link:
            'https://www.kwnext.mx/propiedades/se-rentan-locales-en-villa-de-seris-130'
        },
        {
          title: 'Se Renta Terreno en Blvd. Colosio',
          link:
            'https://www.kwnext.mx/propiedades/se-renta-terreno-en-blvd-colosio-216'
        },
        {
          title: 'Se renta departamento.',
          link: 'https://www.kwnext.mx/propiedades/se-renta-departamento-221'
        },
        {
          title: 'Se Renta Edifico con oficinas en Col. Centenario',
          link:
            'https://www.kwnext.mx/propiedades/se-rentan-locales-para-oficina-en-col-centenario-223'
        },
        {
          title: 'Se renta oficina en Grand Kino.',
          link:
            'https://www.kwnext.mx/propiedades/se-renta-oficina-en-grand-kino-275'
        },
        {
          title: 'Se renta departamento en fraccionamiento Villas del Cortes.',
          link:
            'https://www.kwnext.mx/propiedades/se-renta-departamento-en-fraccionamiento-villas-del-cortes-280'
        },
        {
          title: 'Se renta local en Balderrama.',
          link:
            'https://www.kwnext.mx/propiedades/se-renta-local-en-balderrama-357'
        },
        {
          title: '2 Locales en Renta Ubicados en Colonia Centro',
          link:
            'https://www.kwnext.mx/propiedades/2-locales-en-renta-ubicados-en-colonia-centro-359'
        },
        {
          title: 'Casa en Renta en Real del Sevilla',
          link:
            'https://www.kwnext.mx/propiedades/casa-en-renta-en-real-del-sevilla-388'
        },
        {
          title: 'Se Renta Casa en Puerta Real',
          link:
            'https://www.kwnext.mx/propiedades/se-renta-casa-en-puerta-real-394'
        },
        {
          title: 'Se Renta Casa en Lomas Altas',
          link:
            'https://www.kwnext.mx/propiedades/se-renta-casa-en-lomas-altas-409'
        }
      ]);
    });
  });

  function getSearchPageMock() {
    const searchPageMock = sinon.stub();

    searchPageMock
      .withArgs(
        'propiedades?f=1&operation=2&city_id=1&type_id=Residenciales&page=1'
      )
      .resolves(sampleSearchResult());
    searchPageMock
      .withArgs(
        'propiedades?f=1&operation=2&city_id=1&type_id=Residenciales&page=2'
      )
      .resolves(sampleSearchResult());
    searchPageMock
      .withArgs(
        'propiedades?f=1&operation=2&city_id=1&type_id=Residenciales&page=3'
      )
      .resolves(sampleSearchResult());
    searchPageMock
      .withArgs(
        'propiedades?f=1&operation=2&city_id=1&type_id=Residenciales&page=4'
      )
      .resolves({});

    return searchPageMock;
  }

  function sampleSearchResult() {
    return [
      {
        title: 'RENTO CASA UN PISO CERRADA REAL DEL LLANO',
        link:
          'https://www.kwnext.mx/propiedades/rento-casa-un-piso-cerrada-real-del-llano-12'
      },
      {
        title: 'Se Rentan Oficinas al Norte de la Ciudad',
        link:
          'https://www.kwnext.mx/propiedades/se-rentan-oficinas-al-norte-de-la-ciudad-32'
      },
      {
        title: 'Renta residencia en Corceles Residencial',
        link:
          'https://www.kwnext.mx/propiedades/renta-residencia-en-corceles-residencial-89'
      },
      {
        title: 'Casa habitación ideal para oficina.',
        link:
          'https://www.kwnext.mx/propiedades/casa-habitacion-ideal-para-oficina-119'
      },
      {
        title: 'Se rentan locales en villa de seris',
        link:
          'https://www.kwnext.mx/propiedades/se-rentan-locales-en-villa-de-seris-130'
      },
      {
        title: 'Se Renta Terreno en Blvd. Colosio',
        link:
          'https://www.kwnext.mx/propiedades/se-renta-terreno-en-blvd-colosio-216'
      },
      {
        title: 'Se renta departamento.',
        link: 'https://www.kwnext.mx/propiedades/se-renta-departamento-221'
      },
      {
        title: 'Se Renta Edifico con oficinas en Col. Centenario',
        link:
          'https://www.kwnext.mx/propiedades/se-rentan-locales-para-oficina-en-col-centenario-223'
      },
      {
        title: 'Se renta oficina en Grand Kino.',
        link:
          'https://www.kwnext.mx/propiedades/se-renta-oficina-en-grand-kino-275'
      },
      {
        title: 'Se renta departamento en fraccionamiento Villas del Cortes.',
        link:
          'https://www.kwnext.mx/propiedades/se-renta-departamento-en-fraccionamiento-villas-del-cortes-280'
      },
      {
        title: 'Se renta local en Balderrama.',
        link:
          'https://www.kwnext.mx/propiedades/se-renta-local-en-balderrama-357'
      },
      {
        title: '2 Locales en Renta Ubicados en Colonia Centro',
        link:
          'https://www.kwnext.mx/propiedades/2-locales-en-renta-ubicados-en-colonia-centro-359'
      },
      {
        title: 'Casa en Renta en Real del Sevilla',
        link:
          'https://www.kwnext.mx/propiedades/casa-en-renta-en-real-del-sevilla-388'
      },
      {
        title: 'Se Renta Casa en Puerta Real',
        link:
          'https://www.kwnext.mx/propiedades/se-renta-casa-en-puerta-real-394'
      },
      {
        title: 'Se Renta Casa en Lomas Altas',
        link:
          'https://www.kwnext.mx/propiedades/se-renta-casa-en-lomas-altas-409'
      }
    ];
  }
});
