const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("./task.model");
const Case = require("../case/case.model");

const taskController = require('./task.controller');

const common = require('../common/token.verification');

router.get('/all/:token', common.verifyToken, taskController.getAllTasks);

router.post('/:token', common.verifyToken, taskController.postNewTask); // Adds verification

router.get('/client/:id/:token', common.verifyToken, taskController.getTasksByClientId);

router.get('/case/:id/:token', common.verifyToken, taskController.getTasksByCaseId);

router.get('/user/:id/:token', common.verifyToken, taskController.getTasksByUserId);

router.patch('/edit/:id/name/:token', common.verifyToken, taskController.patchTaskName);

router.patch('/edit/:id/description/:token', common.verifyToken, taskController.patchTaskDescription);

router.put('/edit/:id/case/:token', common.verifyToken, taskController.putCaseByTaskId);

router.get('/count/:token', common.verifyToken, taskController.getTaskCount);

router.get('/case/:caseId/count/:token', common.verifyToken, taskController.getNumberOfTasksByCaseId);

router.delete('/delete/:id/:token', common.verifyToken, taskController.deleteTaskById);

module.exports = router;