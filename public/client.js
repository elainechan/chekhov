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
		<button name="go-to-client" value="${item._id}">Go to client</button>
		<button class="delete-client" data-id="${item._id}">Delete client</button>
		</div>`);
	});
}

function goToClient(CLIENTS) {
	$("body").on("click", "button", function() {
		console.log($(this).val());
		window.location.href = `client-profile.html?clientId=${$(this).val()}`;
	});
}

function deleteClient() {
	$('body').on('click', '.delete-client', (e) => {
		e.preventDefault();
		let clientId = $('.delete-client').attr('data-id');
		$.ajax({
			url: `/clients/delete/${clientId}/${localStorage.getItem('token')}`,
			type: 'DELETE',
			contentType: 'application/json',
			success: (content) => {
				debugger
			}
		})
	});
}

function toggleListView() {
	// step 1: get click listener
		$(".list-button").on("click", function() {
			// remove one class and add another
			$(".client-item").removeClass("client-card").addClass("client-list");
		});
	}

function toggleCardView() {
	$(".card-button").on("click", function () {
		// remove one class and add another
		$(".client-item").removeClass("client-list").addClass("client-card");
	});
}

function linkToAddNewClient() {
	$('.new-client-button').click((e) => {
		e.preventDefault();
		window.location = 'http://localhost:8080/new-client.html'
	});
}

$("#clients").sortable();
$("#clients").disableSelection();
getClientData(renderClients); 
goToClient();
deleteClient();
toggleListView();
toggleCardView();
linkToAddNewClient();