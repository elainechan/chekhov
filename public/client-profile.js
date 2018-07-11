'use strict';

var url_string = window.location.href;
var url = new URL(url_string);
var clientId = url.searchParams.get("clientId");
var clientName;

function getCasesByClient(callback) {
	$.getJSON(`/cases/client/${clientId}/${localStorage.getItem('token')}`, callback)
}

function renderCasesByClient(CASES) {
	$.ajax({
		url: `clients/${clientId}/${localStorage.getItem('token')}`,
		type: 'GET',
		contentType: 'application/json',
		success: (content) => {
			clientName = content.client.name;
			$('.title').append(`<h2>${content.client.name}</h2>
			<h3>${content.client.address}</h3>`)
		}
	});
	CASES.cases.forEach((item, i) => {
		let dateDisplay = new Date(item.dateOpened);
		let myRegex = /(.*)\ GMT/;
		let match = myRegex.exec(dateDisplay);
		$('#cases').append(`
		<div class="case-item case-card">
		<h3>${item.name}</h3>
		<p>Opened: ${match[1]}</p>
		<button id="go-to-case-tasks" name="go-to-case-tasks" value="${item._id}">Go to case</button>
		<button class="delete-case" data-id="${item._id}">Delete case</button>
		</div>
		`);
	});
}

function goToCase(CASES) {
	// attach button click event to body
	$("body").on("click", "#go-to-case-tasks", function() {
		console.log($(this).val());
		window.location.href = `case-profile.html?caseId=${$(this).val()}`; // (1) passing a parameter to the URL window.location.href 
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

function addNewCase() {
	$('.new-case-button').click((e) => {
		e.preventDefault;
		if ($('.case-item').hasClass('case-list')) {
			$('#cases').prepend(
				`<div class="new case-item case-list">
				<div class="case-name-div">
				<textarea class="new case-name" id="case-name-input" placeholder="Enter name" data-id=""></textarea>
				</div>
				<button class="submit-button" id="submit-task">Submit</button>
				</div>`
			);
		} else if (($('.case-item').hasClass('case-card'))) {
			$('#cases').prepend(
				`<div class="new case-item case-card">
				<div class="case-name-div">
				<textarea class="new case-name" id="case-name-input" placeholder="Enter name" data-id=""></textarea>
				</div>
				<button class="submit-button" id="submit-case">Submit</button>
				</div>`
			);
		} else {
			$('#cases').prepend(
				`<div class="new case-item case-card">
				<div class="case-name-div">
				<textarea class="new case-name" id="case-name-input" placeholder="Enter name" data-id=""></textarea>
				</div>
				<button class="submit-button" id="submit-case">Submit</button>
				</div>`
			);
		}
	});
}

function postNewCase() {
	$('body').on('click','#submit-case',(e) => {
		e.preventDefault();
		var caseObj = {
			name: $('.new.case-name').val(),
			clientId: clientId
		};
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
				<button id="go-to-case" name="go-to-case" value="${content.case._id}">Go to case</button>
				<button class="delete-case" data-id="${content.case._id}">Delete case</button>
				</div>
				`);
				$('.new.case-item').removeClass('new');
				$('#submit-case').remove();	
			}
		});
	});
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

getCasesByClient(renderCasesByClient);
goToCase();
addNewCase();
postNewCase();
deleteCase();
toggleListView();
toggleCardView();
$("#cases").sortable();
$("#cases").disableSelection();