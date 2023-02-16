const { Sequelize } = require('sequelize');
const config = require('../../config.json');

/**
 * Função usada para abrir conexão com o banco de dados.
 */

const getSequelize = () => {
  return new Sequelize(config.dev.database, config.dev.username, config.dev.password, {
    host: config.dev.host,
    dialect: 'postgres',
  });
};

/**
 * Função usada para abrir conexão com o banco de dados de testes.
 */

const getSequelizeTeste = () => {
  return new Sequelize(config.teste.database, config.teste.username, config.teste.password, {
    host: config.teste.host,
    dialect: 'postgres',
  });
};

module.exports = {
  getSequelize,
  getSequelizeTeste,
};
