'use strict';

function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/`, callback);
}

function createCaseSelection(CLIENTS) {
	console.log(CLIENTS);
	CLIENTS.forEach((data => {
		$("#client-selection").append(`<option value="${data._id}">${data.name}</option>`);
	}));
}
window.onload = getCaseData(createCaseSelection); // calling REST returns an object/JSON