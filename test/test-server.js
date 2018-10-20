const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, closeServer, runServer} = require('../server');
const expect = chai.expect;
const { TEST_DATABASE_URL, PORT } = require('../config');

chai.use(chaiHttp);
let token;
let userId;

function createUser() {
	// register user
	let testUser = {
		email: 'fake@user.com',
		password: 'password'
	}
	return new Promise((resolve, reject) => {
		chai.request(app)
		.post(`/auth/register`)
		.send(testUser)
		.then((res) => {
			// login user
			loginUser()
			.then(() => {
				resolve();
			})
		})
		.catch((err) => {
			reject(err);
		})
	});
}

function loginUser() {
	let testUser = {
		email: 'fake@user.com',
		password: 'password'
	}
	return new Promise((resolve, reject) => {
		chai.request(app)
		.post(`/auth/login`)
		.send(testUser)
		.then((res) => {
			// login user
			token = res.body.data.token;
			resolve();
		})
		.catch((err) => {
			reject(err);
		})
	});
}

describe('tasks', function() {
	// before is called
	// tests are called
	// after is called
	// `done` is calling the tests
	before(function(done) {
		runServer(TEST_DATABASE_URL, PORT)
		.then(() => {
			createUser()
			.then(() => {
				done(); // tests are called
			})
		})
	});
	after(function() {
		return closeServer();
	});
	it('should list tasks on get', function() {
		return chai.request(app)
		.get(`/tasks/all/${token}`)
		.then(function(res) {
			expect(res).to.have.status(200);
		});	
	});
	it('should post task on POST', () => {
		let newTask = {
			name: 'Test Task',
			description: 'Test description'
		};
		return chai.request(app)
		.post(`/tasks/${token}`)
		.send(newTask)
		.then((res) => {
			expect(res).to.have.status(201);
		})
	});

	it('should list cases on get', function() {
		return chai.request(app)
		.get(`/cases/all/${token}`)
		.then(function(res) {
			expect(res).to.have.status(200);
		});	
	});

	it('should post cases on POST', () => {
		let newCase = {
			name: 'Test case'
		};
		return chai.request(app)
		.post(`/cases/${token}`)
		.send(newCase)
		.then((res) => {
			expect(res).to.have.status(201);
		})
	});
});