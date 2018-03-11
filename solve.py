TASKLIST = [
	["A1", "B2", "A1", "B3"],
	["B2", "A2", "B4", "A3"],
	["B1", "A3", "B1", "A1"],
	["A4", "B1", "A1", "B1"]
]

def solve(tasks, alice, bob):
	# Only run if tasks are present, prevents crash
	for task in tasks:
		if task: continue
		else: break

	if alice <= bob:
		# pick a task for alice
		for task in tasks:
			if task and task[0][0] == 'A':
				temp = task
				job = temp.pop(0)
				logged = solve(tasks, alice + int(job[1:]), bob)
				if logged < best:
					best = logged
			elif task:
				temp = task
				job = temp.pop(0)
				logged = solve(tasks, alice, bob + int(job[1:]))

		# or maybe alice waits an hour
		logged = solve(tasks, alice + 1, bob) + 1
		if logged < best:
			best = logged
	return logged

solve(TASKLIST, 0, 0)

"""
1. pick every possible task and recurse
2. if there are none, wait an hour
"""