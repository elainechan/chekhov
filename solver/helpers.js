'use strict';
const _ = require('lodash');

const TASKLIST = [
	{
		id: "A1",
		userId: "Alice",
		priority: 4,
		length: 30,
		idle: 20,
		groupId: "discovery",
		groupOrder: 1
	},
	{
		id: "B2",
		userId: "Bob",
		priority: 1,
		length: 30,
		idle: 40,
		groupId: "discovery",
		groupOrder: 3
	},
	{
		id: "C3",
		userId: "Carol",
		priority: 2,
		length: 90,
		idle: 10,
		groupId: "discovery",
		groupOrder: 2
	},
	{
		id: "D4",
		userId: "Dave",
		priority: 4,
		length: 60,
		idle: 40,
	},
	{
		id: "E5",
		userId: "Emily",
		priority: 1,
		length: 30,
		idle: 40
	}
];
const TASKLIST1 = [
	{
		id: "A1",
		userId: "Alice",
		priority: 4,
		length: 30,
		idle: 20,
		groupId: "alpha",
		groupOrder: 1
	},
	{
		id: "B2",
		userId: "Bob",
		priority: 1,
		length: 30,
		idle: 40,
		groupId: "alpha",
		groupOrder: 3
	},
	{
		id: "C3",
		userId: "Carol",
		priority: 2,
		length: 90,
		idle: 10,
		groupId: "bravo",
		groupOrder: 2
	},
	{
		id: "D4",
		userId: "Dave",
		priority: 4,
		length: 60,
		idle: 40,
		groupId: "bravo",
		groupOrder: 1
	},
	{
		id: "E5",
		userId: "Emily",
		priority: 1,
		length: 30,
		idle: 40,
		groupId: "bravo",
		groupOrder: 3
	}
];

function findTasksInGroups(taskList) {
	return taskList.filter(task => Object.keys(task).includes('groupId'));
}
function findSortedUniqueGroupNames(taskList) {
	let groups = [];
	findTasksInGroups(taskList).forEach(task => groups.push(task.groupId));
	let uniqueGroups = _.uniq(groups);
	return uniqueGroups.sort();
}
function findTasksBySortedGroupOrder(taskList) {
	let tasksInGroups = taskList.filter(task => Object.keys(task).includes('groupId'));
	return _.orderBy(tasksInGroups, ['groupId', 'groupOrder'], ['asc', 'asc']);
}
function findEarliestGroupOrder(taskList) {
	let tasksInGroups = taskList.filter(task => Object.keys(task).includes('groupId'));
	return tasksInGroups.reduce((min, cur) => cur.groupOrder < min ? cur.groupOrder: min, tasksInGroups[0].groupOrder);
}
function findTasksByEarliestGroupOrder(taskList) {
	let tasksInGroups = taskList.filter(task => Object.keys(task).includes('groupId'));
	let result = [];
	tasksInGroups.forEach(task => {
		if (task.groupOrder === findEarliestGroupOrder(tasksInGroups)) result.push(task)
	});
	return result;
}
function findLongestIdle(taskList) {
	return taskList.reduce((max, cur) => cur.idle > max ? cur.idle: max, taskList[0].idle);
}
function findTasksWithLongestIdle(taskList) {
	let result = [];
	taskList.forEach(task => {
		if (task.idle === findLongestIdle(taskList)) result.push(task);
	});
	return result;
}
function findStrongestPriority(taskList) {
	return taskList.reduce((min, cur) => cur.priority < min ? cur.priority: min, taskList[0].priority);
}
function findTasksWithStrongestPriority(taskList) {
	let result = [];
	taskList.forEach(task => {
		if (task.priority === findStrongestPriority(taskList)) result.push(task);
	});
	return result;
}
function findShortestLength(taskList) {
	return taskList.reduce((min, cur) => cur.length < min ? cur.length: min, taskList[0].length);
}
function pickShortestTasks(taskList) {
	let result = [];
	taskList.forEach(task => {
		if (task.length === findShortestLength(taskList)) result.push(task);
	});
	return result;
}

module.exports = { TASKLIST, TASKLIST1, findTasksInGroups, findSortedUniqueGroupNames, findTasksBySortedGroupOrder, findEarliestGroupOrder, findTasksByEarliestGroupOrder, findLongestIdle, findTasksWithLongestIdle, findStrongestPriority, findTasksWithStrongestPriority, findShortestLength, pickShortestTasks };