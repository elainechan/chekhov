'use strict';
const { scheduleByGroupOrder } = require('../schedule/schedule');
const { TASKLIST1 } = require('../app/helpers');
const expect = require('chai').expect;
const _ = require('lodash');

describe('scheduleByGroupOrder', function() {
	const result = scheduleByGroupOrder(...[TASKLIST1,[]]);
	const flat = _.flatten(result);
	const isArrayEqual = function(x, y) {
		return _(x).differenceWith(y, _.isEqual).isEmpty();
	};

	it('should return an array containing two arrays', function() {
		expect(result).to.be.a('array');
		expect(result[0]).to.be.a('array');
		expect(result[1]).to.be.a('array');
		expect(result[2]).to.be.undefined;
	});
	it('should only contain unique values', function() {
		expect(flat).to.deep.equal(_.intersection(flat));
	});
	it('should contain all values present in the original task list input', function() {
		expect(isArrayEqual(TASKLIST1, flat)).to.be.true;
	});
	it('should have every `groupId` value in the agenda lower than every `groupId` in the remaining task list', function() {
		let _taskList = [];
		let _agenda = [];
		result[0].forEach(task => _taskList.push(task.groupOrder));
		result[1].forEach(task => _agenda.push(task.groupOrder));
		// check if every value in _agenda is less than every value in _taskList
		expect(Math.max(..._agenda) < Math.min(..._taskList)).to.be.true;
	});
});