const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("./task.model");
const Case = require("../case/case.model");

const taskController = require('./task.controller');

router.get('/', (req, res, next) => {
	Task.find()
	.select('case _id')
	.populate('case')
	.exec();
});

router.get('/all', taskController.getAllTasks);

router.post('/', taskController.postNewTask);

module.exports = router;