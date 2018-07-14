'use strict';

function getCaseData(callback) {
	$.getJSON(`/cases/all/${localStorage.getItem('token')}`, callback); // server getting endpoint
}

function getClientData(callback) {
	$.getJSON(`/clients/all/${localStorage.getItem('token')}`, callback);
}

function renderCases(CASES) {
	console.log(CASES);
	CASES.forEach((item, i) => {
		let dateDisplay = new Date(item.dateOpened);
		let myRegex = /(.*)\ GMT/;
		let match = myRegex.exec(dateDisplay);
		$('#cases').append(`
		<div class="case-item case-card" data-id="${item._id}" client="${item.clientId._id}">
		<div class="case-name-div">
		<textarea class="case-name" data-id="${item._id}" value="${item.name}">${item.name}</textarea>
		</div>
		<div class="case-client">
		<div class="client-selection-div mdc-select">
		<select class="select-existing-client"></select>
		</div>
		<div class="case-client-name" data-id="${item.clientId._id}">${item.clientId.name}</div>
		</div>
		<div class="case-date">Opened: ${match[1]}</div>
		<button id="go-to-case" name="go-to-case" value="${item._id}">Go to case</button>
		<button id="go-to-client" name="go-to-client" value="${item.clientId._id}">Go to client</button>
		<button class="delete-case" data-id="${item._id}">Delete case</button>
		</div>`);
	});
	getClientData(createClientSelection);
}

function deleteCase() {
	$('body').on( 'click', '.delete-case', (e) => {
		e.preventDefault();
		let caseId = e.currentTarget.attributes[1].nodeValue;
		e.currentTarget.parentElement.remove();
		$.ajax({
			url: `/cases/delete/${caseId}/${localStorage.getItem('token')}`,
			type: 'DELETE',
			contentType: 'application/json',
			success: (content) => {
				console.log("Case deleted");
			}
		});
		
	});
}

function addNewCase() {
	$('.new-case-button').click((e) => {
		e.preventDefault;
		if ($('.case-item').hasClass('case-list')) {
			$('#cases').prepend(
				`<div class="new case-item case-list" data-id="" client="">
				<div class="case-name-div">
				<textarea class="new case-name" placeholder="Enter name" data-id=""></textarea>
				</div>
				<div class="client-selection-div mdc-select" style="display:none;">
				<select class="select-existing-client"></select>
				</div>
				<div class="new-client-div">
				<input class="new-client-input" type="text" name="client-name" value="" placeholder="Enter client name">
				</div>
				<div class="toggle-buttons">
				<button class="existing-client-button">Select Existing Client</button>
				<button class="new-client-button" style="display: none;">Create New Client</button>
				</div>
				<button class="submit-button" id="submit-task">Submit</button>
				</div>`
			);
		} else if (($('.case-item').hasClass('case-card'))) {
			$('#cases').prepend(
				`<div class="new case-item case-card" data-id="" client="">
				<div class="case-name-div">
				<textarea class="new case-name" id="case-name-input" placeholder="Enter name" data-id=""></textarea>
				</div>
				<div class="client-selection-div mdc-select" style="display:none;">
				<select class="select-existing-client"></select>
				</div>
				<div class="new-client-div">
				<input class="new-client-input" type="text" name="client-name" value="" placeholder="Enter client name">
				</div>
				<div class="toggle-buttons">
				<button class="existing-client-button">Select Existing Client</button>
				<button class="new-client-button" style="display: none;">Create New Client</button>
				</div>
				<button class="submit-button" id="submit-case">Submit</button>
				</div>`
			);
		} else {
			$('#cases').prepend(
				`<div class="new case-item case-card" data-id="" client="">
				<div class="case-name-div">
				<textarea class="new case-name" id="case-name-input" placeholder="Enter name" data-id=""></textarea>
				</div>
				<div class="client-selection-div mdc-select" style="display:none;">
				<select class="select-existing-client"></select>
				</div>
				<div class="new-client-div">
				<input class="new-client-input" type="text" name="client-name" value="" placeholder="Enter client name">
				</div>
				<div class="toggle-buttons">
				<button class="existing-client-button">Select Existing Client</button>
				<button class="new-client-button" style="display: none;">Create New Client</button>
				</div>
				<button class="submit-button" id="submit-case">Submit</button>
				</div>`
			);
		}
		getClientData(createClientSelection);
	});
}

