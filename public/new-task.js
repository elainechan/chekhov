'use strict';

function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/all/${localStorage.getItem('token')}`, callback);
}

function createCaseSelection(CASES) {
	console.log(CASES);
	CASES.forEach((data => {
		$("#case-selection").append(`<option value="${data._id}">${data.name}</option>`);
	}));
}

function postNewTask() {
	$('#submit-task').click((e) => {
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
	});
}

getCaseData(createCaseSelection); // calling REST returns an object/JSON
postNewTask();