# N tasks
- Each task consists of several subtasks
- Each subtask must be done in order
- Two workers, Alice and Bob:
	- Each worker has five 60-minute time slots
	- Each subtask must be done by the worker it is assigned to
	- Each worker has 5 billable hours daily
- Tasks with the earliest deadline is the highest priority


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