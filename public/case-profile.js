'use strict';

// (2) by the time we call this, window.location.href is `case-profile.html?caseId=${$(this).val()}` from goToCase() in case.js (frontend)
var url_string = window.location.href;
var url = new URL(url_string);
var caseId = url.searchParams.get("caseId");
var caseName;

function getTasksByCase(callback) { // (3) calls endpoint to get data (calling backend)
	$.getJSON(`/tasks/case/${caseId}/${localStorage.getItem('token')}`, callback);
}

function renderTasksByCase(TASKS) { // (4) renders data in browser
	$.ajax({
		url: `cases/${caseId}/${localStorage.getItem('token')}`,
		type: 'GET',
		contentType: 'application/json',
		success: (content) => {
			caseName = content.name;
			$('.title').prepend(`<div class="title-case-profile">
			<h2 class="title-case-profile-text">Case Profile</h2>
			</div>
			<div class="title-case-name">
			<h3 class="title-case-name-text">Case: ${content.name}</h3>
			</div>
			<div class="title-client">
			<h3 class="title-client-text">Client: ${content.clientId.name}</h3>
			<button class="go-to-client" name="go-to-client" value="${content.clientId._id}">Client profile</button>
			<div>
			`)
		}
	});
	TASKS.forEach((item, i) => {
		$('#tasks').append(`
		<div class="task-list task-item">
		<div class="task-name-div">
		<textarea class="task-name" id="task-name-input" data-id="${item._id}" value="${item.name}">${item.name}
		</textarea>
		</div>
		<div class="task-description-div">
		<textarea class="task-description" id="task-description-input" data-id="${item._id}">${item.description}</textarea>
		</div>
		<button class="delete-task" data-id=${item._id}>Delete task</button>
		</div>`);
	}); // renders data
}

