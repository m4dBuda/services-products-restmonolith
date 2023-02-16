const testHelpers = require('../api/helpers/test_helpers');
const constants = require('../api/helpers/constants');
const server = require('../server');
const request = require('supertest');

const createProduto = async (product) => {
  const response = await request(server).post('/produtos').send(product);
  return response;
};

const getProdutoById = async (id) => {
  const response = await request(server).get(`/produtos/${id}`);
  return response;
};

const getProdutos = async (filtro) => {
  let url = `/produtos`;
  if (filtro) {
    url = `/produtos?${filtro}`;
  }
  const response = await request(server).get(url);
  return response;
};

const updateProduto = async (id, product) => {
  const response = await request(server).put(`/produtos/${id}`).send(product);
  return response;
};

const deleteProduto = async (id) => {
  const response = await request(server).delete(`/produtos/${id}`);
  return response;
};

describe('Produtos API', () => {
  let categoriaTeste;
  let idProduto;

  beforeAll(async () => {
    categoriaTeste = await testHelpers.criarCategoriaTeste();
  });

  describe('Criar produto', () => {
    test('Deve criar um novo produto', async () => {
      const produto = {
        nome: constants.NOME_TESTE,
        descricao: constants.DESCRICAO_TESTE,
        valor: constants.VALOR_TESTE,
        id_categoria: categoriaTeste.id,
      };
      const response = await createProduto(produto);
      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      idProduto = response.body.id;
    });
  });

  describe('Buscar produto', () => {
    test('Deve buscar um produto específico pelo ID e encontrar um objeto', async () => {
      const response = await getProdutoById(idProduto);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(idProduto);
    });

    test('Deve buscar uma lista de produtos e encontrar um array', async () => {
      const response = await getProdutos();
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('Deve retornar mensagem "Produto não encontrado!"', async () => {
      const filtro = `nome=Inexistente`;
      const response = await getProdutos(filtro);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Produto não encontrado!');
    });
  });

  describe('Atualizar produto', () => {
    test('Deve atualizar um produto', async () => {
      const produtoUpdate = {
        nome: constants.NOME_TESTE_UPDATE,
        descricao: constants.DESCRICAO_TESTE,
        valor: constants.VALOR_TESTE,
        id_categoria: categoriaTeste.id,
      };
      const response = await updateProduto(idProduto, produtoUpdate);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Produto atualizado com sucesso!');
    });
  });

  describe('Inativar um produto', () => {
    test('Deve inativar um produto', async () => {
      const response = await deleteProduto(idProduto);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Produto inativado com sucesso!');
    });

    afterAll(async () => {
      await testHelpers.removerCategoriaEProdutoTeste(categoriaTeste.id);
    });
  });
});
