'use strict';

function getTaskData(callback) {
	$.getJSON(`/tasks/all/${localStorage.getItem('token')}`, callback);
}

function getCaseData(callback) {
	$.getJSON(`/cases/all/${localStorage.getItem('token')}`, callback); // server getting endpoint
}

function renderTasks(TASKS) {
	console.log(TASKS);
	TASKS.forEach((item, i) => {
		if (!item.caseId) {
			item.caseId = {
				_id: 0,
				name: 'No case name'
			}
		}
		$('#tasks').append(`
		<div class="task-card task-item" data-id="${item._id}" case="${item.caseId._id}">
		<div class="task-name-div">
		<textarea class="task-name" id="task-name-input" data-id="${item._id}" value="${item.name}">${item.name}
		</textarea>
		</div>
		<div class="task-description-div">
		<textarea class="task-description" id="task-description-input" data-id="${item._id}">${item.description}</textarea>
		</div>
		<div class="task-case-div" data-id="${item.caseId._id}">
		<div class="case-selection-div mdc-select">
		<select class="select-existing-case"></select>
		</div>
		</div>
		<div class="go-to-case">
		<button class="case-button" id="go-to-case-tasks" value="${item.caseId._id}" data-id="${item.caseId._id}">Case profile</button>
		</div>
		<button class="delete-task" data-id="${item._id}">Delete task</button>
		</div>`);
	});
	getCaseData(createCaseSelection);
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

function renderCaseName(CASES) {
	CASES.forEach((item, i) => {
		console.log(`Name: ${item.name}`);
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
		e.preventDefault;
		if ($(e.target).hasClass('new')) {
			return;
		}
		else if (e.keyCode === 13) {
			console.log('name entered');
		let taskId = $(e.target).attr('data-id');
		let caseName = $(e.target).val();
		let data = JSON.stringify({ name: caseName });
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
		if ($(e.target).hasClass('new')) {
			return;
		} else if (e.keyCode === 13) {
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

function editTaskCase() {
	$('body')
	.not('.new')
	.on('change', '.select-existing-case', (e) => {
		e.preventDefault;
		if ($(e.currentTarget).parent().parent().hasClass('new')) {
			return;
		}
		let selected = $(e.currentTarget).find(':selected');
		let taskId = $(e.currentTarget).parent().parent().parent().attr('data-id');
		let caseId = $(e.currentTarget).find(':selected').attr('value');
		let data = JSON.stringify({
			caseId: caseId
		});
		$.ajax({
			url: `/tasks/edit/${taskId}/case/${localStorage.getItem('token')}`,
			data: data,
			type: 'PUT',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
			}
		});	
	});

}

function addNewTask() {
	$('.new-task-button').click((e) => {
		if ($('.task-item').hasClass('task-list')) {
			$('#tasks').prepend(
				`<div class="new task-item task-list" data-id="" case="">
				<div class="task-name-div">
				<textarea class="new task-name" id="task-name-input" placeholder="Enter name" data-id=""></textarea>
				<i class="fas fa-times remove-task-item tooltip">
				<span class="tooltiptext">Cancel</span>
				</i>
				</div>
				<div class="task-description-div">
				<textarea class="new task-description" id="task-description-input" placeholder="Enter description" data-id=""></textarea>
				</div>
				<div class="task-case-div">
				<div class="case-selection-div mdc-select" style="display:none;">
				<select class="select-existing-case"></select>
				</div>
				<div class="new-case-div">
				<input class="new-case-input" placeholder="Enter new case name">
				</div>
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
				`<div class="new task-item task-card" data-id="" case="">
				<div class="task-name-div">
				<textarea class="new task-name" id="task-name-input" placeholder="Enter name" data-id="" value=""></textarea>
				<i class="fas fa-times remove-task-item tooltip">
				<span class="tooltiptext">Cancel</span>
				</i>
				</div>
				<div class="task-description-div">
				<textarea class="new task-description" id="task-description-input" placeholder="Enter description" data-id=""></textarea>
				</div>
				<div class="task-case-div">
				<div class="case-selection-div mdc-select" style="display:none;">
				<select class="select-existing-case"></select>
				</div>
				<div class="new-case-div">
				<input class="new-case-input" placeholder="Enter new case name">
				</div>
				</div>
				<div class="toggle-buttons">
				<button class="existing-case-button">Select Existing Case</button>
				<button class="new-case-button" style="display:none;">Create New Case</button>
				</div>
				<button class="submit-button" id="submit-task">Submit</button>
				</div>`
			);
		} else {
			$('#tasks').prepend(
				`<div class="new task-item task-card" data-id="" case="">
				<div class="task-name-div">
				<textarea class="new task-name" id="task-name-input" placeholder="Enter name" data-id="" value=""></textarea>
				<i class="fas fa-times remove-task-item tooltip">
				<span class="tooltiptext">Cancel</span>
				</i>
				</div>
				<div class="task-description-div">
				<textarea class="new task-description" id="task-description-input" placeholder="Enter description" data-id=""></textarea>
				</div>
				<div class="task-case-div">
				<div class="case-selection-div mdc-select" style="display:none;">
				<select class="select-existing-case"></select>
				</div>
				<div class="new-case-div">
				<input class="new-case-input" placeholder="Enter new case name">
				</div>
				</div>
				<div class="toggle-buttons">
				<button class="existing-case-button">Select Existing Case</button>
				<button class="new-case-button" style="display:none;">Create New Case</button>
				</div>
				<button class="submit-button" id="submit-task">Submit</button>
				</div>`
			);
		}
		getCaseData(createCaseSelection);
	});
}

function removeNewTaskItem() {
	$('body').on('click', '.remove-task-item', (e) => {
		e.preventDefault();
		$(e.target).parent().parent().remove();
	});
}

function createCaseSelection(CASES) {
	// for each task item
	// if task item has case attr
	// option selected = selected
	let taskList = $('.task-item');
	$(taskList).each((i, task) => {
		let taskCaseId = $(task).attr('case');
		let taskSelect = $(task).find('.select-existing-case')[0];
		CASES.forEach((data => {
			if (taskCaseId === data._id) {
				$(taskSelect).append(`<option class="case-option" value="${data._id}" selected>${data.name}</option>`);
			} else {
				$(taskSelect).append(`<option class="case-option" value="${data._id}">${data.name}</option>`);
			}
		}));
	});	
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

function goToCase(CASES) {
	$("body").on("click", "#go-to-case-tasks", function() {
		console.log($(this).val());
		window.location.href = `case-profile.html?caseId=${$(this).val()}`; // (1) passing a parameter to the URL window.location.href 
	});
}

function validateTask(taskObj, hasCaseId) {
	if (!taskObj.name) {
		alert('Please enter a task name.');
		return false;
	} else if (!taskObj.description) {
		alert('Please enter a task description.');
		return false;
	}
	if (hasCaseId && !taskObj.caseId) {
		// existing case
		return false;
	}
	if (!hasCaseId && !taskObj.caseName) {
		// new case
		alert('Please enter a case name.')
		return false;
	}
	return true;
}

function postNewTask() {
	$('body').on('click','#submit-task',(e) => {
		e.preventDefault();
		/* configure the json of request */
		console.log($('.task-name').val());
		// existing case
		if ($(".new-case-div").attr("style") === "display: none;") {
			var taskObj = {
				name: $('.task-name').val(),
				description: $('.task-description').val(),
				caseId: $('option:selected', this).attr('value')
			};
			if (!validateTask(taskObj, true)) {
				alert('Data validation failed.');
				return
			}
			$.ajax({
				url: `/tasks/${localStorage.getItem('token')}`,
				data: JSON.stringify(taskObj),
				type: 'POST',
				contentType: 'application/json',
				success: (content) => {
					console.log('New task posted');
					$('.remove-task-item').remove();
					$('.new.task-item > .task-case-div').remove();
					$('.new.task-item')
					.append(`
					<div class="task-case-div">
					<div class="case-selection-div mdc-select">
					<select class="select-existing-case"></select>
					</div>
					</div>
					<div class="go-to-case">
					<button class="case-button" id="go-to-case-tasks" value="${content.case._id}" data-id="${content.case._id}">Case profile</button>
					</div>
					<button class="delete-task" data-id="${content.task._id}">Delete task</button>
					</div>`);
					$('.new.task-item').attr('data-id', `${content.task._id}`);
					$('.new.task-item').attr('case', `${content.case._id}`);
					$('.new.task-item').removeClass('new');
					$('.toggle-buttons').remove();
					$('#submit-task').remove();
					getCaseData(createCaseSelection);
				}
			});
		} else {
			// new case
			let caseName = $(".new-case-input").val();
			var taskObj = {
				name: $('.task-name').val(),
				description: $('.task-description').val(),
				caseId: null,
				caseName: caseName
			};
			if (!validateTask(taskObj, false)) {
				alert('Data validation failed.');
				return
			}
			$.ajax({
				url: `/tasks/${localStorage.getItem('token')}`,
				data: JSON.stringify(taskObj),
				type: 'POST',
				contentType: 'application/json',
				success: (content) => {
					console.log('New task posted');
					$('.remove-task-item').remove();
					$('.new.task-item > .task-case-div').remove();
					$('.new.task-item').attr('case', `${content.task.caseId}`);
					$('.new.task-item')
					.append(`
					<div class="task-case-div">
					<div class="case-selection-div mdc-select">
					<select class="select-existing-case"></select>
					</div>
					</div>
					<div class="go-to-case">
					<button class="case-button" id="go-to-case-tasks" value="${content.task.caseId}" data-id="${content.task.caseId}">Case profile</button>
					</div>
					<button class="delete-task" data-id="${content.task._id}">Delete task</button>
					</div>`);
					$('.new.task-item').removeClass('new');
					$('.toggle-buttons').remove();
					$('#submit-task').remove();
					getCaseData(createCaseSelection);
				}
			});
		}	
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

getTaskData(renderTasks);
toggleCardView();
toggleListView();
$("#tasks").sortable();
$("#tasks").disableSelection();
editTaskName();
editTaskDescription();
editTaskCase();
addNewTask();
removeNewTaskItem();
goToCase(getCaseData);
getCaseData(goToCase);
patchOnEnter();
toggleCreateNewCase();
toggleSelectExistingCase();
postNewTask();
deleteTask();
greet();
logOut();
rejectUnauthorized();