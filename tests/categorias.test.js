const testHelpers = require('../api/helpers/test_helpers');
const constants = require('../api/helpers/constants');
const server = require('../server');
const request = require('supertest');

const createCategoria = async (categoria) => {
  const response = await request(server).post('/categorias').send(categoria);
  return response;
};

const getCategoriaById = async (id) => {
  const response = await request(server).get(`/categorias/${id}`);
  return response;
};

const getCategorias = async (filtro) => {
  let url = `/categorias`;
  if (filtro) {
    url = `/categorias?${filtro}`;
  }
  const response = await request(server).get(url);
  return response;
};

const updateCategoria = async (id, categoria) => {
  const response = await request(server).put(`/categorias/${id}`).send(categoria);
  return response;
};

const deleteCategoria = async (id) => {
  const response = await request(server).delete(`/categorias/${id}`);
  return response;
};

describe('Categorias API', () => {
  let idCategoria;

  describe('Criar categoria', () => {
    test('Deve criar uma nova categoria', async () => {
      const categoria = {
        nome: constants.NOME_TESTE,
      };
      const response = await createCategoria(categoria);
      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      idCategoria = response.body.id;
    });
  });

  describe('Buscar categoria', () => {
    test('Deve buscar uma categoria específica pelo ID e encontrar um objeto', async () => {
      const response = await getCategoriaById(idCategoria);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(idCategoria);
    });

    test('Deve buscar uma lista de categorias e encontrar um array', async () => {
      const response = await getCategorias();
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('Deve retornar mensagem "Categoria não encontrada!"', async () => {
      const filtro = `nome=Inexistente`;
      const response = await getCategorias(filtro);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Categoria não encontrada!');
    });
  });

  describe('Atualizar categoria', () => {
    test('Deve atualizar uma categoria', async () => {
      const categoriaUpdate = {
        nome: constants.NOME_TESTE_UPDATE,
      };
      const response = await updateCategoria(idCategoria, categoriaUpdate);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Categoria atualizada com sucesso!');
    });
  });

  describe('Inativar uma categoria', () => {
    test('Deve inativar uma categoria', async () => {
      const response = await deleteCategoria(idCategoria);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Categoria inativado com sucesso!');
    });

    afterAll(async () => {
      await testHelpers.removerCategoriaEProdutoTeste(idCategoria);
    });
  });
});
