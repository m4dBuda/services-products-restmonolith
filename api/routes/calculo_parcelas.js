const express = require('express');
const calculoParcelasController = require('../controllers/calculo_parcelas');
const router = express.Router();

router.post('/', (req, res) => {
  calculoParcelasController.create(req, res);
});

module.exports = router;
