const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const authRouter = require('./private-routes/auth-router.js');
const usersRouter = require('./users/users-router.js');
const ticketsRouter = require('./tickets/tickets-router.js');
const restricted = require('./private-routes/restricted-middleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', authRouter);
server.use('/users', restricted, usersRouter);
server.use('/tickets', restricted, ticketsRouter);

 module.exports = server;
