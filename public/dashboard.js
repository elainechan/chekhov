function getTaskData(callback) {
	$.getJSON(`http://localhost:8080/tasks/all/${localStorage.getItem('token')}`, callback);
}

function renderTasksInTab(TASKS) {
	TASKS.forEach((item, i) => {
		$('#tasks-content').append(
			`<div class='task-list task-item'>
			<div>
			<h3>${item.name}</h3>
			</div>
			<div>
			<p>Description: ${item.description}
			</p>
			</div>
			<div>
			<p>ID: ${item._id}</p>
			</div>
			</div>`
		);
	});
}

function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/all/${localStorage.getItem('token')}`, callback);
}

function renderCasesInTab(CASES) {
	CASES.forEach((item, i) => {
		$('#cases-content').append(`
		<div class="case-item">
		<h3>${item.name}</h3>
		<p>Number of tasks: ${item.tasks.length}</p>
		<p>Date created: ${item.dateCreated}</p>
		<p>ID: ${item._id}</p>
		<button id="go-to-case-tasks" name="go-to-case-tasks" value="${item._id}">Go to case</button>
		<button id="go-to-case-client" name="go-to-case-client" value="${item.clientId}">Go to client</button>
		</div>
		`);
	});
}

function getClientData(callback) {
	$.getJSON(`http://localhost:8080/clients/all/${localStorage.getItem('token')}`, callback);
}

function renderClients(CLIENTS) {
	console.log(CLIENTS);
	CLIENTS.forEach((item, i) => {
		$('#clients-content').append(`
		<div class="client-item">
		<h3>${item.name}</h3>
		<p>Address: ${item.address}</p>
		<p>ID: ${item._id}</p>
		<button name="go-to-client" value="${item._id}">Go to client</button>
		</div>`);
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

getTaskData(renderTasksInTab);
getCaseData(renderCasesInTab);
getClientData(renderClients);
$( "#tabs" ).tabs();
goToCaseTasksListener();
goToClientCaseListener();