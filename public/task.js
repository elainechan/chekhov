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
		</div>
		<div class="go-to-case">
		<button class="case-button" id="go-to-case-tasks" value="${item.case_id}">Go to case</button>
		</div>
		</div>`);
	});
	getCaseData(renderCaseName);
}

function renderCaseName(CASES) {
	CASES.forEach((item, i) => {
		$('.task-case-div').html(`Case: ${item.name}`)
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

function editTaskName() {
	$('body')
	.not('.new')
	.on('blur', '#task-name-input', (e) => {
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

function editTaskDescription() {
	$('body')
	.not('.new')
	.on('blur', '#task-description-input', (e) => {
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

function patchOnEnter() {
	$('body')
	.not('.new')
	.on('keypress', '#task-name-input', (e) => {
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
	$('body')
	.not('.new')
	.on('keypress', '#task-description-input', (e) => {
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

function addNewTask() {
	/*
	$('.new-task-button').click(() => {
		window.location = 'http://localhost:8080/new-task.html';
	});
	*/
	$('.new-task-button').click(() => {
		// TODO: fill in
		// # task-name-input
		// data-id
		// value
		// #task-description-input
		// data-id
		// item description
		// .task-case-div
		// case id
		// #go-to-case-tasks
		// value
		if ($('.task-item').hasClass('task-list')) {
			$('#tasks').prepend(
				`<div class="new task-item task-list">
				<div class="task-name-div">
				<input class="task-name" id="task-name-input" placeholder="Enter name" data-id="" value="" />
				</div>
				<div class="task-description-div">
				<textarea class="task-description" id="task-description-input" placeholder="Enter description" data-id=""></textarea>
				</div>
				<div class="case-selection-div mdc-select" style="display:none;">
				<select id="select-existing-case"></select>
				</div>
				<div class="new-case-div">
				<input placeholder="Enter new case name">
				</div>
				<div class="toggle-buttons">
				<button class="existing-case-button">Select Existing Case</button>
				<button class="new-case-button" style="display:none;">Create New Case</button>
				</div>
				<button class="submit-button" id="submit-task">Submit</button>
				</div>`
			);
		} else if (($('.task-item').hasClass('task-card'))) {
			$('#tasks').prepend(
				`<div class="task-item task-card">
				<div class="task-name-div">
				<input class="task-name" id="task-name-input" data-id="" value="" />
				</div>
				<div class="task-description-div">
				<textarea class="task-description" id="task-description-input" data-id=""></textarea>
				</div>
				<div class="task-case-div">
				<p>Case ID:</p>
				</div>
				<div class="go-to-case">
				<button id="go-to-case-tasks" value="">Go to case</button>
				</div>
				</div>`
			);
		}
		getCaseData(createCaseSelection);
	});
}

function createCaseSelection(CASES) {
	console.log(CASES);
	CASES.forEach((data => {
		$("#select-existing-case").append(`<option value="${data._id}">${data.name}</option>`);
	}));
}

function toggleCreateNewCase() {
	$('body').on('click', '.new-case-button', (e) => {
		e.preventDefault();
		$('.new-case-div').show();
		$('.case-selection-div').hide();
		$('.new-case-button').hide();
		$('.existing-case-button').show();
	});
}
function toggleSelectExistingCase() {
	$('body').on('click','.existing-case-button',(e) => {
		e.preventDefault();
		$('.new-case-div').hide();
		$('.case-selection-div').show();
		$('.new-case-button').show();
		$('.existing-case-button').hide();
	});
}

function goToCaseTasks(CASES) {
	// attach button click event to body
	$("body").on("click", "#go-to-case-tasks", function() {
		console.log($(this).val());
		window.location.href = `task-by-case.html?caseId=${$(this).val()}`; // (1) passing a parameter to the URL window.location.href 
	});
}

function postNewTask() {
	$('body').on('click','#submit-task',(e) => {
		e.preventDefault();
		/* configure the json of request */
		console.log($('#task-name').val());
		let taskObj = {
			name: $('#task-name').val()
		};
		$.ajax({
			url: `http://localhost:8080/tasks/${localStorage.getItem('token')}`,
			data: JSON.stringify(taskObj),
			type: 'POST',
			contentType: 'application/json',
			succes: (content) => {
				console.log('New task posted');
			}
		});
		$('.new.task-item').removeClass('new');
		$('.new-case-div').remove();
		$('.case-selection-div').remove();
		$('.toggle-buttons').remove();
		$('#submit-task').remove();
	});
}
function printCases(CASES) {
	CASES.forEach((item, i) => {
		console.log(item);
	});
}

getTaskData(renderTasks);
toggleCardView();
toggleListView();
$("#tasks").sortable();
$("#tasks").disableSelection();
editTaskName();
editTaskDescription();
addNewTask();
//goToCaseTasks(getCaseData);
getCaseData(goToCaseTasks);
patchOnEnter();
toggleCreateNewCase();
toggleSelectExistingCase();
postNewTask();
getCaseData(printCases);