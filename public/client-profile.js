'use strict';

var url_string = window.location.href;
var url = new URL(url_string);
var clientId = url.searchParams.get("clientId");
console.log(clientId);

function getCasesByClient(callback) {
	$.getJSON(`http://localhost:8080/cases/client/${clientId}/${localStorage.getItem('token')}`, callback)
}

function renderCasesByClient(CASES) {
	debugger
	if (CASES.cases.length === 0) {
		console.log('No data to display');
	}
	CASES.cases.forEach((item, i) => {
		$('#cases').append(`
		<div>${item.name}</div>
		`);
	});
}

getCasesByClient(renderCasesByClient);