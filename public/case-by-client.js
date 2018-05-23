import { getCaseByClient } from "../case/case.controller";

'use strict';

var url_string = window.location.href;
var url = new URL(url_string);
var clientId = url.searchParams.get("clientId");
console.log(clientId);

function getCasesByClient(callback) {
	$.getJSON(`http://localhost:8080/case/client/${clientId}/${localStorage.getItem('token')}`, callback)
}

function renderCaseByClient(CASES) {
	if (CASES.length === 0) {
		console.log('No data to display');
	}
	CASES.forEach((item, i) => {
		$('#cases').append(``);
	});
}

getCaseByClient(renderCaseByClient);