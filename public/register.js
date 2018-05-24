'use strict';
console.log("register.js is working");
$('button').click(event => {
	event.preventDefault();
	let email = $('.email').val();
	let password = $('.password').val();
	console.log(email);
	console.log(password);
	console.log('Form submitted');
	$.post(`/auth/register`, {
		email: email,
		password: password
	})
		.then(user => {
			console.log(user);
		})
		.catch(err => {
			console.log(err);
		});
});