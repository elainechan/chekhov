# Chekhov

A task manager that uses a constraint solving algorithm to distribute a list of tasks to workers.

## Tasks Problem
See [`solve.py`](https://github.com/elainechan/chekhov/blob/master/solve.py)

- Each task consists of several subtasks
- Each subtask must be done in order
- Two workers, Alice and Bob:
	- Each subtask must be done by the worker it is assigned to
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

- Let's solve manually.

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

## Prioritized Tasks Problem
[Source](https://www.coursera.org/learn/algorithms-greedy/lecture/Jo6gK/a-greedy-algorithm)
- Each task consists of several subtasks
- Each subtask must be done in order
- Two workers, Alice and Bob:
	- Each subtask must be done by the worker it is assigned to
	- Each worker has five 60-minute time slots
	- Each worker has 5 billable hours daily
- Urgency
- Treatment of weights and lengths:
	- Tasks with higher urgency have higher priority
	- Tasks with lower order have higher priority
	- ratio == w
	- difference == w - l
- Order matters
- Task ID expresses:
	- Urgency
	- Order
	- Length
	- Worker

### Goals
- Shortest time required?
- Leasted wasted by workers?

```
task1 = ["2A1", "3B2", "4A1", "1B3"]
task2 = ["1B2, "3A2", "2B4", "1A3"]
task3 = ["2B1", "2A3", "4B1", "1A1"]
task4 = ["2A4", "4B1", "1A1", "3B1"]
```
- Where in `task1` `2A1`:
	- `2` is the weight
	- `A` stands for "assigned to Alice"
	- `1` means the task takes 1 hour to complete. 
## NEEDS:
- definition of a solution
- how do u know when it's correct - higher priority tasks are finished within a certain time?
- when do u know when it's the best solution - earliest finish time of everything