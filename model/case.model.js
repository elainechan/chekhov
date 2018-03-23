'use strict';
const mongoose = require('mongoose');

const CaseSchema = mongoose.Schema({
	name: String,
	dateOpened: Date,
	dateClosed: Date,
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	userIds: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	groupIds: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}],
	tasks: [{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	}],
	updateId: String
});

module.exports = mongoose.model('Case', CaseSchema, 'case');