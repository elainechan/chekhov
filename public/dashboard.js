function getTaskData(callback) {
	$.getJSON(`/tasks/all/${localStorage.getItem('token')}`, callback);
}

function renderTasksInTab(TASKS) {
	TASKS.forEach((item, i) => {
		$('#tasks-content').append(
			`<div class='task-list task-item'>
			<div class="task-name">
			<h3>${item.name}</h3></div>
			<div class="task-description"><p>${item.description}</p></div>
			<div class="case-name"><p>${item.caseId.name}</p></div>
			<div class="go-to-case-div">
			<button class="go-to-case" id="go-to-case-tasks" value="${item.caseId._id}" data-id="${item.caseId._id}">Go to case</button>
			</div>
			</div>`
		);
	});
}

function getCaseData(callback) {
	$.getJSON(`/cases/all/${localStorage.getItem('token')}`, callback);
}

function renderCasesInTab(CASES) {
	CASES.forEach((item, i) => {
		
		$.ajax({
			url: `/tasks/case/${item._id}/count/${localStorage.getItem('token')}`,
			type: 'GET',
			contentType: 'application/json',
			success: (content) => {
				//debugger
				let dateDisplay = new Date(item.dateOpened);
				let myRegex = /(.*)\ GMT/;
				let match = myRegex.exec(dateDisplay);
				$('#cases-content').append(`
				<div class="case-item">
				<h3>${item.name}</h3>
				<div class="task-count" data-id="${item._id}">Task count: ${content.taskCount}
				</div>
				<div class="case-date">
				<p>Opened: ${match[1]}</p>
				</div>
				<div class="go-to-case-div">
				<button class="go-to-case" id="go-to-case-tasks" value="${item._id}" data-id="${item._id}">Go to case</button>
				<button id="go-to-case-client" name="go-to-case-client" value="${item.clientId._id}">Go to client</button>
				</div>
				`);
			}
		});
	});
}

function goToCase(CASES) {
	$("body").on("click", ".go-to-case", function() {
		console.log($(this).val());
		window.location.href = `case-profile.html?caseId=${$(this).val()}`; // (1) passing a parameter to the URL window.location.href 
	});
}

function getClientData(callback) {
	$.getJSON(`/clients/all/${localStorage.getItem('token')}`, callback);
}

function renderClientsInTab(CLIENTS) {
	CLIENTS.forEach((item, i) => {
		$('#clients-content').append(`
		<div class="client-item">
		<div class="client-name" data-id="${item._id}">
		<h3>${item.name}</h3>
		</div>
		<div class="client-address" data-id="${item._id}">
		<p>${item.address}</p>
		</div>
		<button name="go-to-client" value="${item._id}">Go to client</button>
		</div>`);
	});
}

function goToClientCaseListener(CASES) {
	$("body").on("click", "#go-to-case-client", function() {
		window.location.href = `client-profile.html?clientId=${$(this).val()}`;
	});
}

getTaskData(renderTasksInTab);
getCaseData(renderCasesInTab);
getClientData(renderClientsInTab);
$( "#tabs" ).tabs();
goToClientCaseListener();
goToCase();