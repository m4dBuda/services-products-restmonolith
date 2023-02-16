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
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    alterado_em: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize: helpers.getSequelize(),
    modelName: constants.PRODUTOS,
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'alterado_em',
  },
);

module.exports = Produtos;
