'use strict';
const mongoose = require('mongoose');
const TaskSchema = mongoose.Schema({
	name: String,
	description: String,
	dateOpened: Date,
	deadline: Date,
	priority: Number,
	length: Number,
	lastTouched: Date,
	idle: Number,
	userId: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	caseId: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Case'
	},
	clientId: {
		type:  mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	groupId: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	},
	groupOrder: Number,
	upstreamTaskId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	},
	downstreamTaskId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	}
});

module.exports = mongoose.model('Task', TaskSchema, 'task'); // what's the third 'task' doing?????