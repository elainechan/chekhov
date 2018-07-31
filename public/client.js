function getClientData(callback) {
	$.getJSON(`/clients/all/${localStorage.getItem('token')}`, callback);
}

function renderClients(CLIENTS) {
	console.log(CLIENTS);
	CLIENTS.forEach((item, i) => {
		$('#clients').append(`
		<div class="client-item client-card">
		<div class="client-name-div">
		<textarea class="client-name" id="client-name-input" data-id="${item._id}">${item.name}</textarea>
		</div>
		<div class="client-address-div">
		<textarea class="client-address" id="client-address-input" value="" data-id="${item._id}">${item.address}</textarea>
		</div>
		<button class="go-to-client" value="${item._id}">Client profile</button>
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

function addNewClient() {
	$('body').on('click', '.new-client-button', (e) => {
		e.preventDefault();
		if($('.client-item').hasClass('client-list')) {
			$('#clients').prepend(`<div class="new client-item client-list">
			<div class="client-name-div">
			<textarea class="new client-name" id="client-name-input" placeholder="Enter name" data-id="" value=""></textarea>
			<i class="fas fa-times remove-client-item tooltip">
				<span class="tooltiptext">Cancel</span>
				</i>
			</div>
			<div class="client-address-div">
				<textarea class="new client-address" id="client-address-input" placeholder="Enter address" data-id=""></textarea>
			</div>
			<button class="submit-button" id="submit-client">Submit</button>
			</div>`);
		} else if ($('.client-item').hasClass('client-card')) {
			$('#clients').prepend(`<div class="new client-item client-card">
			<div class="client-name-div">
			<textarea class="new client-name" id="client-name-input" placeholder="Enter name" data-id="" value=""></textarea>
			<i class="fas fa-times remove-client-item tooltip">
				<span class="tooltiptext">Cancel</span>
				</i>
			</div>
			<div class="client-address-div">
				<textarea class="new client-address" id="client-address-input" placeholder="Enter address" data-id=""></textarea>
			</div>
			<button class="submit-button" id="submit-client">Submit</button>
			</div>`);
		} else {
			$('#clients').prepend(`<div class="new client-item client-card">
			<div class="client-name-div">
			<textarea class="new client-name" id="client-name-input" placeholder="Enter name" data-id="" value=""></textarea>
			<i class="fas fa-times remove-client-item tooltip">
				<span class="tooltiptext">Cancel</span>
				</i>
			</div>
			<div class="client-address-div">
				<textarea class="new client-address" id="client-address-input" placeholder="Enter address" data-id=""></textarea>
			</div>
			<button class="submit-button" id="submit-client">Submit</button>
			</div>`);
		}
	});
}

function removeNewClientItem() {
	$('body').on('click', '.remove-client-item', (e) => {
		e.preventDefault();
		$(e.target).parent().parent().remove();
	});
}

function validateClient(clientObj) {
	if (!clientObj.name) {
		alert('Please enter client name.');
		return false;
	} else if (!clientObj.address) {
		alert('Please enter client addres.');
		return false;
	}
	return true;
}

function postNewClient() {
	$('body').on('click', '#submit-client', (e) => {
		e.preventDefault();
		let clientObj = {
			name: $('.client-name').val(),
			address: $('.client-address').val()
		};
		if (!validateClient(clientObj)) {
			return;
		}
		$.ajax({
			url: `/clients/${localStorage.getItem('token')}`,
			data: JSON.stringify(clientObj),
			type: 'POST',
			contentType: 'application/json',
			success: (content) => {
				$('.remove-client-item').remove();
				$('.new.client-item').append(`<button class="go-to-client" value="${content._id}">Client profile</button>
				<button class="delete-client" data-id="${content._id}">Delete client</button>`)
				$('.new.client-item').removeClass('new');
				$('.new.client-name').removeClass('new');
				$('.new.client-address').removeClass('new');
				$('#submit-client').remove();
			}
		});
	});
}

function editClientName() {
	$('body')
	.not('.new')
	.on('blur', '#client-name-input', (e) => {
		if ($(e.target).hasClass('new')) {
			return;
		}
		console.log(e.target.value);
		let clientId = $(e.target).attr('data-id');
		let data = JSON.stringify({ name: e.target.value });
		$.ajax({
			url: `/clients/edit/${clientId}/name/${localStorage.getItem('token')}`,
			data: data,
			type: 'PATCH',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
			}
		});
	});
}

function editClientAddress() {
	$('body')
	.not('.new')
	.on('blur', '#client-address-input', (e) => {
		if ($(e.target).hasClass('new')) {
			return;
		}
		let clientId = $(e.target).attr('data-id');
		let data = JSON.stringify({
			address: e.target.value
		});
		$.ajax({
			url: `clients/edit/${clientId}/address/${localStorage.getItem('token')}`,
			data: data,
			type: 'PATCH',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
			}
		})
	})
}

function patchOnEnter() {
	$('body')
	.on('keypress', '#client-address-input', (e) => {
		if ($(e.target).hasClass('new')) {
			return;
		}
		else if (e.keyCode === 13) {
			console.log('Address entered');
		let clientId = $(e.target).attr('data-id');
		let value = $(e.target).val()
		let data = JSON.stringify({ address: value });
		$.ajax({
			url: `clients/edit/${clientId}/address/${localStorage.getItem('token')}`,
			data: data,
			type: 'PATCH',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
			}
		});
		}
	});
	$('body')
	.on('keypress', '#client-name-input', (e) => {
		if ($(e.target).hasClass('new')) {
			return;
		} else if (e.keyCode === 13) {
			let clientId = $(e.target).attr('data-id');
			let value = $(e.target).val()
			let data = JSON.stringify({ name: value });
			$.ajax({
				url: `clients/edit/${clientId}/name/${localStorage.getItem('token')}`,
				data: data,
				type: 'PATCH',
				contentType: 'application/json',
				success: (content) => {
					console.log(content);
				}
			});
		}
	})
}

function greet() {
	let email = localStorage.getItem('email');
	$('.greeting').text(`Hello, ${email}`);
}

function logOut() {
	$('body').on('click', '.logout', (e) => {
		e.preventDefault;
		localStorage.removeItem('email');
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		console.log('User has been logged out.')
		$('.logout').remove();
		$('.greeting').remove();
		window.location.href = './index.html';
	})
}

function rejectUnauthorized() {
	if (!localStorage.getItem('token')) {
		window.location.href = './index.html'
	}
}

$("#clients").sortable();
$("#clients").disableSelection();
getClientData(renderClients); 
goToClient();
deleteClient();
toggleListView();
toggleCardView();
addNewClient();
removeNewClientItem();
postNewClient();
editClientName();
editClientAddress();
patchOnEnter();
greet();
logOut();
rejectUnauthorized();