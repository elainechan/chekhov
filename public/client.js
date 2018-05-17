function getClientData(callback) {
	$.getJSON(`http://localhost:8080/clients/all/${localStorage.getItem('token')}`, callback);
}

function renderClients(CLIENTS) {
	console.log(CLIENTS);
	CLIENTS.forEach((item, i) => {
		$('#clients').append(`
		<div class="client-item">
		<h3>${item.name}</h3>
		<p>Address: ${item.address}</p>
		<p>ID: ${item._id}</p>
		</div>`);
	});
}

function goToClientTasks(CLIENTS) {
	$("body").on("click", "button", function() {
		console.log($(this).val());
		window.location.href = `task-by-client.html?clientId=${$(this).val()}`;
	});
}

getClientData(renderClients); 
goToClientTasks();