'use strict';

var url_string = window.location.href;
var url = new URL(url_string);
var clientId = url.searchParams.get("clientId");
console.log(clientId);

function getCasesByClient(callback) {
	$.getJSON(`http://localhost:8080/cases/client/${clientId}/${localStorage.getItem('token')}`, callback)
}

function renderCasesByClient(CASES) {
	$.ajax({
		url: `clients/${clientId}/${localStorage.getItem('token')}`,
		type: 'GET',
		contentType: 'application/json',
		success: (content) => {
			$('.title').append(`<h2>Client Profile: ${content.client.name}</h2>`)
		}
	});
	if (CASES.cases.length === 0) {
		console.log('No data to display');
	}
	CASES.cases.forEach((item, i) => {
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

getCasesByClient(renderCasesByClient);
goToCase();
toggleListView();
toggleCardView();
$("#cases").sortable();
$("#cases").disableSelection();