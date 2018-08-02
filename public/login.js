'use strict';
console.log("login.js is working");

function logIn() {
	$('.submit').click(event => {
		event.preventDefault();
		let email = $('.email').val();
		let password = $('.password').val();
		console.log(email);
		console.log(password);
		console.log('Form submitted');
		validateLogin(email,password);
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
				window.location.href = './dashboard.html'
			})
			.catch(err => {
				console.log(err);
				alert('Incorrect email or password.');
			});
	});
}

function validateLogin(email, password) {
	if (!validateEmail(email)) {
		// feedback
		alert('Invalid email.')
		return false;
	}
	if (!validatePassword(password)) {
		// feedback
		alert('Invalid password.')
		return false;
	}
	return true;
}

function validateEmail(email) { 	
	let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email); 
}

function validatePassword(password) {
	let re = /(?=.{8,})/;
	return re.test(password);
}

function goToRegister() {
	$(".register").on('click', (e) => {
		window.location.href = `register.html`;
	});
}

logIn();
goToRegister();