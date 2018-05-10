const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("./task.model");
const Case = require("../case/case.model");

const taskController = require('./task.controller');

const common = require('../common/token.verification');

router.get('/', (req, res, next) => {
	Task.find()
	.select('case _id')
	.populate('case')
	.exec();
});

router.get('/all/:token', common.verifyToken, taskController.getAllTasks);

router.post('/:token', common.verifyToken, taskController.postNewTask); // Adds verification

router.get('/client/:id/:token', common.verifyToken, taskController.getTasksByClientId);

router.get('/case/:id/:token', common.verifyToken, taskController.getTasksByCaseId);

router.get('/user/:id/:token', common.verifyToken, taskController.getTasksByUserId);

module.exports = router;