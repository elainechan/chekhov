'use strict';

function getTaskData(callback) {
	$.getJSON(`http://localhost:8080/tasks/all/${localStorage.getItem('token')}`, callback);
}

// TODO: make new .html page for getTasksByCaseId

function renderTasks(TASKS) {
	TASKS.forEach((item, i) => {
		$('#tasks').append(`
		<div class="task-list task-item">
		<div>
		<input id="task-name-input" data-id="${item._id}" value="${item.name}" />
		</div>
		<div>
		<input id="task-description-input" value="${item.description}" />
		<div>
		<p>Case ID: ${item.caseId}</p>
		</div>
		</div>`);
	});
}

function toggleListView() {
	// step 1: get click listener
	$(".list-button").on("click", function () {
		// remove one class and add another
		$(".task-item").removeClass("task-card").addClass("task-list");
	});
}

function toggleCardView() {
	$(".card-button").on("click", function () {
		// remove one class and add another
		$(".task-item").removeClass("task-list").addClass("task-card");
	});
}

function addTaskEditHandler() {
	$('body').on('blur', '#task-name-input', (e) => {
		console.log(e.target.value);
		// connect to the route
		let taskId = $(this).attr("data-id")
		$.ajax({
			url: `http://localhost:8080/task/edit/${taskId}/${localStorage.getItem('token')}`,
			data: {
				name: e.target.value
			},
			type: 'PATCH',
			contentType: 'application/json',
			success: (anything) => {
				console.log(anything);
			}
		});
	$('body').on('blur', '#task-description-input', (e) => {
		console.log(e.target.value);
	});
});
}

/*
access database from here

e.target.value
mongodb .update
data.save()

*/

getTaskData(renderTasks);
toggleCardView();
toggleListView();
$("#tasks").sortable();
$("#tasks").disableSelection();
addTaskEditHandler();