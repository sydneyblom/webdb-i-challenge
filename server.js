const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//account router
const accountsRouter = require('./routers/accountsRouter');

server.use('/api/accounts', accountsRouter);


module.exports = server;