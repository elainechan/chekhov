'use strict';

function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/all/${localStorage.getItem('token')}`, callback); // server getting endpoint
}

function renderCases(CASES) {
	console.log(CASES);
	CASES.forEach((item, i) => {
		let dateDisplay = new Date(item.dateOpened);
		let myRegex = /(.*)\ GMT/;
		let match = myRegex.exec(dateDisplay);
		$('#cases').append(`
		<div class="case-item">
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

function goToCaseTasksListener(CASES) {
	// attach button click event to body
	$("body").on("click", "#go-to-case-tasks", function() {
		console.log($(this).val());
		window.location.href = `task-by-case.html?caseId=${$(this).val()}`; // (1) passing a parameter to the URL window.location.href 
	});
}

function goToClientCaseListener(CASES) {
	$("body").on("click", "#go-to-case-client", function() {
		window.location.href = `case-by-client.html?clientId=${$(this).val()}`;
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
linkToAddNewCase();
deleteCase();
// calling REST returns an object/JSON
// get status code
// curl -I -s -L http://localhost:8080/cases | grep "HTTP/1.1"