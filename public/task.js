'use strict';
// when working locally, comment out line 3, vice versa
// const url = `http://localhost:8080`;
//const url = `https://chekhov.herokuapp.com`;

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
		<div class="task-list task-item">
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
		<textarea data-id="${item.caseId._id}">${item.caseId.name}</textarea>
		</div>
		<div class="go-to-case">
		<button class="case-button" id="go-to-case-tasks" value="${item.caseId._id}" data-id="${item.caseId._id}">Go to case</button>
		</div>
		<button class="delete-task" data-id="${item._id}">Delete task</button>
		</div>`);
		getCaseData(createCaseSelection);
		$(`.select-existing-case option[value=${item.caseId._id}]`).attr('selected', true);
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

function addNewTask() {
	$('.new-task-button').click((e) => {
		if ($('.task-item').hasClass('task-list')) {
			$('#tasks').prepend(
				`<div class="new task-item task-list">
				<div class="task-name-div">
				<textarea class="new task-name" id="task-name-input" placeholder="Enter name" data-id=""></textarea>
				</div>
				<div class="task-description-div">
				<textarea class="new task-description" id="task-description-input" placeholder="Enter description" data-id=""></textarea>
				</div>
				<div class="case-selection-div mdc-select" style="display:none;">
				<select class="select-existing-case"></select>
				</div>
				<div class="new-case-div">
				<input class="new-case-input" placeholder="Enter new case name">
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
				`<div class="new task-item task-card">
				<div class="task-name-div">
				<textarea class="new task-name" id="task-name-input" placeholder="Enter name" data-id="" value=""></textarea>
				</div>
				<div class="task-description-div">
				<textarea class="new task-description" id="task-description-input" placeholder="Enter description" data-id=""></textarea>
				</div>
				<div class="case-selection-div mdc-select" style="display:none;">
				<select class="select-existing-case"></select>
				</div>
				<div class="new-case-div">
				<input class="new-case-input" placeholder="Enter new case name">
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
				`<div class="new task-item task-list">
				<div class="task-name-div">
				<textarea class="new task-name" id="task-name-input" placeholder="Enter name" data-id="" value=""></textarea>
				</div>
				<div class="task-description-div">
				<textarea class="new task-description" id="task-description-input" placeholder="Enter description" data-id=""></textarea>
				</div>
				<div class="case-selection-div mdc-select" style="display:none;">
				<select class="select-existing-case"></select>
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
		}
		getCaseData(createCaseSelection);
	});
}

function createCaseSelection(CASES) {
	CASES.forEach((data => {
		$(".select-existing-case").append(`<option class="case-option" value="${data._id}">${data.name}</option>`);
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

function goToCase(CASES) {
	$("body").on("click", "#go-to-case-tasks", function() {
		console.log($(this).val());
		window.location.href = `case-profile.html?caseId=${$(this).val()}`; // (1) passing a parameter to the URL window.location.href 
	});
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
			$.ajax({
				url: `/tasks/${localStorage.getItem('token')}`,
				data: JSON.stringify(taskObj),
				type: 'POST',
				contentType: 'application/json',
				success: (content) => {
					console.log('New task posted');
					$('.new.task-item')
					.append(`
					<div class="task-case-div">${content.case.name}</div>
					<div class="go-to-case">
					<button class="case-button" id="go-to-case-tasks" value="${content.case._id}" data-id="${content.case._id}">Go to case</button>
					</div>
					<button class="delete-task" data-id="${content.task._id}">Delete task</button>
					</div>`);
					$('.new.task-item').removeClass('new');
					$('.new-case-div').remove();
					//$('.case-selection-div').remove();
					$()
					$('.toggle-buttons').remove();
					$('#submit-task').remove();
				}
			});
		} else {
			// new case
			var taskObj = {
				name: $('.task-name').val(),
				description: $('.task-description').val(),
				caseId: null,
				caseName: $(".new-case-input").val()
			};
			$.ajax({
				url: `/tasks/${localStorage.getItem('token')}`,
				data: JSON.stringify(taskObj),
				type: 'POST',
				contentType: 'application/json',
				success: (content) => {
					console.log('New task posted');
					$('.new.task-item')
					.append(`<div class="task-case-div" data-id="${content.task.caseId}">
					<textarea data-id="${content.task.caseId}">${content.caseName}
					</div>
					<div class="go-to-case">
					<button class="case-button" id="go-to-case-tasks" value="${content.task.caseId}" data-id="${content.task.caseId}">Go to case</button>
					</div>
					<button class="delete-task" data-id="${content.task._id}">Delete task</button>
					</div>`);
					$('.new.task-item').removeClass('new');
					$('.new-case-div').remove();
					// $('.case-selection-div').remove();
					$('.toggle-buttons').remove();
					$('#submit-task').remove();
					getCaseData(createCaseSelection);
					$('.case-option').forEach((option) => {
						console.log(option.val());
						
					})
					if ($())
					
				}
			});

		}	
	});
}

function editCase() {
	$()
}

getTaskData(renderTasks);
toggleCardView();
toggleListView();
$("#tasks").sortable();
$("#tasks").disableSelection();
editTaskName();
editTaskDescription();
addNewTask();
goToCase(getCaseData);
getCaseData(goToCase);
patchOnEnter();
toggleCreateNewCase();
toggleSelectExistingCase();
postNewTask();
deleteTask();