const testHelpers = require('../api/helpers/test_helpers');
const constants = require('../api/helpers/constants');
const server = require('../server');
const request = require('supertest');

const createCalculoParcelas = async (calculoParcelas) => {
  const response = await request(server).post('/calculo_parcelas').send(calculoParcelas);
  return response;
};

describe('Calculos API', () => {
  let idProduto;
  let idCategoria;
  let qntParcelas = 10;

  beforeAll(async () => {
    categoriaTeste = await testHelpers.criarCategoriaTeste();
    idCategoria = categoriaTeste.id;
    produtoTeste = await testHelpers.criarProdutoTeste();
    idProduto = produtoTeste.id;
  });

  describe('Cálculos API', () => {
    test('Deve calcular o valor das parcelas e o valor final do produto corretamente', async () => {
      const calculoParcelas = {
        id_produto: idProduto,
        qnt_parcelas: qntParcelas,
      };
      const response = await createCalculoParcelas(calculoParcelas);
      expect(response.status).toBe(200);

      const valorParcela = response.body.message.match(/de: (\d+\.\d+)/)[1];
      const valorFinal = response.body.message.match(
        /final do produto de (\d+(?:\.\d+)?)(?:\D|$)/,
      )[1];

      const respostaEsperada = {
        valorParcela: parseFloat(
          (produtoTeste.valor * constants.JUROS_TESTE) /
            (1 - Math.pow(1 + constants.JUROS_TESTE, -qntParcelas)),
        ).toFixed(2),
        valorFinal: parseFloat(valorParcela * qntParcelas).toFixed(2),
      };

      expect(valorParcela).toBe(respostaEsperada.valorParcela);
      expect(valorFinal).toBe(respostaEsperada.valorFinal);
    });

    afterAll(async () => {
      await testHelpers.removerCategoriaEProdutoTeste(idCategoria);
    });
  });
});
