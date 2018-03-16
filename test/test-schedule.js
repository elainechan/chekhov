'use strict';
const { scheduleByGroupOrder } = require('../schedule/schedule');
const { TASKLIST1 } = require('../app/helpers');
const expect = require('chai').expect;
const _ = require('lodash');

describe('scheduleByGroupOrder', function() {
	const result = scheduleByGroupOrder(TASKLIST1,[]);
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
		let rest = [];
		let sked = [];
		result[0].forEach(task => result.push(task.groupOrder));
		result[1].forEach(task => sked.push(task.groupOrder));

	});
});