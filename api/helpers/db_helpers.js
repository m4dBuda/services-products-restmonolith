const constants = require('./constants');
const Joi = require('joi');
function calcularValorParcelas(produto, qnt_parcelas) {
  let juros = 0;

  switch (produto.categoria.nome) {
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

  const valorParcela =
    (produto.valor * jurosMensais) / (1 - Math.pow(1 + jurosMensais, -qnt_parcelas));

  return Number(valorParcela.toFixed(2));
}

function updateEstado(item) {
  let estado;
  let novoEstado;

  if (item.ativo === false) {
    estado = true;
    novoEstado = 'ativado';
  }

  if (item.ativo === true) {
    estado = false;
    novoEstado = 'inativado';
  }

  return { estado, novoEstado };
}

const validarBody = (body, nomeTable) => {
  let schema;

  switch (nomeTable) {
    case constants.PRODUTOS:
      schema = Joi.object({
        nome: Joi.string().min(4).max(255).required(),
        descricao: Joi.string().min(4).max(2000).required(),
        valor: Joi.number().required(),
        id_categoria: Joi.number().required(),
      });
      break;

    case constants.CATEGORIAS:
      schema = Joi.object({
        nome: Joi.string().min(4).max(40).required(),
      });
      break;

    default:
      break;
  }

  return schema.validate(body);
};

module.exports = {
  validarBody,

  updateEstado,

  calcularValorParcelas,
};
