const express = require('express');
const categoriasController = require('../controllers/categorias');
const router = express.Router();

router.get('/', (req, res) => {
  categoriasController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  categoriasController.getById(req, res);
});

router.post('/', (req, res) => {
  categoriasController.create(req, res);
});

router.put('/:id', (req, res) => {
  categoriasController.update(req, res);
});

router.delete('/:id', (req, res) => {
  categoriasController.delete(req, res);
});

module.exports = router;
