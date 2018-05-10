'use strict';
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: String,
	password: String,
	role: String,
	billable: Number,
	buffer: Number,
	taskIds: Array,
	caseIds: Array,
	clientIds: Array,
	groupIds: Array
});
module.exports = mongoose.model('User', UserSchema, 'user');