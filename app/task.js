var TASKS = [{ "name" : "Letter", "description" : "Write a letter.", "priority" : 2, "length" : 60, "idle" : 20 },
{ "name" : "Research", "description" : "Read documents and take notes.", "priority" : 2, "length" : 90, "idle" : 10 },
{ "name" : "Retrieve records", "description" : "Go to physical location and retrieve records.", "priority" : 1, "length" : 60, "idle" : 40 },
{ "name" : "Brief client", "description" : "Call the client and update her.", "priority" : 3, "length" : 60, "idle" : 20 },
{ "name" : "Contract", "description" : "Draft a contract.", "priority" : 1, "length" : 90, "idle" : 10 },
{"name" : "Clarify contract", "description" : "Call opposing party and clarify details in the contract.", "priority" : 2, "length" : 60, "idle" : 40 }]

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
window.onload = createTaskTable();