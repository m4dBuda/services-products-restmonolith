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
    modelName: constants.CATEGORIAS,
  },
);

module.exports = Categorias;
