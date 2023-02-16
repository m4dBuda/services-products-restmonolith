const { Model, DataTypes } = require('sequelize');
const constants = require('../helpers/constants');
const helpers = require('../helpers/helpers');

class Produtos extends Model {}

Produtos.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true,
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    criado_em: {
      type: DataTypes.STRING,
      allowNull: false,
      default: new Date(),
    },
    alterado_em: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null,
    },
  },
  {
    sequelize: helpers.getSequelize(),
    modelName: constants.PRODUTOS,
  },
);

module.exports = Produtos;
