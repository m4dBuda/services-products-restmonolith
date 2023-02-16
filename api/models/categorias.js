const { Model, DataTypes } = require('sequelize');
const constants = require('../helpers/constants');
const helpers = require('../helpers/helpers');

class Categorias extends Model {}

Categorias.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    modelName: constants.CATEGORIAS,
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'alterado_em',
  },
);

module.exports = Categorias;
