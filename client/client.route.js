const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../task/task.model");
const Case = require("../case/case.model");
const Client = require("./client.model")
const clientController = require('./client.controller');
const auth = require('../auth/token.verification');

// rule of thumb: with routes using the same method ('get'), the more wild cards there are, put lower down; the more "specific" the route is (parameters that aren't wildcards), put higher up

router.get('/all/:token', auth.verifyToken, clientController.getAllClients);

router.get('/count/:token', auth.verifyToken, clientController.getClientCount);

router.get('/user/:userId/:token', auth.verifyToken, clientController.getUserClients);

router.get('/:id/:token', auth.verifyToken, clientController.getClientById);

router.post('/:token', auth.verifyToken, clientController.postNewClient);

router.delete('/delete/:id/:token', auth.verifyToken, clientController.deleteClientById);

router.patch('/edit/:id/name/:token', auth.verifyToken, clientController.editClientName);

router.patch('/edit/:id/address/:token', auth.verifyToken, clientController.editClientAddress);

module.exports = router;