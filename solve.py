TASKLIST = [
	["A1", "B2", "A1", "B3"],
	["B2", "A2", "B4", "A3"],
	["B1", "A3", "B1", "A1"],
	["A4", "B1", "A1", "B1"]
]

def solve(tasks, alice, bob):
	
"""
1. pick every possible task and recurse
2. if there are none, wait an hour
"""