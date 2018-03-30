'use strict';

function getClientData(callback) {
	$.getJSON(`http://localhost:8080/clients/`);
}

window.onload = getClientData(); // calling REST returns an object/JSON