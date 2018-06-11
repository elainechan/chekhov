'use strict';

function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/all/${localStorage.getItem('token')}`, callback);
}

function getClientData(callback) {
	$.getJSON(`http://localhost:8080/clients/all/${localStorage.getItem('token')}`, callback);
}

function createClientSelection(CLIENTS) {
	console.log(CLIENTS);
	CLIENTS.forEach((data => {
		$("#select-existing-client").append(`<option value="${data._id}">${data.name}</option>`);
	}));
}

function toggleCreateNewClient() {
	$('.new-client-button').click((e) => {
		e.preventDefault();
		$('#add-new-client-div').show();
		$('#select-existing-client-div').hide();
		$('.new-client-button').hide();
		$('.existing-client-button').show();
	});
}
function toggleSelectExistingClient() {
	$('.existing-client-button').click((e) => {
		e.preventDefault();
		$('#add-new-client-div').hide();
		$('#select-existing-client-div').show();
		$('.new-client-button').show();
		$('.existing-client-button').hide();
	});
}

getClientData(createClientSelection);
toggleCreateNewClient();
toggleSelectExistingClient();