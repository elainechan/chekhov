const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../model/task");
const Case = require("../model/case")
;

router.get('/', (req, res, next) => {
	Task.find()
	.select('case _id')
	.populate('case')
	.exec();
});