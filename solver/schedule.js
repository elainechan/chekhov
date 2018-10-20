'use strict';
const _ = require('lodash');
const { 
	TASKLIST, TASKLIST1, findTasksInGroups, findSortedUniqueGroupNames, findTasksBySortedGroupOrder,findEarliestGroupOrder, findTasksByEarliestGroupOrder, findLongestIdle, findTasksWithLongestIdle, findStrongestPriority, findTasksWithStrongestPriority, findShortestLength, pickShortestTasks 
} = require('../app/helpers');

// GIPL order
// Group ==> a task is part of a group
// Date ==> 
// Length ==> length (this is handled thru partitioning by len)
function scheduleByGroupOrder(taskList, agenda) {
	findTasksByEarliestGroupOrder(taskList).map(task => {
		agenda.push(task);
		_.remove(taskList, item => item === task);
	});
	let basket = [];
	basket.push(taskList); 
	basket.push(agenda);
	return basket;
}
function scheduleByIdle(taskList, agenda) {
	
}
module.exports = { scheduleByGroupOrder };