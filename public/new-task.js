'use strict';

function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/`, callback);
}

function createCaseSelection(CASES) {
	console.log(CASES);
	CASES.forEach((data => {
		$("#case-selection").append(`<option value="${data._id}">${data.name}</option>`);
	}));
}
window.onload = getCaseData(createCaseSelection); // calling REST returns an object/JSON