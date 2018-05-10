'use strict';

function getClientData(callback) {
	$.getJSON(`http://localhost:8080/clients/${localStorage.getItem('token')}`);
}

window.onload = getClientData(); // calling REST returns an object/JSON