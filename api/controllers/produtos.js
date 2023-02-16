const { Op } = require('sequelize');
const Produtos = require('../models/produtos');
const Categorias = require('../models/categorias');
const dbHelpers = require('../helpers/db_helpers');
const constants = require('../helpers/constants');

function getFiltro(query) {
  const filtro = {};

  if (query.nome) {
    filtro['nome'] = {
      [Op.like]: `%${query.nome}%`,
    };
  }

  if (query.descricao) {
    filtro['descricao'] = {
      [Op.like]: `%${query.descricao}%`,
    };
  }

  if (query.valor) {
    filtro['valor'] = query.valor;
  }

  if (query.ativo) {
    filtro['ativo'] = query.ativo;
  }

  if (query.id_categoria) {
    filtro['id_categoria'] = query.id_categoria;
  }

  if (query.recem_criado) {
    filtro.order = [['criado_em', 'DESC']];
  }

  if (query.mais_antigos) {
    filtro.order = [['criado_em', 'ASC']];
  }

  return filtro;
}

module.exports = {
  getAll: async (req, res) => {
    try {
      const { query } = req;

      const produtos = await Produtos.findAll({
        where: getFiltro(query),
        include: [
          {
            model: Categorias,
            required: true,
          },
        ],
      });

      if (produtos.length === 0) {
        return res.status(404).send({ message: `Produto não encontrado!` });
      }

      return res.status(200).send(produtos);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { params } = req;

      const produto = await Produtos.findByPk(params.id, {
        include: [
          {
            model: Categorias,
            required: true,
          },
        ],
      });

      if (!produto) {
        return res.status(404).send({ message: `Produto não encontrado!` });
      }

      return res.status(200).send(produto);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const { body } = req;

      const { error, value } = dbHelpers.validarBody(body, constants.PRODUTOS);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const produto = await Produtos.create({
        nome: value.nome,
        descricao: value.descricao,
        valor: value.valor,
        id_categoria: value.id_categoria,
      });

      return res.status(201).send({ message: `Produto registrado com sucesso!`, id: produto.id });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const { params, body } = req;

      const { error, value } = dbHelpers.validarBody(body, constants.PRODUTOS);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const produto = await Produtos.findByPk(params.id);

      if (!produto) {
        return res.status(404).send({ error: 'Produto não encontrado!' });
      }

      await Produtos.update(
        {
          nome: value.nome,
          descricao: value.descricao,
          valor: value.valor,
          id_categoria: value.id_categoria,
          alterado_em: new Date(),
        },
        {
          where: { id: params.id },
        },
      );

      res.status(200).send({ message: `Produto atualizado com sucesso!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const { params } = req;

      const produto = await Produtos.findByPk(params.id);

      if (!produto) {
        return res.status(404).send({ error: 'Produto não encontrado!' });
      }

      const novoEstadoProduto = dbHelpers.updateEstado(produto);

      await Produtos.update(
        {
          ativo: novoEstadoProduto.estado,
          alterado_em: new Date(),
        },
        {
          where: {
            id: params.id,
          },
        },
      );

      return res.status(200).send({
        message: `Produto ${novoEstadoProduto.novoEstado} com sucesso!`,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
