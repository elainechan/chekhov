'use strict';
const { TASKLIST, findTasksInGroups, findSortedUniqueGroupNames, findTasksBySortedGroupOrder,findEarliestGroupOrder, findTasksByEarliestGroupOrder, findLongestIdle, findTasksWithLongestIdle, findStrongestPriority, findTasksWithStrongestPriority } = require('../app/schedule');
const expect = require('chai').expect;

// array of task objects that belong in groups
describe('findTasksInGroups(taskList)', function() {
	it('should return array containing task objects that belong in groups', function() {
		let list1 = [{id:'v'},{id:'w',groupId:'alpha',groupOrder:2},{id:'x',groupId:'bravo',groupOrder:1},{id:'y',groupId:'alpha',groupOrder:1},{id:'z',groupId:'bravo',groupOrder:2}];
		let list2 = [{id:'a',groupId:'tango',groupOrder:2},{id:'b'},{id:'c',groupId:'tango',groupOrder:1},{id:'d'}];
		expect(findTasksInGroups(list1)).to.be.a('array');
		expect(findTasksInGroups(list1)).to.deep.equal([{id:'w',groupId:'alpha',groupOrder:2},{id:'x',groupId:'bravo',groupOrder:1},{id:'y',groupId:'alpha',groupOrder:1},{id:'z',groupId:'bravo',groupOrder:2}]);
		expect(findTasksInGroups(list2)).to.be.a('array');
		expect(findTasksInGroups(list2)).to.deep.equal([{id:'a',groupId:'tango',groupOrder:2},{id:'c',groupId:'tango',groupOrder:1}]);
	});
});
// array of sorted unique group names
describe('findSortedUniqueGroupNames(taskList)', function() {
	it('should return sorted array of unique group names', function() {
		let list1 = [{id:'v'},{id:'w',groupId:'alpha',groupOrder:2},{id:'x',groupId:'bravo',groupOrder:1},{id:'y',groupId:'alpha',groupOrder:1},{id:'z',groupId:'bravo',groupOrder:2}];
		let list2 = [{id:'a',groupId:'tango',groupOrder:2},{id:'b'},{id:'c',groupId:'tango',groupOrder:1},{id:'d'},{id:'e',groupId:'foxtrot',groupOrder:2},{id:'f',groupId:'foxtrot',groupOrder:1}];
		expect(findSortedUniqueGroupNames(list1)).to.be.a('array');
		expect(findSortedUniqueGroupNames(list1)).to.deep.equal(['alpha','bravo']);
		expect(findSortedUniqueGroupNames(list2)).to.be.a('array');
		expect(findSortedUniqueGroupNames(list2)).to.deep.equal(['foxtrot','tango']);
	});
});
// array of tasks belonging in groups, sorted by group name and group order
describe('findTasksBySortedGroupOrder(taskList)', function() {
	it('should return an array of tasks belonging in groups, sorted by group name and group order', function() {
		let list1 = [{id:'v'},{id:'w',groupId:'alpha',groupOrder:2},{id:'x',groupId:'bravo',groupOrder:1},{id:'y',groupId:'alpha',groupOrder:1},{id:'z',groupId:'bravo',groupOrder:2}];
		let list2 = [{id:'a',groupId:'tango',groupOrder:2},{id:'b'},{id:'c',groupId:'tango',groupOrder:1},{id:'d'},{id:'e',groupId:'foxtrot',groupOrder:2},{id:'f',groupId:'foxtrot',groupOrder:1}];
		expect(findTasksBySortedGroupOrder(list1)).to.be.a('array');
		expect(findTasksBySortedGroupOrder(list1)).to.deep.equal([{ id: 'y', groupId: 'alpha', groupOrder: 1 },
		{ id: 'w', groupId: 'alpha', groupOrder: 2 },
		{ id: 'x', groupId: 'bravo', groupOrder: 1 },
		{ id: 'z', groupId: 'bravo', groupOrder: 2 }])
		expect(findTasksBySortedGroupOrder(list2)).to.be.a('array');
		expect(findTasksBySortedGroupOrder(list2)).to.deep.equal([{ id: 'f', groupId: 'foxtrot', groupOrder: 1 },
		{ id: 'e', groupId: 'foxtrot', groupOrder: 2 },
		{ id: 'c', groupId: 'tango', groupOrder: 1 },
		{ id: 'a', groupId: 'tango', groupOrder: 2 }])
	});
});
// earliest group order number
describe('findEarliestGroupOrder(taskList)', function() {
	it('should return lowest groupOrder number', function() {
		let list1 = [{id:'v'},{id:'w',groupId:'alpha',groupOrder:2},{id:'x',groupId:'bravo',groupOrder:1},{id:'y',groupId:'alpha',groupOrder:1},{id:'z',groupId:'bravo',groupOrder:2}];
		let list2 = [{id:'a',groupId:'tango',groupOrder:2},{id:'b'},{id:'c',groupId:'tango',groupOrder:1},{id:'d'},{id:'e',groupId:'foxtrot',groupOrder:2},{id:'f',groupId:'foxtrot',groupOrder:1}];
		expect(findEarliestGroupOrder(list1)).to.be.a('number');
		expect(findEarliestGroupOrder(list1)).to.equal(1);
		expect(findEarliestGroupOrder(list2)).to.be.a('number');
		expect(findEarliestGroupOrder(list2)).to.equal(1);
	});
});
// array of task object(s) with earliest group order
describe('findTasksByEarliestGroupOrder(taskList)', function() {
	it('should return an array of task object(s) with earliest group order', function() {
		let list1 = [{id:'v'},{id:'w',groupId:'alpha',groupOrder:2},{id:'x',groupId:'bravo',groupOrder:1},{id:'y',groupId:'alpha',groupOrder:1},{id:'z',groupId:'bravo',groupOrder:2}];
		let list2 = [{id:'a',groupId:'tango',groupOrder:2},{id:'b'},{id:'c',groupId:'tango',groupOrder:1},{id:'d'},{id:'e',groupId:'foxtrot',groupOrder:2},{id:'f',groupId:'foxtrot',groupOrder:1}];
		expect(findTasksByEarliestGroupOrder(list1)).to.be.a('array');
		expect(findTasksByEarliestGroupOrder(list1)).to.deep.equal([{ id: 'x', groupId: 'bravo', groupOrder: 1 },
		{ id: 'y', groupId: 'alpha', groupOrder: 1 }]);
		expect(findTasksByEarliestGroupOrder(list2)).to.be.a('array');
		expect(findTasksByEarliestGroupOrder(list2)).to.deep.equal([{ id: 'c', groupId: 'tango', groupOrder: 1 },
		{ id: 'f', groupId: 'foxtrot', groupOrder: 1 }]);
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