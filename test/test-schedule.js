'use strict';
const { TASKLIST, findTasksInGroups, findLongestIdle, findTasksWithLongestIdle, findStrongestPriority, findTasksWithStrongestPriority } = require('../app/schedule');
const expect = require('chai').expect;

// tasks in groups
describe('findTasksInGroups(taskList)', function() {
	it('should return array containing ids of tasks that belong in groups', function() {
		list1 = [{id:'v'},{id:'w', groupId:'alpha'},{id:'x', groupId:'bravo'},{id:'y',groupId:'alpha'},{id:'z',groupId:'bravo'}];
		list2 = [{id:'a',groupId:'tango'},{id:'b'},{id:'c',groupId:'tango'},{id:'d'}];
		expect(findTasksInGroups(list1)).to.be.a('array');
		expect(findTasksInGroups(list1)).to.deep.equal(['w','x','y','z']);
		expect(findTasksInGroups(list2)).to.be.a('array');
		expect(findTasksInGroups(list2)).to.deep.equal(['a','c']);
	});
});

// longest idle time
describe('findLongestIdle(taskList)', function() {
	it('should return largest idle time number', function() {
		let list1 = [{idle:1},{idle:2},{idle:3}];
		let list2 = [{idle:10},{idle:20},{idle:100}]
		expect(findLongestIdle(list1)).to.be.a('number');
		expect(findLongestIdle(list1)).to.equal(3);
		expect(findLongestIdle(list2)).to.be.a('number');
		expect(findLongestIdle(list2)).to.equal(100);
	});
});
// get array containing ids of tasks with equal longest idle time
describe('findTasksWithLongestIdle(taskList)', function() {
	it('should return an array containing id(s) of tasks that match the longest idle time', function() {
		let list1 = [{id:'x',idle:10},{id:'y',idle:1000},{id:'z',idle:1000}];
		let list2 = [{id:'a',idle:1},{id:'b',idle:120},{id:'z',idle:50}];
		expect(findTasksWithLongestIdle(list1)).to.be.a('array');
		expect(findTasksWithLongestIdle(list1)).to.deep.equal(['y', 'z']);
		expect(findTasksWithLongestIdle(list2)).to.be.a('array');
		expect(findTasksWithLongestIdle(list2)).to.deep.equal(['b']);
	});
});
// find strongest priority level
describe('findStrongestPriority(taskList)', function() {
	it('should return highest priority level, a number', function() {
		let list1 = [{id:'x',priority:1},{id:'y',priority:2},{id:'z',priority:3}];
		let list2 = [{id:'a',priority:3},{id:'b',priority:2},{id:'z',priority:4}];
		expect(findStrongestPriority(list1)).to.be.a('number');
		expect(findStrongestPriority(list1)).to.equal(1);
		expect(findStrongestPriority(list2)).to.be.a('number');
		expect(findStrongestPriority(list2)).to.equal(2);
	});
});
// get array containing ids of tasks with equal strongest priority level
describe('findTasksWithStrongestPriority', function() {
	it('should return an array containing id(s) of tasks that match the highest priority level', function() {
		let list1 = [{id:'x',priority:1},{id:'y',priority:2},{id:'z',priority:2}];
		let list2 = [{id:'a',priority:2},{id:'b',priority:2},{id:'z',priority:4}];
		expect(findTasksWithStrongestPriority(list1)).to.be.a('array');
		expect(findTasksWithStrongestPriority(list1)).to.deep.equal(['x']);
		expect(findTasksWithStrongestPriority(list2)).to.be.a('array');
		expect(findTasksWithStrongestPriority(list2)).to.deep.equal(['a', 'b']);
	});
});