const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../task/task.model");
const Case = require("./case.model");
const caseController = require('./case.controller');
const auth = require('../auth/token.verification');

router.get('/all/:token', auth.verifyToken, caseController.getAllCases);

router.get('/count/:token', auth.verifyToken, caseController.getCaseCount);

router.get('/user/:userId/:token', auth.verifyToken, caseController.getUserCases);

router.get('/:id/:token', auth.verifyToken, caseController.getCaseById);

router.get('/:name/:token', auth.verifyToken, caseController.getCaseByName);

router.get('/:userId/:token', auth.verifyToken, caseController.getUserCases);

router.get('/:id/tasks/:token', auth.verifyToken, caseController.getCaseTasksById);

router.get('/client/:clientId/:token', auth.verifyToken, caseController.getCaseByClient);

router.post('/:token', auth.verifyToken, caseController.postNewCase);

router.delete('/delete/:id/:token', auth.verifyToken, caseController.deleteCaseById);

router.put('/edit/:id/client/:token', auth.verifyToken, caseController.putClientByCaseId);

router.patch('/edit/:id/name/:token', auth.verifyToken, caseController.patchCaseName);

module.exports = router;