'use strict';

function register() {
	$('button').click(event => {
		event.preventDefault();
		let email = $('.email').val();
		let password = $('.password').val();
		console.log(email);
		console.log(password);
		console.log('Form submitted');
		if (!validateEmail(email)) {
			// feedback
			alert('Invalid email address.');
			return;
		}
		if (!validatePassword(password)) {
			// feedback
			alert('Password must be at least 8 characters.')
			return;
		}
		$.post(`/auth/register`, {
			email: email,
			password: password
		})
			.then(user => {
				console.log(user);
				window.location.href = `login.html`
			})
			.catch(err => {
				console.log(err);
			});
	});
}

function validateEmail(email) { 	
	let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email); 
}

function validatePassword(password) {
	let re = /(?=.{8,})/;
	return re.test(password);
}

register();