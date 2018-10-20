'use strict';
const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
	name: String,
	address: String,
	phone: String,
	email: String,
	caseIds: [{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Case'
	}],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Client', ClientSchema);