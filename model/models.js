'use strict';
const mongoose = require('mongoose');

const CaseSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	clientId: String,
	dateOpened: Date,
	dateClosed: Date,
	workerUserIds: Array,
	managerUserId: String,
	groupIds: Array,
	tasks:[{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
		required: true
	}],
	updateId: String
});

const TaskSchema = mongoose.Schema({
	id: String,
	name: String,
	description: String,
	userId: String,
	caseId: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Case'
	},
	deadline: Date,
	priority: Number,
	length: Number,
	lastTouched: Date,
	idle: Number,
	groupId: String,
	groupOrder: Number,
	upstreamTaskId: String,
	downstreamTaskId: String
});
const ClientSchema = mongoose.Schema({
	id: String,
	name: String,
	address: String,
	caseIds: Array
});
const GroupSchema = mongoose.Schema({
	id: String,
	taskIds: Array,
	clientId: String,
	caseId: String,
	workerUserIds: Array,
	managerUserId: String
});
const UserSchema = mongoose.Schema({
	id: String,
	role: String,
	billable: Number,
	buffer: Number,
	taskIds: Array,
	caseIds: Array,
	clientIds: Array,
	groupIds: Array
});
const UpdateSchema = mongoose.Schema({
	id: String,
	date: Date,
	content: String,
	userId: String
});
const RecordSchema = mongoose.Schema({
	id: String,
	date: Date,
	hours: Number,
	taskId: String,
	userId: String,
	caseId: String
});