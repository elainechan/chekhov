'use strict';
const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
	name: String,
	address: String,
	caseIds: [{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Case'
	}]
});

module.exports = mongoose.model('Client', ClientSchema);