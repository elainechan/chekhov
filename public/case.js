'use strict';

function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/all/${localStorage.getItem('token')}`, callback); // server getting endpoint
}

function getClientData(callback) {
	$.getJSON(`http://localhost:8080/clients/all/${localStorage.getItem('token')}`, callback);
}

function renderCases(CASES) {
	console.log(CASES);
	CASES.forEach((item, i) => {
		let dateDisplay = new Date(item.dateOpened);
		let myRegex = /(.*)\ GMT/;
		let match = myRegex.exec(dateDisplay);
		$('#cases').append(`
		<div class="case-item case-card">
		<h3>${item.name}</h3>
		<p>Date created: ${match[1]}</p>
		<button id="go-to-case-tasks" name="go-to-case-tasks" value="${item._id}">Go to case</button>
		<button id="go-to-case-client" name="go-to-case-client" value="${item.clientId}">Go to client</button>
		<button class="delete-case" data-id="${item._id}">Delete case</button>
		</div>`);
	});
}

function deleteCase() {
	$('body').on( 'click', '.delete-case', (e) => {
		e.preventDefault;
		let caseId = $('.delete-case').attr('data-id');
		let element = e;
		$.ajax({
			context: e.target,
			url: `/cases/delete/${caseId}/${localStorage.getItem('token')}`,
			type: 'DELETE',
			contentType: 'application/json',
			success: (content) => {
				console.log(content);
				window.location.reload();
			}
		});
		
	});
}

function addNewCase() {
	$('.new-case-button').click((e) => {
		e.preventDefault;
		if ($('.case-item').hasClass('case-list')) {
			$('#cases').prepend(
				`<div class="new case-item case-list">
				<div class="case-name-div">
				<input class="new case-name" id="case-name-input" placeholder="Enter name" data-id="" value="" />
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
				`<div class="new case-item case-card">
				<div class="case-name-div">
				<input class="new case-name" id="case-name-input" placeholder="Enter name" data-id="" value="" />
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
				`<div class="new case-item case-card">
				<div class="case-name-div">
				<input class="new case-name" id="case-name-input" placeholder="Enter name" data-id="" value="" />
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
				$('.new.case-item')
				.append(`<div class="case-client-div">
				${content.clientName}
				</div>`)
				$('.new.case-item').removeClass('new');
				$('.new-case-div').remove();
				$('.case-selection-div').remove();
				$('.toggle-buttons').remove();
				$('#submit-task').remove();
			}
		});
	});
}

function createClientSelection(CLIENTS) {
	CLIENTS.forEach((data => {
		$(".select-existing-client").append(`<option value="${data._id}">${data.name}</option>`);
	}));
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

function goToCaseTasksListener(CASES) {
	// attach button click event to body
	$("body").on("click", "#go-to-case-tasks", function() {
		console.log($(this).val());
		window.location.href = `case-profile.html?caseId=${$(this).val()}`; // (1) passing a parameter to the URL window.location.href 
	});
}

function goToClientCaseListener(CASES) {
	$("body").on("click", "#go-to-case-client", function() {
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

function linkToAddNewCase() {
	$('.new-case-button').click(() => {
		window.location = 'http://localhost:8080/new-case.html';
	});
}

getCaseData(renderCases);
goToCaseTasksListener();
goToClientCaseListener();
toggleListView();
toggleCardView();
//linkToAddNewCase();
deleteCase();
addNewCase();
toggleCreateNewClient();
toggleSelectExistingClient();
postNewCase();
$("#cases").sortable();
$("#cases").disableSelection();
// calling REST returns an object/JSON
// get status code
// curl -I -s -L http://localhost:8080/cases | grep "HTTP/1.1"