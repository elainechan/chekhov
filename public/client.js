function getClientData(callback) {
	$.getJSON(`http://localhost:8080/clients/all/${localStorage.getItem('token')}`, callback);
}

function renderClients(CLIENTS) {
	console.log(CLIENTS);
	CLIENTS.forEach((item, i) => {
		$('#clients').append(`<h3>${item.name}</h3><div class="client-item">Address: ${item.address}<br>ID: ${item._id}</div>`);
	});
	$( "#clients" ).accordion();
}

window.onload = getClientData(renderClients); 