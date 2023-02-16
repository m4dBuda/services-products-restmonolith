const { Sequelize } = require('sequelize');
const constants = require('./constants');
function calcularValorParcelas(produto, qntParcelas) {
  let juros = 0;

  switch (categoria) {
    case constants.INFORMATICA:
      juros = constants.JUROS_INFORMATICA;
      break;
    case constants.AUTOMOTIVO:
      juros = constants.JUROS_AUTOMOTIVO;
      break;
    case constants.MOVEIS:
      juros = constants.JUROS_MOVEIS;
      break;
    default:
      throw new Error('Categoria inválida');
  }

  const jurosMensais = juros / 12;
  const valorParcela = (valorProduto * jurosMensais) / (1 - Math.pow(1 + i, -numParcelas));

  return valorParcela.toFixed(2);
}

function updateEstado(item) {
  let estado;
  let novoEstado;

  if (item.ativo == 0) {
    estado = 1;
    novoEstado = 'ativado';
  }

  if (item.ativo == 1) {
    estado = 0;
    novoEstado = 'inativado';
  }

  return { estado, novoEstado };
}

module.exports = {
  updateEstado,
  calcularValorParcelas,
};
