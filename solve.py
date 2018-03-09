"""
Two tasks
	Each task consists of several subtasks
	Each subtask must be done in order
Two workers, Alice and Bob
	Each worker has four 30-min time slots
	Each subtask must be done by a specific worker

task1 = ["A1", "B2", "A1", "B3"]
task2 = ["B2, "A2", "B4", "A3"]
task3 = ["B1", "A3", "B1", "A1"]
task4 = ["A4", "B1", "A1", "B1"]

Example even time:
1A1 4A4
3B1 1B2 2B1

Convention: pick shortest tasks first

A = "1A1" => position 1 hours total
B = "3B1" => position 1 hours total

A = "3A3" => position 4 hours total
B = "2B2" => position 3 hours total

task1 = ["1B2", "1A1", "1B3"]
task2 = ["2B2, "2A2", "2B4", "2A3"]
task3 = ["3B1", "3A1"]
task4 = ["4A4", "4B1", "4A1", "4B1"]

A = "3A1" => 5
B = "3B1" => 4

task1 = ["B2", "A1", "B3"]
task2 = ["B2, "A2", "B4", "A3"]
task3 = []
task4 = ["A4", "B1", "A1", "B1"]

A = "1A1" => 6
B = "1B2" => 6

A = "2A2" => 8
B = "1B3" => 9

A = "4A4" => 12
B = "2B4" => 13

A = "2A3" => 15
B = "4B1" => 14

A = "4A1" => 16
"""
tasklist = [
	["A1", "B2", "A1", "B3"],
	["B2", "A2", "B4", "A3"],
	["B1", "A3", "B1", "A1"],
	["A4", "B1", "A1", "B1"]
]

def solve(tasks, alice, bob):
	# Only run if tasks are present, prevents crash
	for task in tasks:
		if task: ok = 1
	if not ok: return

	if alice <= bob:
		# pick a task for alice
		for task in tasks:
			if task and task[0][0] == 'A':
				job = task.pop(0)
				score = solve(tasks, alice + int(job[1:]), bob)
				task.insert(0, job)
				best = 0
				if score < best:
					best = score
		# or maybe alice waits an hour
		score = solve(tasks, alice+1, bob) + 1
		if score < best:
			best = score
	return 0

solve(tasklist, 0, 0)

"""
1. pick every possible task and recurse
2. if there are none, wait an hour
"""