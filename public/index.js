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
		let email = `ger@many.com`;
		let password = `5678`;
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
			window.location.href = 'task.html'
		})
		.catch(err => {
			console.log(err);
		});
	});

}

goToRegister();
goToLogin();
loginDemo();