const { Op } = require('sequelize');
const Categorias = require('../models/categorias');
const dbHelpers = require('../helpers/db_helpers');
const Joi = require('joi');

function getFiltro(query) {
  const filtro = {
    where: {},
  };

  if (query.nome) {
    filtro.where['nome'] = {
      [Op.like]: `%${query.nome}%`,
    };
  }

  if (query.ativo) {
    filtro.where['ativo'] = query.ativo;
  }

  if (query.recem_criado) {
    filtro.order = [['criado_em', 'DESC']];
  }

  return filtro;
}

const validateCategoria = (body) => {
  const schema = Joi.object({
    nome: Joi.string().min(4).max(40).required(),
  });

  return schema.validate(body);
};

module.exports = {
  getAll: async (req, res) => {
    try {
      const { query } = req;

      const categorias = await Categorias.findAll(getFiltro(query));

      return res.status(200).send(categorias || { message: `Categoria não encontrada!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { params } = req;

      const categoria = await Categorias.findByPk(params.id);

      return res.status(200).send(categoria || { message: `Categoria não encontrada!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const { body } = req;

      const { error, value } = validateCategoria(body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const categoria = await Categorias.create({
        nome: value.nome,
        criado_em: new Date(),
      });

      return res
        .status(200)
        .send({ message: `Categoria registrada com sucesso!`, id: categoria.id });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const { params, body } = req;

      const { error, value } = validateCategoria(body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const categoria = await Categorias.findByPk(params.id);

      if (!categoria) {
        return res.status(400).send({
          error: 'Categoria não encontrada',
        });
      }

      await Categorias.update(
        {
          nome: value.nome,
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
      const { params } = req;

      const categoria = await Categorias.findByPk(params.id);

      if (!categoria) {
        return res.status(404).send({ error: 'Categoria não encontrada!' });
      }

      const novoEstadoCategorias = dbHelpers.updateEstado(categoria);

      await Categorias.update(
        {
          ativo: novoEstadoCategorias.estado,
          alterado_em: new Date(),
        },
        {
          where: {
            id: params.id,
          },
        },
      );

      return res.status(200).send({
        message: `Categoria ${categoria.nome} ${novoEstadoCategorias.novoEstado} com sucesso`,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
