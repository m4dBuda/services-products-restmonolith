const Produtos = require('../models/produtos');
const Categorias = require('../models/categorias');
const dbHelpers = require('../helpers/db_helpers');

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;

      const produto = await Produtos.findOne({
        where: {
          id: body.id_produto,
        },
        include: [
          {
            model: Categorias,
            required: true,
          },
        ],
      });

      if (produto) {
        var valorParcela = dbHelpers.calcularValorParcelas(produto, body.qnt_parcelas);
      }

      const valorFinal = valorParcela * body.qnt_parcelas;

      return res.status(200).send({
        message: `Caso dividido em ${body.qnt_parcelas}, o valor de cada parcela será de: ${valorParcela}, e o valor final do produto de ${valorFinal}.`,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
