const Produtos = require('../models/produtos');
const Categorias = require('../models/categorias');
const dbHelpers = require('../helpers/db_helpers');
const validator = require('validator');

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;

      Produtos.belongsTo(Categorias, { as: 'categoria', foreignKey: 'idCategoria' });

      const produto = await Produtos.findOne({
        where: {
          id: body.idProduto,
          qntParcelas: body.qntParcelas,
        },
        include: {
          model: Categorias,
          as: 'categorias',
          attributes: [['nome', 'nomeCategoria']],
        },
      });

      if (produto) {
        var valorParcela = dbHelpers.calcularValorParcelas(produto, body.qntParcelas);
      }
      const valorFinal = valorParcela * qntParcelas;
      return res.status(200).send({
        message: `O  valor de cada parcela para o produto ${produto.nome}
         dividido em ${qntParcelas} é de: ${valorParcela}.
          O preço final do produto é de ${valorFinal} `,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
