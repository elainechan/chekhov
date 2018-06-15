'use strict';

function getTaskData(callback) {
	$.getJSON(`http://localhost:8080/tasks/all/${localStorage.getItem('token')}`, callback);
}
function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/all/${localStorage.getItem('token')}`, callback); // server getting endpoint
}

// TODO: make new .html page for getTasksByCaseId

function renderTasks(TASKS) {
	TASKS.forEach((item, i) => {
		$('#tasks').append(`
		<div class="task-list task-item">
		<div class="task-name-div">
		<input class="task-name" id="task-name-input" data-id="${item._id}" value="${item.name}" />
		</div>
		<div class="task-description-div">
		<textarea class="task-description" id="task-description-input" data-id="${item._id}">${item.description}</textarea>
		</div>
		<div class="task-case-div">
		<p>Case ID: ${item.case_id}</p>
		</div>
		<div class="go-to-case">
		<button id="go-to-case-tasks" value="${item.case_id}">Go to case</button>
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
	$('#task-name-input').keypress((e) => {
		debugger
		if (e.keyCode === 13) {
			event.preventDefault();
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
		}
	});
}

function addTaskDescriptionEditHandler() {
	$('body').on('blur', '#task-description-input', (e) => {
		let taskId = $(e.target).attr('data-id');
		console.log(taskId);
		let value = $(e.target).val();
		console.log(value);
		let data = JSON.stringify({ description: value });
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

function postOnEnter() {
	$('body').on('keypress', '#task-name-input', (e) => {
		if (e.keyCode === 13) {
			console.log('name entered');
		let taskId = $(e.target).attr('data-id');
		console.log(taskId);
		let value = $(e.target).val()
		let data = JSON.stringify({ name: value });
		$.ajax({
			url: `http://localhost:8080/tasks/edit/${taskId}/name/${localStorage.getItem('token')}`,
			data: data,
			type: 'PATCH',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
			}
		});
		}
	});
	$('body').on('keypress', '#task-description-input', (e) => {
		if (e.keyCode === 13) {
			console.log('description entered');
		let taskId = $(e.target).attr('data-id');
		console.log(taskId);
		let value = $(e.target).val()
		let data = JSON.stringify({ description: value });
		$.ajax({
			url: `http://localhost:8080/tasks/edit/${taskId}/description/${localStorage.getItem('token')}`,
			data: data,
			type: 'PATCH',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
			}
		});
		}
	});
}

function linkToAddNewTask() {
	$('.new-task-button').click(() => {
		window.location = 'http://localhost:8080/new-task.html';
	});
}

function goToCaseTasksListener(CASES) {
	// attach button click event to body
	$("body").on("click", "#go-to-case-tasks", function() {
		console.log($(this).val());
		window.location.href = `task-by-case.html?caseId=${$(this).val()}`; // (1) passing a parameter to the URL window.location.href 
	});
}

getTaskData(renderTasks);
toggleCardView();
toggleListView();
$("#tasks").sortable();
$("#tasks").disableSelection();
addTaskNameEditHandler();
addTaskDescriptionEditHandler();
linkToAddNewTask();
goToCaseTasksListener(getCaseData);
postOnEnter();