const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../task/task.model");
const Case = require("./case.model");
const caseController = require('./case.controller');

router.get('/', (req, res, next) => {
	Case.find()
	.select('task _id')
	.populate('task')
	.exec();
});

router.get('/all', caseController.getAllCases);

router.get('/:id', caseController.getCaseById);

router.get('/:id/tasks', caseController.getCaseTasksById);

router.post('/', caseController.postNewCase);

module.exports = router;