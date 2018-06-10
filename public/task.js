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
		<input id="task-description-input" data-id="${item._id}" value="${item.description}"  />
		<div>
		<p>Case ID: ${item.case_id}</p>
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

function addTaskNameEditHandler() {
	$('body').on('blur', '#task-name-input', (e) => {
		console.log(e.target.value);
		let taskId = $(e.target).attr('data-id');
		let data = JSON.stringify({ name: e.target.value });
		$.ajax({
			url: `http://localhost:8080/tasks/edit/${taskId}/name/${localStorage.getItem('token')}`,
			data: data,
			type: 'PATCH',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
			}
		});
	});
}

function addTaskDescriptionEditHandler() {
	$('body').on('blur', '#task-description-input', (e) => {
		console.log(e.target.value);
		let taskId = $(e.target).attr('data-id');
		console.log(taskId);
		let data = JSON.stringify({ description: e.target.value });
		$.ajax({
			url: `http://localhost:8080/tasks/edit/${taskId}/description/${localStorage.getItem('token')}`,
			data: data,
			type: 'PATCH',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
			}
		});
	});
}


getTaskData(renderTasks);
toggleCardView();
toggleListView();
$("#tasks").sortable();
$("#tasks").disableSelection();
addTaskNameEditHandler();
addTaskDescriptionEditHandler();