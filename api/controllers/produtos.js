const { Op } = require('sequelize');
const Produtos = require('../models/produtos');
const dbHelpers = require('../helpers/db_helpers');
const validator = require('validator');

function getFiltro(query) {
  const filtro = {};

  if (query.nome) {
    filtro.where['nome'] = {
      [Op.like]: `%${query.nome}%`,
    };
  }

  if (query.descricao) {
    filtro.where['descricao'] = query.descricao;
  }

  if (query.valor) {
    filtro.where['valor'] = query.valor;
  }

  if (query.ativo) {
    filtro.where['ativo'] = query.ativo;
  }

  if (query.idCategoria) {
    filtro.where['idCategoria'] = {
      [Op.eq]: query.idCategoria,
    };
  }
  if (query.recem_criado) {
    filtro.order = [['criado_por', 'DESC']];
  }

  return filtro;
}

module.exports = {
  getAll: async (req, res) => {
    try {
      const { query } = req;

      const produtos = await Produtos().findAll(getFiltro(query));

      return res.status(200).send(produtos || { message: `Produto não encontrado!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { params } = req;

      const produto = await Produtos().findOne({
        where: {
          id: params.id,
        },
      });

      return res.status(200).send(produto || { message: `Produto não encontrado!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const { body } = req;

      if (!validator.isLength(body.nome, { min: 8, max: 40 })) {
        return res.status(400).send({ message: 'O nome do produto é inválido' });
      }

      if (!validator.isLength(body.descricao, { min: 10, max: 255 })) {
        return res
          .status(400)
          .send({ message: 'É necessário informar uma descrição para o produto criado' });
      }

      const produto = await Produtos().create({
        nome: body.nome,
        descricao: body.descricao,
        valor: body.valor,
        idCategoria: body.idCategoria,
      });

      return res.status(200).send({ message: `Produto registrado com sucesso!`, id: produto.id });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const { params, body } = req;

      const produto = await Produtos().findOne({
        where: {
          id: params.id,
        },
      });

      if (!produto) {
        return res.status(400).send({ error: 'Produto não encontrado' });
      }

      await Produtos().update(
        {
          nome: body.nome,
          descricao: body.descricao,
          valor: body.valor,
          idCategoria: body.idCategoria,
          alterado_em: new Date(),
        },
        {
          where: { id: params.id },
        },
      );

      res.status(200).send({ message: `Produto editado com sucesso!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const { params, body } = req;

      const produto = await Produtos().findOne({
        where: { id: params.id },
      });

      if (!produto) {
        return res.status(400).send({ error: 'Produto não encontrado' });
      }

      if (produto) {
        var novoEstadoProduto = dbHelpers.updateEstado(produto);
      }

      await Produtos().update(
        {
          ativo: novoEstadoProduto.estado,
          alterado_em: new Date(),
          id_usuario: body.id_usuario,
        },
        {
          where: {
            id: params.id,
          },
        },
      );

      return res.status(200).send({
        message: `Produto ${produto.nome} ${novoEstadoProduto.novoEstado} com sucesso`,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
