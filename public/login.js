'use strict';
console.log("login.js is working");
$('form').submit(event => {
	event.preventDefault();
	let email = $('.email').val();
	let password = $('.password').val();
	console.log(email);
	console.log(password);
	console.log('Form submitted');
	$.post(`/auth/login`, {
		email: email,
		password: password
	})
		.then(user => {
			console.log(user);
			// save everything until cache is deleted
			localStorage.setItem('email', user.data.email);
			localStorage.setItem('token', user.data.token);
			localStorage.setItem('userId', user.data.userId);
			window.location.href = 'case.html'
		})
		.catch(err => {
			console.log(err);
		});
});