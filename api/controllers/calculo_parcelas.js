const { Op } = require('sequelize');
const Categorias = require('../models/produtos');
const dbHelpers = require('../helpers/db_helpers');
const validator = require('validator');

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;
      const produto = await Produtos().findOne({
        where: {
          id: body.idProduto,
          qntParcelas: body.qntParcelas,
        },
      });

      if (produto) {
        const valorParcela = await dbHelpers.calcularValorParcelas(produto, qntParcelas);
      }

      return res.status(200).send({
        message: `O  valor das parcelas para o produto ${produto.nome} dividido em ${qntParcelas} é de: ${valorParcela}. `,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
