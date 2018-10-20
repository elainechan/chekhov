#!/bin/bash
# Shell script for inserting dummy data.
db.createCollection("case")
db.case.insertMany(
	[
		{
			name: "Valen v. Conner",
			dateOpened: "2018-01-20T16:00:00Z",
			dateClosed: ""
		},
		{
			name: "Jones v. Williams",
			dateOpened: "2017-11-17T10:00:00Z",
			dateClosed: ""
		},
		{
			name: "Lehman v. Kahn",
			dateOpened: "2017-05-24T09:00:00Z",
			dateClosed: ""
		}
	]
)
db.createCollection("task")
db.task.insertMany(
	[
		{
			name: "Letter",
			description: "Write a letter.",
			priority: 2,
			length: 60,
			idle: 20	
		},
		{
			name: "Research",
			description: "Read documents and take notes.",
			priority: 2,
			length: 90,
			idle: 10	
		},
		{
			name: "Retrieve records",
			description: "Go to physical location and retrieve records.",
			priority: 1,
			length: 60,
			idle: 40	
		},
		{
			name: "Brief client",
			description: "Call the client and update her.",
			priority: 3,
			length: 60,
			idle: 20	
		},
		{
			name: "Contract",
			description: "Draft a contract.",
			priority: 1,
			length: 90,
			idle: 10	
		},
		{
			name: "Clarify contract",
			description: "Call opposing party and clarify details in the contract.",
			priority: 2,
			length: 60,
			idle: 40	
		}
	]
)
db.createCollection("user")
db.user.insertMany(
	[
		{
			name: "Alice",
			role: "attorney",
			billable: 5,
			buffer: 3
		},
		{
			name: "Bob",
			role: "attorney",
			billable: 5,
			buffer: 3
		},
		{
			name: "Carol",
			role: "attorney",
			billable: 5,
			buffer: 3
		}
	]
)
db.task.updateMany( {}, { $set: { case_id: "5aadd62ec56c1b93ba56bc3c" }, } )

{ "_id" : ObjectId("5aadd62ec56c1b93ba56bc3c"), "name" : "Valen v. Conner", "dateOpened" : "2018-01-20T16:00:00Z", "dateClosed" : "" }
{ "_id" : ObjectId("5aadd62ec56c1b93ba56bc3d"), "name" : "Jones v. Williams", "dateOpened" : "2017-11-17T10:00:00Z", "dateClosed" : "" }
{ "_id" : ObjectId("5aadd62ec56c1b93ba56bc3e"), "name" : "Lehman v. Kahn", "dateOpened" : "2017-05-24T09:00:00Z", "dateClosed" : "" }
