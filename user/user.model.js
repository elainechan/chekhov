'use strict';
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	role: String,
	billable: Number,
	buffer: Number,
	taskIds: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	}],
	caseIds: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Case'
	}],
	clientIds: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	}]
});
module.exports = mongoose.model('User', UserSchema, 'user');