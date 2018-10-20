'use strict';

function goToRegister() {
	$(".register").on('click', (e) => {
		window.location.href = `register.html`;
	});
}

function goToLogin() {
	$(".login").on('click', (e) => {
		window.location.href = `login.html`;
	});
}

function loginDemo() {
	$('.demo').click(event => {
		event.preventDefault();
		let email = `sherlock@holmes.com`;
		let password = `12345678`;
		console.log(email);
		console.log(password);
		console.log('Form submitted');
		Promise.resolve(
			$.post(`/auth/login`, {
			email: email,
			password: password
			})
		)
		.then(user => {
			console.log(user);
			// save everything until cache is deleted
			localStorage.setItem('email',user.data.email);
			localStorage.setItem('token',user.data.token);
			localStorage.setItem('userId',user.data.userId);
			window.location.href = 'dashboard.html'
		})
		.catch(err => {
			console.log(err);
		});
	});

}

function goToTutorials() {
	$('.tutorials').click(event => {
		event.preventDefault();
		window.location.href = './tutorial.html';
	})
}

function goToGithub() {
	$('.github').click(event => {
		event.preventDefault();
		window.location.href = 'https://github.com/elainechan/chekhov';
	})
}

goToRegister();
goToLogin();
loginDemo();
goToTutorials();
goToGithub();