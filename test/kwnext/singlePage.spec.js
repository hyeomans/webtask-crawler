const singlePage = require(path.join(
  process.cwd(),
  'src',
  'kwnext',
  'singlePage'
));

describe('SinglePage tests', () => {
  describe('When terreno is present', () => {
    it('returns expected object', () => {
      const mockPath = path.join(
        process.cwd(),
        'test',
        'kwnext',
        'singlePage.html'
      );
      const singlePageMock = readFile(mockPath, 'utf8');
      const requestPromise = sinon.stub().returns(singlePageMock);
      const sut = singlePage(requestPromise);
      const input = {
        title: 'SE RENTA CASA EN FRACCIONAMIENTO LOS VIÑEDOS',
        link:
          'https://www.kwnext.mx/propiedades/se-vende-casa-en-fraccionamiento-los-vinedos-973'
      };

      const result = sut(input);

      return result.then(r => {
        expect(r).to.eql({
          title: input.title,
          link: input.link,
          id: 'knNextId:1033781',
          precio: '$25,000 MXN',
          caracteristicas: [
            { title: 'Recámaras', value: '3' },
            { title: 'Plantas', value: '2' },
            { title: 'Baños', value: '2.0' },
            { title: 'Área del terreno', value: '228.00 m2' },
            { title: 'Área de construcción', value: '210.00 m2' }
          ]
        });
      });
    });
  });
});
