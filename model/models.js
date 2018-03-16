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
const ClientSchema = mongoose.Schema({

});
const GroupSchema = mongoose.Schema({});
const UserSchema = mongoose.Schema({});
const UpdateSchema = mongoose.Schema({});
const RecordSchema = mongoose.Schema({});

db.Case.insertOne({
	name: "Valen v. Conner",
	dateOpened: "2018-01-20T16:00:00Z",
	dateClosed: ""
})
{
	clientId: "",
	workerUserIds: [],
	managerUserId: "",
	groupIds: [],
	taskIds: [],
	updateId: ""
}
/*
3 Cases
2 tasks for each
*/
{
	name: "Drafting",
	description: "Writing a letter",
	userId: String,
	caseId: "5aac10849a2d87c386031aaa",
	deadline: "2017-12-12T16:00:00Z",
	priority: 3,
	length: 60,
	lastTouched: "2017-10-12T16:00:00Z",
	idle: ,
	groupId: String,
	groupOrder: Number,
	upstreamTaskId: String,
	downstreamTaskId: String
}