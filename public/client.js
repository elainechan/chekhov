function getClientData(callback) {
	$.getJSON(`http://localhost:8080/clients/all/${localStorage.getItem('token')}`, callback);
}

function renderClients(CLIENTS) {
	console.log(CLIENTS);
	CLIENTS.forEach((item, i) => {
		$('#clients').append(`
		<div class="client-item">
		<div class="client-name-div">
		<input class="client-name" id="client-name-input" data-id="" value="${item.name}" />
		</div>
		<div class="client-address-div">
			<p>Address:</p>
				<textarea class="client-address" id="client-address-input" value="" data-id="">${item.address}</textarea>
			</div>
		<button class="go-to-client" value="${item._id}">Go to client</button>
		<button class="delete-client" data-id="${item._id}">Delete client</button>
		</div>`);
	});
}

function goToClient(CLIENTS) {
	$("body").on("click", ".go-to-client", function() {
		console.log($(this).val());
		window.location.href = `client-profile.html?clientId=${$(this).val()}`;
	});
}

function deleteClient() {
	$('body').on('click', '.delete-client', (e) => {
		e.preventDefault();
		debugger
		let clientId = e.currentTarget.attributes[1].nodeValue;
		e.currentTarget.parentElement.remove();
		$.ajax({
			url: `/clients/delete/${clientId}/${localStorage.getItem('token')}`,
			type: 'DELETE',
			contentType: 'application/json',
			success: (content) => {
				console.log("Client deleted");
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

function addNewClient() {
	$('body').on('click', '.new-client-button', (e) => {
		e.preventDefault();
		if($('.client-item').hasClass('client-list')) {
			$('#clients').prepend(`<div class="new client-item client-list">
			<div class="client-name-div">
			<input class="new client-name" id="client-name-input" placeholder="Enter name" data-id="" value="" />
			</div>
			<div class="client-address-div">
			<p>Address:</p>
				<textarea class="new client-address" id="client-address-input" placeholder="Enter address" data-id=""></textarea>
			</div>
			<button class="submit-button" id="submit-client">Submit</button>
			</div>`);
		} else if ($('.client-item').hasClass('client-card')) {
			$('#clients').prepend(`<div class="new client-item client-card">
			<div class="client-name-div">
			<input class="new client-name" id="client-name-input" placeholder="Enter name" data-id="" value="" />
			</div>
			<div class="client-address-div">
			<p>Address:</p>
				<textarea class="new client-address" id="client-address-input" placeholder="Enter address" data-id=""></textarea>
			</div>
			<button class="submit-button" id="submit-client">Submit</button>
			</div>`);
		} else {
			$('#clients').prepend(`<div class="new client-item client-card">
			<div class="client-name-div">
			<input class="new client-name" id="client-name-input" placeholder="Enter name" data-id="" value="" />
			</div>
			<div class="client-address-div">
			<p>Address:</p>
				<textarea class="new client-address" id="client-address-input" placeholder="Enter address" data-id=""></textarea>
			</div>
			<button class="submit-button" id="submit-client">Submit</button>
			</div>`);
		}
	});
}

function postNewClient() {
	$('body').on('click', '#submit-client', (e) => {
		e.preventDefault();
		let clientObj = {
			name: $('.client-name').val(),
			address: $('.client-address').val()
		};
		$.ajax({
			url: `/clients/${localStorage.getItem('token')}`,
			data: JSON.stringify(clientObj),
			type: 'POST',
			contentType: 'application/json',
			success: (content) => {
				debugger
				$('.new.client-item').append(`<button class="go-to-client" value="${content._id}">Go to client</button>
				<button class="delete-client" data-id="${content._id}">Delete client</button>`)
				$('.new.client-item').removeClass('new');
				$('.new.client-name').removeClass('new');
				$('.new.client-address').removeClass('new');
				$('#submit-client').remove();
			}
		});
	});
}

$("#clients").sortable();
$("#clients").disableSelection();
getClientData(renderClients); 
goToClient();
deleteClient();
toggleListView();
toggleCardView();
addNewClient();
postNewClient();