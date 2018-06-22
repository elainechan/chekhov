'use strict';
// when working locally, comment out line 3, vice versa
// const url = `http://localhost:8080`;
const url = `http://chekhov.herokuapp.com`;

function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/all/${localStorage.getItem('token')}`, callback);
}

function createCaseSelection(CASES) {
	console.log(CASES);
	CASES.forEach((data => {
		$("#case-selection").append(`<option class="case-selected" value="${data._id}">${data.name}</option>`);
	}));
}

function postNewTask() {
	$('#submit-task').click((e) => {
		e.preventDefault();
		/* configure the json of request */
		console.log($('#task-name').val());
		let caseObjId = $('#case-selection option:selected', this).data('value');
		console.log(caseObjId);
		let caseIdStr = JSON.stringify(caseObjId);
		let taskObj = {
			name: $('#task-name').val(),
			description: $('#task-description').val(),
			caseId: caseIdStr
		};
		$.ajax({
			url: `${url}/tasks/${localStorage.getItem('token')}`,
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