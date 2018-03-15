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
		idle: 40
	},
	{
		id: "E5",
		userId: "Emily",
		priority: 1,
		length: 30,
		idle: 40
	}
];

function findTasksInGroups(taskList) {
	let tasksInGroups = taskList.filter(task => Object.keys(task).includes('groupId'));
	let result = [];
	tasksInGroups.forEach(task => result.push(task.id));
	return result;
}
function findLongestIdle(taskList) {
	return taskList.reduce((max, cur) => cur.idle > max ? cur.idle: max, taskList[0].idle);
}
function findTasksWithLongestIdle(taskList) {
	let result = []
	taskList.forEach(task => {
		if (task.idle === findLongestIdle(taskList)) result.push(task.id);
	});
	return result;
}
function findStrongestPriority(taskList) {
	return taskList.reduce((min, cur) => cur.priority < min ? cur.priority: min, taskList[0].priority);

}
function findTasksWithStrongestPriority(taskList) {
	let result = []
	taskList.forEach(task => {
		if (task.priority === findStrongestPriority(taskList)) result.push(task.id);
	});
	return result;
}

module.exports = { TASKLIST, findTasksInGroups, findLongestIdle, findTasksWithLongestIdle, findStrongestPriority, findTasksWithStrongestPriority };