const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../model/task");
const Case = require("../model/case")
;

router.get('/', (req, res, next) => {
	Case.find()
	.select('task _id')
	.populate('task')
	.exec();
});