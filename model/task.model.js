'use strict';
const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	description: String,
	userId: String,
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

module.exports = mongoose.model('Task', TaskSchema, 'task'); // what's the third 'task' doing?????