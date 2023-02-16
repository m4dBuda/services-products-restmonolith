const express = require('express');
const http = require('http');
const morgan = require('morgan');

const server = express();
server.use(express.json());
server.use(morgan('dev'));
const httpServer = http.createServer(server);
httpServer.listen(13700);

const produtosRoutes = require('./api/routes/produtos');
const categoriasRoutes = require('./api/routes/categorias');
const calculoParcelasRoutes = require('./api/routes/calculo_parcelas');

server.use('/calculo_parcelas', calculoParcelasRoutes);
server.use('/produtos', produtosRoutes);
server.use('/categorias', categoriasRoutes);

server.use((res, next) => {
  const error = Error('Rota não encontrada.');
  error.status = 404;
  return res.status(error.status).send({ error: error.message });
  next(error);
});

server.use((error, res) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = server;
