const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("./task.model");
const Case = require("../case/case.model");

const taskController = require('./task.controller');

const auth = require('../auth/token.verification');

router.get('/all/:token', auth.verifyToken, taskController.getAllTasks);

router.post('/:token', auth.verifyToken, taskController.postNewTask); // Adds verification

router.get('/user/:userId/:token', auth.verifyToken, taskController.getUserTasks);

router.get('/client/:id/:token', auth.verifyToken, taskController.getTasksByClientId);

router.get('/case/:id/:token', auth.verifyToken, taskController.getTasksByCaseId);

router.get('/user/:id/:token', auth.verifyToken, taskController.getTasksByUserId);

router.patch('/edit/:id/name/:token', auth.verifyToken, taskController.patchTaskName);

router.patch('/edit/:id/description/:token', auth.verifyToken, taskController.patchTaskDescription);

router.put('/edit/:id/case/:token', auth.verifyToken, taskController.putCaseByTaskId);

router.get('/count/:token', auth.verifyToken, taskController.getTaskCount);

router.get('/case/:caseId/count/:token', auth.verifyToken, taskController.getNumberOfTasksByCaseId);

router.delete('/delete/:id/:token', auth.verifyToken, taskController.deleteTaskById);

module.exports = router;