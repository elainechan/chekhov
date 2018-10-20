# Example
```
case1 = ["task1", "task2", "task3"]
case2 = ["task4", "task5" ]

task1.duration <= 3
task2.duration <= 2
task3.duration <= 4 

expressing sequence (task 2 must be done before task 3):
task3.start > task2.start + task2.duration

expressing assignment:
task1.worker == "Alice"

people = [ Alice, Bob, Carol ]
```
define a space
populate table with results
sort results

## Input
- a list of cases
	- each containing an unordered list of tasks
- a list of worker objects with each worker mapped to
	- cases they're assigned to
	- worker availability

## Output
- an ordered list of tasks based on start times

## Goal function
- Finish project in least amount of time subject to constraints:
	- worker assignment
	- worker availability
	- task sequence
	- task duration
	- priority
