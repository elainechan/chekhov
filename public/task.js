'use strict';

function getTaskData(callback) {
	$.getJSON(`http://localhost:8080/tasks/`, callback);
}

function createTaskTable(TASKS) {
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
window.onload = getTaskData(createTaskTable);