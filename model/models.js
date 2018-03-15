'use strict';
const mongoose = require('mongoose');

const CaseSchema = mongoose.Schema({
	id: String,
	clientId: String,
	dateOpened: Date,
	dateClosed: Date,
	workerUserIds: Array,
	managerUserId: String,
	groupIds: Array,
	taskIds: Array,
	updateId: String
});

const TaskSchema = mongoose.Schema({
	id: String,
	name: String,
	description: String,
	userId: String,
	caseId: String,
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
const ClientSchema = mongoose.Schema({});
const GroupSchema = mongoose.Schema({});
const UserSchema = mongoose.Schema({});
const UpdateSchema = mongoose.Schema({});
const RecordSchema = mongoose.Schema({});