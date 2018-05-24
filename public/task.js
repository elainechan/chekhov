'use strict';

function getTaskData(callback) {
	$.getJSON(`http://localhost:8080/tasks/all/${localStorage.getItem('token')}`, callback);
}

// TODO: make new .html page for getTasksByCaseId

function renderTasks(TASKS) {
	console.log(TASKS);
	TASKS.forEach((item, i) => {
		$('#tasks').append(`
		<div class="task-item task-list">
		<div>
		<h3>${item.name}</h3>
		</div>
		<div>
		<p>Description: ${item.description}</p>
		</div>
		<div>
		<p>ID: ${item._id}</p>
		</div>
		<div>
		<p>Case ID: ${item.caseId}</p>
		</div>
		</div>`);
	});
}

function toggleListView() {
// step 1: get click listener
	$(".list-button").on("click", function() {
		// remove one class and add another
		$(".task-item").removeClass("task-card").addClass("task-list");
	});
}

function toggleCardView() {
	$(".card-button").on("click", function() {
		// remove one class and add another
		$(".task-item").removeClass("task-list").addClass("task-card");
	});
}

getTaskData(renderTasks);
toggleCardView();
toggleListView();