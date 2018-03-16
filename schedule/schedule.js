'use strict';
const _ = require('lodash');
const { 
	TASKLIST, TASKLIST1, findTasksInGroups, findSortedUniqueGroupNames, findTasksBySortedGroupOrder,findEarliestGroupOrder, findTasksByEarliestGroupOrder, findLongestIdle, findTasksWithLongestIdle, findStrongestPriority, findTasksWithStrongestPriority, findShortestLength, pickShortestTasks 
} = require('../app/helpers');

// GIPL order
function scheduleByGroupOrder(taskList, agenda) {
findTasksByEarliestGroupOrder(taskList).map(task => {
		agenda.push(task);
		_.remove(taskList, item => item === task);
	});
	let collection = [];
	collection.push(taskList); 
	collection.push(agenda);
	return collection;
}
module.exports = { scheduleByGroupOrder };


