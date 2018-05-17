'use strict';

var url_string = window.location.href;
var url = new URL(url_string);
var clientId = url.searchParams.get("clientId");
console.log(clientId);

function getTasksByClient(callback) {
	$.getJSON(`http://localhost:8080/tasks/client/${clientId}/${localStorage.getItem('token')}`, callback)
}

function renderTasksByClient(TASKS) {
	console.log(TASKS);
	if (TASKS.length === 0) {
		console.log('No data to display');
		$('#tasks').append(`<h3>No data to display</h3>`);
	}

	TASKS.forEach((item, i) => {
		$('#tasks').append(`<div class="task-item">
		<h3>${item.name}</h3>
		<p>Description: ${item.description}</p>
		<p>ID: ${item._id}</p>
		<p>Client ID: ${item.clientId}</p>
		</div`)
	});
}

getTasksByClient(renderTasksByClient);