'use strict';
const mongoose = require('mongoose');

const caseSchema = mongoose.Schema({
	"id": {type: String, required: true},
	"client_id": {type: String, required: true},
	"manager": {type: String, required: true},
	"workers": {type: Array, required: true},
	"active": {type: Boolean, required: true},
	"time_logged": {type: Number, required: true},
	"est_closing": {type: Date, required: true},
	"task_ids": {type: Array, required: true},
	"client": {	
		"id": String,
		"name": String,
		"address": String,
		"phone": String,
		"case_ids": Array
	}
});

const taskSchema = mongoose.Schema({
	"id": String,
	"case_id": String,
	"client_id": String,
	"workers": Array,
	"flexibility": Array, // Enum
	"billable": Boolean,
	"priority": Number,
	"due": Date,
	"est_time_required": Number,
	"start_time": Date,
	"end_time": Date,
	"time_logged": Number,
	"subtask_ids": ["1345", "5552", "1445"], 
	"completion": Number,
	"adjournments": {}
});