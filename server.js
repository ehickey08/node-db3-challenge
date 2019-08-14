const express = require('express');

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use('/api/schemes', SchemeRouter);

server.use(errorHandler)

function errorHandler (error, req, res, next) {
    console.log(error.err || error.message)
    res.status(error.status).json({message: error.message });
}
module.exports = server;