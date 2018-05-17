import { getCaseByClient } from "../case/case.controller";

'use strict';

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