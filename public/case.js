'use strict';

function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/all/${localStorage.getItem('token')}`, callback); // server getting endpoint
}

function renderCases(CASES) {
	console.log(CASES);
	CASES.forEach((item, i) => {
		$('#cases').append(`
		<div class="case-item">
		<h3>${item.name}</h3>
		<p>Number of tasks: ${item.tasks.length}</p>
		<p>Date created: ${item.dateCreated}</p>
		<p>ID: ${item._id}</p>
		<button name="go-to-case" value="${item._id}">Go to case</button>
		</div>`);
	});
}

function goToCaseTasks(CASES) {
	// attach button click event to body
	$("body").on("click", "button", function() {
		console.log($(this).val());
		window.location.href = `task-by-case.html?caseId=${$(this).val()}`; // (1) passing a parameter to the URL window.location.href 
	});
}
getCaseData(renderCases);
goToCaseTasks();

// calling REST returns an object/JSON
// get status code
// curl -I -s -L http://localhost:8080/cases | grep "HTTP/1.1"