const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../task/task.model");
const Case = require("../case/case.model");
const Client = require("./client.model")
const clientController = require('./client.controller');

router.get('/all', clientController.getAllClients);

router.post('/', clientController.postNewClient);

module.exports = router;