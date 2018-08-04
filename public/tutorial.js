'use strict';

function validateLogIn() {
	if (localStorage.getItem('token')) {
		$('.username').show();
		$('.auth').hide();
		let email = localStorage.getItem('email');
		$('.greeting').text(`${email}`);
		$('.top-logo>h1>a').attr('href', './dashboard.html');
	} else {
		$('.top-nav').hide();
		$('.username').hide();
		$('.auth').show();
		$('.top-logo>h1>a').attr('href', './index.html');
	}
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
		$('.top-nav').hide();
	})
}

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
		let email = `ger@many.com`;
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
			window.location.href = './dashboard.html'
		})
		.catch(err => {
			console.log(err);
		});
	});

}

validateLogIn();
logOut();
goToRegister();
goToLogin();
loginDemo();