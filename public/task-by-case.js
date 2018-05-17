'use strict';

// (2) by the time we call this, window.location.href is `task-by-case.html?caseId=${$(this).val()}` from goToCase() in case.js (frontend)
var url_string = window.location.href;
var url = new URL(url_string);
var caseId = url.searchParams.get("caseId");
console.log(caseId);

function getTaskData(callback) { // (3) calls endpoint to get data (calling backend)
	$.getJSON(`http://localhost:8080/tasks/case/${caseId}/${localStorage.getItem('token')}`, callback);
}

function renderTasks(TASKS) { // (4) renders data in browser
	console.log(TASKS);
	if (TASKS.length === 0) {
		$('#tasks').append(`
		<h3>No data to display</h3>`);
	} // renders if no data present in response
	TASKS.forEach((item, i) => {
		$('#tasks').append(`
		<div class="task-item">
		<h3>${item.name}</h3>
		<p>Description: ${item.description}</p>
		<p>ID: ${item._id}</p>
		<p>Case ID: ${item.caseId}</p>
		</div>`);
	}); // renders data
}

getTaskData(renderTasks);