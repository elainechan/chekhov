'use strict';
/*
var TASKS = [{ "name" : "Letter", "description" : "Write a letter.", "priority" : 2, "length" : 60, "idle" : 20 },
{ "name" : "Research", "description" : "Read documents and take notes.", "priority" : 2, "length" : 90, "idle" : 10 },
{ "name" : "Retrieve records", "description" : "Go to physical location and retrieve records.", "priority" : 1, "length" : 60, "idle" : 40 },
{ "name" : "Brief client", "description" : "Call the client and update her.", "priority" : 3, "length" : 60, "idle" : 20 },
{ "name" : "Contract", "description" : "Draft a contract.", "priority" : 1, "length" : 90, "idle" : 10 },
{"name" : "Clarify contract", "description" : "Call opposing party and clarify details in the contract.", "priority" : 2, "length" : 60, "idle" : 40 }]
*/
/*
// XMLHttpRequest version
// Works on Chrome console but not Firefox
function reqListener () {
	console.log(this.responseText);
	console.log(this.getAllResponseHeaders());
  }
  
  var request = new XMLHttpRequest();
  request.addEventListener("load", reqListener);
  request.open("GET", "http://localhost:8080/tasks");
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.send();
*/
/*
var TASKS;
function listener() {
	console.log(this.responseText);
	console.log(this.getAllResponseHeaders());
}
function getTaskData() {
	httpRequest = new XMLHttpRequest();
	httpRequest.responseType = 'json';
	httpRequest.addEventListener('load', listener);
	httpRequest.open('GET', `${PORT}/tasks/`);
	httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
	httpRequest.send();
}

function createTaskTable() {
	// creates table
	var table = document.createElement('table');
	table.setAttribute('id', 'task-table');
	table.setAttribute('style', 'width: 50%');
	document.getElementById('table-area').appendChild(table);
	// creates row
	var headerRow = document.createElement('tr');
	headerRow.setAttribute('class', 'header-row');
	// creates header
	for (const prop in TASKS[0]) { // populates header with values
		let header = document.createElement('th');
		header.setAttribute('scope', 'col')
		header.innerHTML = prop;
		headerRow.appendChild(header);
	}
	table.appendChild(headerRow);
	// creates row for each task
	TASKS.forEach((item, i) => {
		let taskRow = document.createElement('tr');
		taskRow.setAttribute('class', 'task-row')
		Object.entries(item).forEach((entry, i) => { // populates each cell with data
			let cell = document.createElement('td');
			cell.innerHTML = entry[1];
			taskRow.appendChild(cell); // appends each cell to row
		});
		document.getElementById('task-table').appendChild(taskRow); // appends each row to table
	});
}
window.onload = getTaskData();
window.onload = createTaskTable();
*/
// Node version
const http = require('http');

let url = 'http://localhost:8080/tasks';
let method = 'GET';

http.createServer((req, res) => {
  const { headers, method, url } = req;
  req.setHeader('Access-Control-Allow-Origin', '*');
  req.setHeader('Access-Control-Allow-Methods', '*');
  req.setHeader('Access-Control-Allow-Headers', '*');
  req.setHeader('Content-Type', 'application/json');
  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
	body = Buffer.concat(body).toString();
	console.log(body);
    // BEGINNING OF NEW STUFF

    res.on('error', (err) => {
      console.error(err);
    });

	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // res.writeHead(200, {'Content-Type': 'application/json'})

    const resBody = { headers, method, url, body };

    res.write(JSON.stringify(resBody));
    res.end();
    // Note: the 2 lines above could be replaced with this next one:
    // res.end(JSON.stringify(resBody))

    // END OF NEW STUFF
  });
}).listen(8080);