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

const TaskSchema = mongoose.Schema({});
const ClientSchema = mongoose.Schema({});
const GroupSchema = mongoose.Schema({});
const UserSchema = mongoose.Schema({});
const UpdateSchema = mongoose.Schema({});
const RecordSchema = mongoose.Schema({});