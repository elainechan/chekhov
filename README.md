# Chekhov

When given a list of tasks, automatically build a schedule.

## Constraints
[Source](https://www.coursera.org/learn/algorithms-greedy/lecture/Jo6gK/a-greedy-algorithm)
- [ ] Each case consists of several tasks
- [ ] Each task must be scheduled in order of urgency
- [ ] Each task must be scheduled before its deadline
- Some tasks can only commence when certain other tasks are finished
- No task can be left unscheduled for 48 hours
- Five workers: Alice, Bob, Carol, Dave, Emily
	- Each task must be done by the worker it is assigned to
	- Each worker has 5 billable hours daily
	- (Each worker has 3 buffer hours daily for catching up with unfinished work)
- In the event an urgent task is not completed:
	- Push to front of queue

### Definition of a Solution 
- Sufficient: 
	- Everything gets assigned
	- Every task is scheduled before its deadline
- Optimal:
	- Earliest estimated completion
	- Least time wasted by workers waiting for completion of upstream task

## Algorithm
- Looking at Task
	- [ ] Pick the highest urgency
	- [ ] Pick the longest idle time

- Looking at Worker schedule
	- [ ] Check if any open billable hours
	- [ ] If no billable hours, schedule to buffer hours

### Implementation
- Task ID
	- Urgency: integer
	- Length: integer
	- Worker: string
	- Order (optional): integer
- (Queue)

## Manual Solution
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