# Chekhov

When given a list of tasks, automatically build a schedule.

## Constraints
[Source](https://www.coursera.org/learn/algorithms-greedy/lecture/Jo6gK/a-greedy-algorithm)
- [ ] Each case consists of several tasks
- [ ] Each task must be scheduled before its deadline
- [ ] Each task must be scheduled in order of [priority](https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method)
- [ ] Some tasks can only commence when certain other tasks are finished (upstream, downstream)
- [ ] No task can be left unscheduled for 48 hours
- [ ] Five workers: Alice, Bob, Carol, Dave, Emily
	- [ ] Each task must be scheduled to the worker it is assigned to
	- [ ] Each worker has 5 billable hours daily
	- [ ] Each worker has 3 buffer hours daily
- [ ] In the event an urgent task is not completed:
	- [ ] Push to front of queue

## Definition of a Solution 
- Sufficient: 
	- [ ] Every task gets scheduled before its deadline
- Optimal:
	- [ ] Earliest estimated completion
	- [ ] Least time wasted by workers waiting for completion of upstream task

## Algorithm
- [ ] Look at Task
	- [ ] Pick the highest priority level
	- [ ] If multiple tasks with highest priority level
		- [ ] Pick the longest idle time
		- [ ] If multiple tasks with longest idle time
			- [ ] Pick the shortest task

- [ ] Look at Worker schedule
	- [ ] Check if billable hours
		- [ ] If billable hours, schedule task to billable hours
	- [ ] If no billable hours, check if buffer hours
		- [ ] If buffer hours, schedule task to buffer hours
	- [ ] If no buffer hours
		- [ ] Alert manager

## Data Schema
![Data schema image](https://github.com/elainechan/chekhov/blob/master/schema1.png)
- [ ] **Task** _object_
	- ID: _string_
	- Priority: _enum_ _integer_ (1 to 4)
	- Length: _integer_
	- Worker ID: _string_
	- Case ID: _string_
	- Group ID (optional): _string_
	- Order (optional): _integer_
	- Upstream task ID (optional): _string_
	- Downstream task ID (optional): _string_
- [ ] **User** _object_
	- ID: _string_
	- Role: _enum_ (worker, manager)
	- Task IDs: _array_
	- Case IDs: _array_
	- Group IDs (optional): _array_
	- Billable hours: _integer_
	- Buffer hours: _integer_
- [ ] **Group** _object_
	- ID: _string_
	- Task IDs: _array_ 
- [ ] **Queue**
- ![Queue image]()

## Simplified Manual Attempt
- Each task consists of several subtasks
- Each subtask must be done in order
- Example task list:
```
task1 = ["A1", "B2", "A1", "B3"]
task2 = ["B2, "A2", "B4", "A3"]
task3 = ["B1", "A3", "B1", "A1"]
task4 = ["A4", "B1", "A1", "B1"]
```
Where in `task1` `A1`, `A` stands for "assigned to Alice" and `1` means the task takes 1 hour to complete. 

- Example schedule where each worker puts in equal time:
```
Alice: 1A1 4A4
Bob: 3B1 1B2 2B1
```

First round:
```
task1 = ["A1", "B2", "A1", "B3"]
task2 = ["B2, "A2", "B4", "A3"]
task3 = ["B1", "A3", "B1", "A1"]
task4 = ["A4", "B1", "A1", "B1"]
A = "1A1" => position 1 (has worked 1 hour)
B = "3B1" => position 1
```
Second round:
```
task1 = ["B2", "A1", "B3"]
task2 = ["B2, "A2", "B4", "A3"]
task3 = ["A3", "B1", "A1"]
task4 = ["A4", "B1", "A1", "B1"]
A = "3A3" => position 4 (has worked 4 hours cumulative)
B = "2B2" => position 3
```
Third round:
```
task1 = ["B2", "A1", "B3"]
task2 = ["A2", "B4", "A3"]
task3 = ["B1", "A1"]
task4 = ["A4", "B1", "A1", "B1"]
A = "3A1" => 5
B = "3B1" => 4
```
Fourth round:
```
task1 = ["B2", "A1", "B3"]
task2 = ["A2", "B4", "A3"]
task3 = []
task4 = ["A4", "B1", "A1", "B1"]
A = "1A1" => 6
B = "1B2" => 6
```
Fifth round:
```
task1 = ["B3"]
task2 = ["A2", "B4", "A3"]
task3 = []
task4 = ["A4", "B1", "A1", "B1"]
A = "2A2" => 8
B = "1B3" => 9
```
Sixth round:
```
task1 = []
task2 = ["B4", "A3"]
task3 = []
task4 = ["A4", "B1", "A1", "B1"]
A = "4A4" => 12
B = "2B4" => 13
```
Seventh round:
```
task1 = []
task2 = ["A3"]
task3 = []
task4 = ["B1", "A1", "B1"]
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