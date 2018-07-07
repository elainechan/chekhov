const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, closeServer, runServer} = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('tasks', function() {
	it('should list tasks on get', function() {
		return chai.request(app)
		.get('/tasks')
		.then(function(res) {
			expect(res.body.length).to.be.at.least(1);
		});
	});
});