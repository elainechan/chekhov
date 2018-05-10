'use strict';

function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/all/${localStorage.getItem('token')}`, callback);
}

function createClientSelection(CLIENTS) {
	console.log(CLIENTS);
	CLIENTS.forEach((data => {
		$("#client-selection").append(`<option value="${data._id}">${data.name}</option>`);
	}));
}
window.onload = getCaseData(createClientSelection); // calling REST returns an object/JSON