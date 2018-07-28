const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../task/task.model");
const Case = require("../case/case.model");
const Client = require("./client.model")
const clientController = require('./client.controller');
const common = require('../common/token.verification');

router.get('/all/:token', common.verifyToken, clientController.getAllClients);

router.get('/:id/:token', common.verifyToken, clientController.getClientById);

router.get('/count/:token', common.verifyToken, clientController.getClientCount);

router.post('/:token', common.verifyToken, clientController.postNewClient);

router.delete('/delete/:id/:token', common.verifyToken, clientController.deleteClientById);

router.patch('/edit/:id/name/:token', common.verifyToken, clientController.editClientName);

router.patch('/edit/:id/address/:token', common.verifyToken, clientController.editClientAddress);

module.exports = router;