function postNewCase() {
	$('body').on('click','#submit-case',(e) => {
		e.preventDefault();
		/* configure the json of request */
		console.log(`New case name: ${$('.case-name').val()}`);
		if ($(".new-client-div").attr("style") === "display: none;") {
			var caseObj = {
				name: $('.case-name').val(),
				clientId: $('option:selected', this).attr('value')
			};
		} else {
			var caseObj = {
				name: $('.case-name').val(),
				clientId: null,
				clientName: $(".new-client-input").val()
			}
		}
		$.ajax({
			url: `/cases/${localStorage.getItem('token')}`,
			data: JSON.stringify(caseObj),
			type: 'POST',
			contentType: 'application/json',
			success: (content) => {
				console.log('New case posted');
				let dateDisplay = new Date(content.case.dateOpened);
				let myRegex = /(.*)\ GMT/;
				let match = myRegex.exec(dateDisplay);
				$('.new.case-item')
				.append(`<div class="case-date">Opened: ${match[1]}</div>
				<div class="case-client" data-id="${content.case.clientId}">
				<div class="client-selection-div mdc-select">
				<select class="select-existing-client"></select>
				</div>
				<div class="case-client-name">
				Client: ${content.clientName}
				</div>
				</div>
				<button id="go-to-case" name="go-to-case" value="${content.case._id}">Go to case</button>
				<button id="go-to-client" name="go-to-client" value="${content.case.clientId}">Go to client</button>
				<button class="delete-case" data-id="${content.case._id}">Delete case</button>
				</div>
				`);
				$('.new.case-item').attr('data-id', `${content.case._id}`)
				$('.new.case-item').attr('client', `${content.case.clientId}`);
				$('.new.case-item').removeClass('new');
				$('.new-client-div').remove();
				$('.client-selection-div').remove();
				$('.toggle-buttons').remove();
				$('#submit-case').remove();
				
			}
		});
	});
}

function createClientSelection(CLIENTS) {
	let caseList = $('.case-item');
	$(caseList).each((i, caseItem) => {
		let caseClientId = $(caseItem).attr('client');
		let caseSelect = $(caseItem).find('.select-existing-client')[0];
		CLIENTS.forEach((data) => {
			if (caseClientId === data._id) {
				$(caseSelect).append(`<option class="client-option" value="${data._id}" selected>${data.name}</option>`);
			} else {
				$(caseSelect).append(`<option class="client-option" value="${data._id}">${data.name}</option>`);
			}
		});
	});
}

function toggleCreateNewClient() {
	$('body').on('click', '.new-client-button', (e) => {
		e.preventDefault();
		$('.new-client-div').show();
		$('.client-selection-div').hide();
		$('.new-client-button').hide();
		$('.existing-client-button').show();
	});
}
function toggleSelectExistingClient() {
	$('body').on('click','.existing-client-button',(e) => {
		e.preventDefault();
		$('.new-client-div').hide();
		$('.client-selection-div').show();
		$('.new-client-button').show();
		$('.existing-client-button').hide();
	});
}

function goToCase(CASES) {
	// attach button click event to body
	$("body").on("click", "#go-to-case", function() {
		console.log($(this).val());
		window.location.href = `case-profile.html?caseId=${$(this).val()}`; // (1) passing a parameter to the URL window.location.href 
	});
}

function goToClient(CASES) {
	$("body").on("click", "#go-to-client", function() {
		window.location.href = `client-profile.html?clientId=${$(this).val()}`;
	});
}

function toggleListView() {
	// step 1: get click listener
		$(".list-button").on("click", function() {
			// remove one class and add another
			$(".case-item").removeClass("case-card").addClass("case-list");
		});
	}

function toggleCardView() {
	$(".card-button").on("click", function() {
		// remove one class and add another
		$(".case-item").removeClass("case-list").addClass("case-card");
	});
}

function editCase() {
	$('body')
	.not('.new')
	.on('blur', '#task-name-input', (e) => {
		if ($(e.target).hasClass('new')) {
			return;
		}
		console.log(e.target.value);
		let taskId = $(e.target).attr('data-id');
		let data = JSON.stringify({ name: e.target.value });
		$.ajax({
			url: `/tasks/edit/${taskId}/name/${localStorage.getItem('token')}`,
			data: data,
			type: 'PATCH',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
			}
		});
	});
}

function editCaseClient() {
	$('body').on('change', '.select-existing-client', (e) => {
		e.preventDefault;
		let selected = $(e.currentTarget).find(':selected');
		let caseId = $(e.currentTarget).parent().parent().parent().attr('data-id');
		let clientId = $(e.currentTarget).find(':selected').attr('value');
		let data = JSON.stringify({
			clientId: clientId
		});
		$.ajax({
			url: `cases/edit/${caseId}/client/${localStorage.getItem('token')}`,
			data: data,
			type: 'PUT',
			contentType: 'application/json',
			success: (content) => {
				debugger
				console.log(content);
			}
		})
	});
}

function editCaseName() {
	$('body')
	.not('.new')
	.on('blur', '.case-name', (e) => {
		if ($(e.target).hasClass('new')) {
			return;
		}
		console.log(e.target.value);
		let caseId = $(e.target).attr('data-id');
		let data = JSON.stringify({ name: e.target.value });
		$.ajax({
			url: `/cases/edit/${caseId}/name/${localStorage.getItem('token')}`,
			data: data,
			type: 'PATCH',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
			}
		});
	});
}

getCaseData(renderCases);
goToCase();
goToClient();
toggleListView();
toggleCardView();
deleteCase();
addNewCase();
toggleCreateNewClient();
toggleSelectExistingClient();
postNewCase();
editCaseClient();
editCaseName();
$("#cases").sortable();
$("#cases").disableSelection();
// calling REST returns an object/JSON
// get status code
// curl -I -s -L http://localhost:8080/cases | grep "HTTP/1.1"