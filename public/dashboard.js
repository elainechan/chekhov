function getTaskData(callback) {
	$.getJSON(`/tasks/all/${localStorage.getItem('token')}`, callback);
}

function renderTaskStats(TASKS) {
	$.ajax({ // task count
		url: `/tasks/count/${localStorage.getItem('token')}`,
		type: 'GET',
		contentType: 'application/json',
		success: (content) => {
			console.log(content.taskCount);
			$('.task-section').append(`<div class="task-count">
			<div class="stats-header">You have</div>
			<div class="stats-body">${content.taskCount}</div> 
			<div class="stats-footer">tasks</div>
			</div>`)
			/*
			<div class="case-count">
			<div class="stats-header">You have</div> 
			<div class="stats-body">${content.caseCount}</div> 
			<div class="stats-footer">cases</div>
			</div>
			*/
		}
	});
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
			<button class="go-to-case" id="go-to-case-tasks" value="${item.caseId._id}" data-id="${item.caseId._id}">Case profile</button>
			</div>
			</div>`
		);
	});
}

function getCaseData(callback) {
	$.getJSON(`/cases/all/${localStorage.getItem('token')}`, callback);
}

function renderCaseStats(CASES) {
	$.ajax({
		url: `/cases/count/${localStorage.getItem('token')}`,
		type: 'GET',
		contentType: 'application/json',
		success: (content) => {
			console.log(content.caseCount);
			$('.case-section').append(`<div class="case-count">
			<div class="stats-header">You have</div> 
			<div class="stats-body">${content.caseCount}</div> 
			<div class="stats-footer">cases</div>
			</div>`);
		}
	})
}

function renderCasesInTab(CASES) {
	CASES.forEach((item, i) => {
		
		$.ajax({
			url: `/tasks/case/${item._id}/count/${localStorage.getItem('token')}`,
			type: 'GET',
			contentType: 'application/json',
			success: (content) => {
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
				<button class="go-to-case" id="go-to-case-tasks" value="${item._id}" data-id="${item._id}">Case profile</button>
				<button id="go-to-case-client" name="go-to-case-client" value="${item.clientId._id}">Client profile</button>
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

function renderClientStats(CLIENTS) {
	$.ajax({ 
		url: `/clients/count/${localStorage.getItem('token')}`,
		type: 'GET',
		contentType: 'application/json',
		success: (content) => {
			console.log(content.clientCount);
			$('.client-section').append(`<div class="client-count">
			<div class="stats-header">You have</div>
			<div class="stats-body">${content.clientCount}</div> 
			<div class="stats-footer">clients</div>
			</div>`)
		}
	});
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
		<button name="go-to-client" value="${item._id}">Client profile</button>
		</div>`);
	});
}

function goToClientCaseListener(CASES) {
	$("body").on("click", "#go-to-case-client", function() {
		window.location.href = `client-profile.html?clientId=${$(this).val()}`;
	});
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

//getTaskData(renderTasksInTab);
getTaskData(renderTaskStats);
//getCaseData(renderCasesInTab);
getCaseData(renderCaseStats);
//getClientData(renderClientsInTab);
getClientData(renderClientStats);
goToClientCaseListener();
goToCase();
greet();
logOut();
rejectUnauthorized();