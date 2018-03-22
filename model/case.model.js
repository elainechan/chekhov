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
	tasks: { 
		type: mongoose.Schema.Types.Array,
		ref: 'WHAT????',
		required: true
	},
	updateId: String
});

CaseSchema.virtual('/case-tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'case'
});

module.exports = mongoose.model('Case', CaseSchema, 'case');