function goToClient() {
	$("body").on("click", ".go-to-client", function() {
		window.location.href = `client-profile.html?clientId=${$(this).val()}`;
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
		if ($(e.target).hasClass('new')) {
			return;
		}
		console.log(e.target.value);
		let taskId = $(e.target).attr('data-id');
		let data = JSON.stringify({ name: e.target.value });
		$.ajax({
			url: `/tasks/edit/${taskId}/name/${localStorage.getItem('token')}`,
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
		if ($(e.target).hasClass('new')) {
			return;
		}
		let taskId = $(e.target).attr('data-id');
		console.log(taskId);
		let value = $(e.target).val();
		console.log(value);
		let data = JSON.stringify({ description: value });
		$.ajax({
			url: `/tasks/edit/${taskId}/description/${localStorage.getItem('token')}`,
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
	.on('keypress', '#task-name-input', (e) => {
		if ($(e.target).hasClass('new')) {
			return;
		}
		else if (e.keyCode === 13) {
			console.log('name entered');
		let taskId = $(e.target).attr('data-id');
		console.log(taskId);
		let value = $(e.target).val()
		let data = JSON.stringify({ name: value });
		$.ajax({
			url: `/tasks/edit/${taskId}/name/${localStorage.getItem('token')}`,
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
	.on('keypress', '#task-description-input', (e) => {
		if (e.keyCode === 13) {
			console.log('description entered');
		let taskId = $(e.target).attr('data-id');
		console.log(taskId);
		let value = $(e.target).val()
		let data = JSON.stringify({ description: value });
		$.ajax({
			url: `/tasks/edit/${taskId}/description/${localStorage.getItem('token')}`,
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
	$('.new-task-button').click((e) => {
		if ($('.task-item').hasClass('task-list')) {
			$('#tasks').prepend(
			`<div class="new task-item task-list">
			<div class="task-name-div">
			<input class=" new task-name" id="task-name-input" placeholder="Enter name" data-id="" value="" />
			<i class="fas fa-times remove-task-item tooltip">
				<span class="tooltiptext">Cancel</span>
				</i>
			</div>
			<div class="task-description-div">
			<textarea class="new task-description" id="task-description-input" placeholder="Enter description" data-id=""></textarea>
			</div>
			<button class="submit-button" id="submit-task">Submit</button>
			</div>`
			);
		} else if (($('.task-item').hasClass('task-card'))) {
			$('#tasks').prepend(
				`<div class="new task-item task-card">
				<div class="task-name-div">
				<input class=" new task-name" id="task-name-input" placeholder="Enter name" data-id="" value="" />
				<i class="fas fa-times remove-task-item tooltip">
				<span class="tooltiptext">Cancel</span>
				</i>
				</div>
				<div class="task-description-div">
				<textarea class="new task-description" id="task-description-input" placeholder="Enter description" data-id=""></textarea>
				</div>
				<button class="submit-button" id="submit-task">Submit</button>
				</div>`
			);
		} else {
			$('#tasks').prepend(
				`<div class="new task-item task-list">
				<div class="task-name-div">
				<input class="new task-name" id="task-name-input" placeholder="Enter name" data-id="" value="" />
				<i class="fas fa-times remove-task-item tooltip">
				<span class="tooltiptext">Cancel</span>
				</i>
				</div>
				<div class="task-description-div">
				<textarea class="new task-description" id="task-description-input" placeholder="Enter description" data-id=""></textarea>
				</div>
				<div class="task-case-div" data-id="${caseId}">${caseName}
			</div>
				<button class="submit-button" id="submit-task">Submit</button>
				</div>`
			);
		}
	});
}

function removeNewTaskItem() {
	$('body').on('click', '.remove-task-item', (e) => {
		e.preventDefault();
		$(e.target).parent().parent().remove();
	});
}

function validateTask(taskObj) {
	if (!taskObj.name) {
		alert('Please enter a task name.');
		return false;
	} else if (!taskObj.description) {
		alert('Please enter a task description.');
		return false;
	}
	return true;
}

function postNewTask() {
	$('body').on('click','#submit-task',(e) => {
		e.preventDefault();
		/* configure the json of request */
		console.log($('.task-name').val());
			var taskObj = {
				name: $('.task-name').val(),
				description: $('.task-description').val(),
				caseId: caseId
			};
			if (!validateTask(taskObj)) {
				return;
			}
			$.ajax({
				url: `/tasks/${localStorage.getItem('token')}`,
				data: JSON.stringify(taskObj),
				type: 'POST',
				contentType: 'application/json',
				success: (content) => {
					console.log('New task posted');
					$('.new.task-item')
					.append(`
					<button class="delete-task" data-id=${content.task._id}>Delete task</button>
					</div>`);
					$('.new.task-item').removeClass('new');
					$('.new-case-div').remove();
					$('.case-selection-div').remove();
					$('.toggle-buttons').remove();
					$('#submit-task').remove();
				}
			});
	});
}

function deleteTask() {
	$('body').on('click', '.delete-task', (e) => {
		e.preventDefault();
		let taskId = e.currentTarget.attributes[1].nodeValue;
		e.currentTarget.parentElement.remove();
		$.ajax({
			url: `/tasks/delete/${taskId}/${localStorage.getItem('token')}`,
			type: 'DELETE',
			contentType: 'application/json',
			success: (content) => {
				console.log("Task deleted.")
			}
		});	
	});
}

function greet() {
	let email = localStorage.getItem('email');
	$('.greeting').text(`Hello, ${email}`);
}

function logOut() {
	$('body').on('click', '.logout', (e) => {
		e.preventDefault;
		localStorage.removeItem('email');
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		console.log('User has been logged out.')
		$('.logout').remove();
		$('.greeting').remove();
		window.location.href = './index.html';
	})
}

function rejectUnauthorized() {
	if (!localStorage.getItem('token')) {
		window.location.href = './index.html'
	}
}

getTasksByCase(renderTasksByCase);
toggleCardView();
toggleListView();
editTaskName();
editTaskDescription();
patchOnEnter();
addNewTask();
removeNewTaskItem();
postNewTask();
goToClient();
deleteTask();
$("#tasks").sortable();
$("#tasks").disableSelection();
greet();
logOut();
rejectUnauthorized();