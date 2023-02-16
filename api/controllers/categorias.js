const { Op } = require('sequelize');
const Categorias = require('../models/Categorias');
const dbHelpers = require('../helpers/db_helpers');
const validator = require('validator');

function getFiltro(query) {
  const filtro = {};

  if (query.nome) {
    filtro.where['nome'] = {
      [Op.like]: `%${query.nome}%`,
    };
  }

  if (query.ativo) {
    filtro.where['ativo'] = query.ativo;
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

      const categorias = await Categorias().findAll(getFiltro(query));

      return res
        .status(200)
        .send(categorias || { message: `Categoria de produto não encontrada!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { params } = req;

      const categoria = await Categorias().findOne({
        where: {
          id: params.id,
        },
      });

      return res.status(200).send(categoria || { message: `Categoria de produto não encontrada!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const { body } = req;

      if (!validator.isLength(body.nome, { min: 4, max: 40 })) {
        return res
          .status(400)
          .send({ message: 'O nome da categoria deve conter no mínimo 4 caracteres!' });
      }

      const categoria = await Categorias().create({
        nome: body.nome,
      });

      return res
        .status(200)
        .send({ message: `Nova categoria de produto registrada com sucesso!`, id: categoria.id });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const { params, body } = req;

      const categorias = await Categorias().findOne({
        where: {
          id: params.id,
        },
      });

      if (!categorias) {
        return res.status(400).send({
          error: 'A categoria que você está tentando atualizar não existe',
        });
      }

      await Categorias().update(
        {
          nome: body.nome,
          alterado_em: new Date(),
        },
        {
          where: { id: params.id },
        },
      );

      res.status(200).send({ message: `Categoria atualizada com sucesso!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const { params, body } = req;

      const categorias = await Categorias().findOne({
        where: { id: params.id },
      });

      if (!categorias) {
        return res.status(400).send({ error: 'Categoria de produto não encontrada!' });
      }

      if (categorias) {
        var novoEstadocategorias = dbHelpers.updateEstado(categorias);
      }

      await Categorias().update(
        {
          ativo: novoEstadocategorias.estado,
          alterado_em: new Date(),
        },
        {
          where: {
            id: params.id,
          },
        },
      );

      return res.status(200).send({
        message: `categorias ${categorias.nome} ${novoEstadocategorias.novoEstado} com sucesso`,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
