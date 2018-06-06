const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../task/task.model");
const Case = require("./case.model");
const caseController = require('./case.controller');
const common = require('../common/token.verification');

router.get('/all/:token', common.verifyToken, caseController.getAllCases);

router.get('/:id/:token', common.verifyToken, caseController.getCaseById);

router.get('/:id/tasks/:token', common.verifyToken, caseController.getCaseTasksById);

router.get('/client/:token', common.verifyToken, caseController.getCaseByClient);

router.post('/:token', common.verifyToken, caseController.postNewCase);

module.exports = router;