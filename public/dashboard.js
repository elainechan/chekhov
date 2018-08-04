'use strict';

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

function getUserTaskData(callback) {
	console.log('getUserTaskData')
	$.getJSON(`/tasks/user/${userId}/${token}`, callback);
}

function renderTaskStats(TASKS) {
	console.log('renderTaskStats')
	let taskCount = TASKS.length;
	if (taskCount === undefined) {
		taskCount = 0;
	}
	$('.task-section').append(`<div class="task-count">
			<div class="stats-header">You have</div>
			<div class="stats-body">${taskCount}</div> 
			<div class="stats-footer">tasks</div>
			</div>`);
	/*
	$.ajax({ // task count
		url: `/tasks/count/${token}`,
		type: 'GET',
		contentType: 'application/json',
		success: (content) => {
			console.log(content.taskCount);
			$('.task-section').append(`<div class="task-count">
			<div class="stats-header">You have</div>
			<div class="stats-body">${content.taskCount}</div> 
			<div class="stats-footer">tasks</div>
			</div>`);
		}
	});
	*/
}

function getUserCaseData(callback) {
	console.log('getUserCaseData')
	$.getJSON(`/cases/user/${userId}/${token}`, callback);
}

function renderCaseStats(CASES) {
	console.log('renderCaseStats');
	let caseCount = CASES.length;
	if (caseCount === undefined) {
		caseCount = 0;
	}
	$('.case-section').append(`<div class="case-count">
			<div class="stats-header">You have</div> 
			<div class="stats-body">${caseCount}</div> 
			<div class="stats-footer">cases</div>
			</div>`);
	
	/*
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
	});
	*/

}

function getUserClientData(callback) {
	console.log('getUserClientData');
	$.getJSON(`/clients/user/${userId}/${token}`, callback);
}

function renderClientStats(CLIENTS) {
	console.log('renderClientStats');
	let clientCount = CLIENTS.length;
	if (clientCount === undefined) {
		clientCount = 0;
	}
	$('.client-section').append(`<div class="client-count">
			<div class="stats-header">You have</div>
			<div class="stats-body">${clientCount}</div> 
			<div class="stats-footer">clients</div>
			</div>`)
	/*
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
	*/
}

function goToClientCaseListener(CASES) {
	$("body").on("click", "#go-to-case-client", function() {
		window.location.href = `client-profile.html?clientId=${$(this).val()}`;
	});
}

function greet() {
	let email = localStorage.getItem('email');
	$('.greeting').text(`${email}`);
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
getUserTaskData(renderTaskStats);
getUserCaseData(renderCaseStats);
getUserClientData(renderClientStats);
//goToClientCaseListener();
//goToCase();
greet();
logOut();
rejectUnauthorized();