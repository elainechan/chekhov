![Logo image][logo]
# [Chekhov](https://chekhov.herokuapp.com/)

The objective of Chekhov is to optimize the arrangement of tasks in a schedule. When given a list of tasks, Chekhov should automatically build a schedule based on a finite set of constraints, by minimizing one or more cost function(s). The goal is to achieve a simplified version of [Optaplanner](https://www.optaplanner.org/). 

While the smart scheduling algorithm is under development, the frontend acts as a project management tool, like a simplified version of Asana.

Possible use cases can be any situations in which tasks with competing priorities need to be resolved. If the priorities are unclear, they should be clarified through an analytical process.

## Tech Stack
- Frontend: JavaScript, jQuery, HTML, CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Authentication: bcrypt, JWT
- Testing: Mocha, Chai
- Continuous Integration: Travis CI

## Phase 1: Working Application
- Frontend
	- [x] Working components: Tasks, Cases, Clients
	- [x] Responsive layouts
	- [x] AJAX interaction with backend
	- [x] Unintrusive UX: patch on enter, patch on blur
- Backend
	- [x] MongoDB database
	- [x] Express middleware
	- [x] Model-Controller-Router pattern
- Authentication
	- [x] Password encryption
	- [x] Locally store access token and user profile
	- [x] Reject unauthorized access
- Features
	- [x] Create, read, update, delete (CRUD)
	- [x] Dashboard: overview of user data
	- [x] Call-to-action: landing page, tutorial, demo
	- [x] User input validation

## Phase 2: Refactor and Expand Features
- Refactor in React
- Frontend Components
	- [ ] Users
	- [ ] Task Groups
	- [ ] Calendars
	- [ ] Updates
	- [ ] Records
- Processes
	- [ ] Schedule Task
	- [ ] Populate Calendar with Task when scheduled
	- [ ] Show schedule in components

## Phase 3: Explore Algorithms
- Optimization: 
	- linear programming (OR Tools, SCIP, pyscipopt)
	- greedy algorithms, heuristics, metaheuristics
- Scheduling pipeline:
	- priority queue
- Task grouping:
	- linked list

## Data Schema
![Data schema image][schema]
- [x] **Task** _object_
	- [x] ID: _string_
	- [ ] Deadline: _date_
	- [ ] Priority: _enum_ _integer_ (1 to 4, related to[ ]  Deadline)
	- [ ] Length: _integer_ (minutes)
	- [ ] Last touched: _date_
	- [ ] Idle: _integer_ (current time minus last touched)
	- [ ] User ID: _string_
	- [x] Case ID: _string_
	- [ ] Group ID (optional): _string_
	- [ ] Group order (optional): _integer_
	- [ ] Upstream task ID (optional): _string_
	- [ ] Downstream task ID (optional): _string_
- [ ] **User** _object_
	- [ ] ID: _string_
	- [ ] Role: _enum_ (worker, manager)
	- [ ] Task IDs: _array_
	- [ ] Case IDs: _array_
	- [ ] Group IDs (optional): _array_
	- [ ] Billable hours: _integer_
	- [ ] Buffer hours: _integer_
- [ ] **Group** _object_
	- [ ] ID: _string_
	- [ ] Task IDs: _array_
	- [ ] Worker IDs: _array_

## Smart Scheduling Notes

### Data Structure
 - Group: doubly linked list
	- prev = upstream task
	- next = downstream task

### Constraints
- [ ] Each case consists of several tasks
- [ ] Each task must be scheduled before its deadline
- [ ] Each task must be scheduled in order of priority
- [ ] Some tasks can only commence when certain others are finished (upstream, downstream)
- [ ] No task can be left unscheduled for 48 hours
- [ ] Five workers: Alice, Bob, Carol, Dave, Emily
	- [ ] Each task must be scheduled to the worker it is assigned to
	- [ ] Each worker has 5 billable hours daily (300 minutes)
	- [ ] Each worker has 3 buffer hours daily (180 minutes)

### Nice to have
- [ ] Priority should increase as idle time increases

- [ ] Schedule should refresh daily during off hours

### What if
- [ ] A task is not completed in scheduled time
- [ ] Worker is out sick
- [ ] Tasks are added/eliminated

### Definition of a Solution 
- Sufficient: 
	- [ ] Every task gets scheduled before its deadline
- Optimal:
	- [ ] Least total time required to finish all tasks
	- [ ] Least time wasted by workers waiting for completion of upstream task
	- [ ] Earlier completion of higher priority tasks

### Cost function
- Minimize:
	- total time to finish all tasks
	- total time wasted waiting for upstream completion
	- completion date of high-priority tasks

### Algorithm
#### Search Tasks
- [x] Search Task list by several criteria:
	- Group
		- [x] Search for tasks that belong in groups
		- [x] Sort grouped tasks according to group name and group order 
		- [x] Search for earliest group order
		- [x] Pick the earliest group order
	- Idle
		- [x] Search for the longest idle time
		- [x] Pick the longest idle time
	- Priority
		- [x] Search for strongest priority
		- [x] Pick the strongest priority level
	- Length
		- [x] Search for the shortest length
		- [x] Pick the shortest task
#### Pick
- [x] Pick by earliest Group order
	- [ ] Pick by Idle time
		- [ ] Pick by Priority level
			- [ ] Pick by Length
#### Populate Agenda
- [ ] Search Worker schedule
	- [ ] Check if billable hours
		- [ ] If billable hours, schedule task to billable hours
	- [ ] If no billable hours, check if buffer hours
		- [ ] If buffer hours, schedule task to buffer hours
	- [ ] If no buffer hours
		- [ ] Alert manager

### Simplified Manual Attempt
- Each task consists of several subtasks
- Each subtask must be done in order
- If a task list contains anything, the first one must be picked
- Try to keep list lengths as close to each other as possible

### Linear Programming Equation
- a series of inequalities
- coefficients 
- slack variables

- Example task list:
```
task1 = ["A1", "B2", "A1", "B3"]
task2 = ["B2, "A2", "B4", "A3"]
task3 = ["B1", "A3", "B1", "A1"]
task4 = ["A4", "B1", "A1", "B1"]
```
Where in `task1` `A1`, `A` stands for "assigned to Alice" and `1` means the task takes 1 hour to complete. 

- Example schedule:
```
Alice: 4A4 1A1
Bob: 3B1 2B1 1B2
```
3 hours is wasted; Bob waits 3 hours for Alice to finish 4A4 then 1A1 before Bob can get to 1B2
```
Alice: 1A1 4A4
Bob: 3B1 2B1 1B2
```
No time is wasted

First round:
```
task1 = ["A1", "B2", "A1", "B3"]
task2 = ["B2, "A2", "B4", "A3"]
task3 = ["B1", "A3", "B1", "A1"]
task4 = ["A4", "B1", "A1", "B1"]
A = "1A1" => position 1 (worked 1 hour)
B = "3B1" => position 1
1 hour has elapsed.
```
Second round:
```
task1 = ["B2", "A1", "B3"]
task2 = ["B2", "A2", "B4", "A3"]
task3 = ["A3", "B1", "A1"]
task4 = ["A4", "B1", "A1", "B1"]
A = "3A3" => position 4 (worked 4 hours cumulative)
B = "2B2" => position 4 (worked 3 hours, wasted 1 hour)
3 hours elapsed since last stage.
Total 4 hours elapsed (including 1 hour wasted).
```
Third round:
```
task1 = ["B2", "A1", "B3"]
task2 = ["A2", "B4", "A3"]
task3 = ["B1", "A1"]
task4 = ["A4", "B1", "A1", "B1"]
A = "2A2" => (worked 2 hours)
B = "1B2" => (worked 2 hours)
2 hours elapsed since last stage.
Total 6 hours elapsed (incl 1 hour wasted).
```
Fourth round:
```
task1 = ["A1", "B3"]
task2 = ["B4", "A3"]
task3 = ["B1", "A1"]
task4 = ["A4", "B1", "A1", "B1"]
A = "4A4" => (work 4)
B = "2B4" => (work 4)
Total 10 hours elapsed (incl 1 hour wasted).
```
Fifth round:
```
task1 = ["A1","B3"]
task2 = ["A3"]
task3 = ["B1", "A1"]
task4 = ["B1", "A1", "B1"]
A = "1A1" => (work 1)
B = "4B1" => (work 1)
Total hours 11 (incl 1 hrs wasted).
```
Sixth round:
```
task1 = ["B3"]
task2 = ["A3"]
task3 = ["B1", "A1"]
task4 = ["A1", "B1"]
A = "4A1" => work 1
B = "3B1" => work 1
Total 11 (1 wasted).
```
Seventh round:
```
task1 = ["B3"]
task2 = ["A3"]
task3 = ["A1"]
task4 = ["B1"]
A = "2A3" => 15
B = "4B1" => 14
```
Eigth round:
```
task1 = []
task2 = []
task3 = []
task4 = ["A1"]
A = "4A1" => 16
B = "" => 14
```

[logo]: https://github.com/elainechan/chekhov/blob/master/assets/logo.png "Logo image"
[schema]: https://github.com/elainechan/chekhov/blob/master/assets/schema2.png "Data schema image"
