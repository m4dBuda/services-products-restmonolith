const Produtos = require('../models/produtos');
const Categorias = require('../models/categorias');
const constants = require('./constants');

const criarProdutoTeste = async () => {
  const produto = await Produtos.findOne({ where: { nome: constants.NOME_TESTE } });

  if (produto) {
    await Produtos.destroy({ where: { id: produto.id } });
  } else {
    const categoriaTeste = await criarCategoriaTeste();

    const produtoTeste = await Produtos.create({
      nome: constants.NOME_TESTE,
      descricao: constants.DESCRICAO_TESTE,
      valor: constants.VALOR_TESTE,
      id_categoria: categoriaTeste.id,
    });

    return produtoTeste;
  }
};

const criarCategoriaTeste = async () => {
  const categoria = await Categorias.findOne({ where: { nome: constants.NOME_TESTE } });

  if (categoria) {
    await Produtos.destroy({ where: { id_categoria: categoria.id } });
    await Categorias.destroy({ where: { id: categoria.id } });
  }

  const categoriaTeste = await Categorias.create({
    nome: constants.NOME_TESTE,
    criado_em: new Date(),
  });

  return categoriaTeste;
};

const removerCategoriaEProdutoTeste = async (idCategoria) => {
  const categoria = await Categorias.findOne({ where: { id: idCategoria } });

  if (categoria) {
    await Produtos.destroy({ where: { id_categoria: categoria.id } });
    await Categorias.destroy({ where: { id: categoria.id } });
  }
};

module.exports = {
  criarCategoriaTeste,
  criarProdutoTeste,
  removerCategoriaEProdutoTeste,
};
