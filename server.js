const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//account router
const accountsRouter = require('./routers/accountsRouter');

server.get("/api/accounts", (req, res) => {
    db("accounts")
    .then(accounts => res.json(accounts))
    .catch(error => res.status(500).json({message: "Failed to get accounts"}))
})


module.exports = server;