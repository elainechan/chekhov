# Chekhov

A task manager that uses a constraint solving algorithm to distribute a list of tasks to workers to ensure everything is done and everyone is accountable for their responsibilities.

## Inspiration
- [OptaPlanner](https://www.optaplanner.org/)
- [Taskjuggler](http://taskjuggler.org/)

## Scenario

### Tasks:
- briefs - 3 hrs
- research - 2 hrs
- documentation - 1 hrs
- deposition - 2 hrs

### What my staff is good at:
- Steve - briefs, research, documentation
- Alice - [all 4]
- Bob - deposition
- Sinead - documentation, research

### Priorities: 
1. All tasks are assigned
2. All tasks are listed for each staff member in a display
3. No staff member is overcapacity

## Workflow
1. Admin user (manager) uploads a document with 1 case
	- tasks already assigned to workers
	- deadlines
	- time required to complete each task
2. Users receive updated calendar populated with tasks
3. Users receive email notification
4. Users should be able to check off tasks
5. End of week users should receive timesheet with hours logged and fees
6. Calendar view is populated and displayed

## Dashboard
Daily sheet
- by staff member
- by day

## Assets
- Task map (Gantt chart?)
- Calendar

## Objects
- Task
- Case
- Users
	- Attorney
	- Manager
- Bill

## Features
### Task
- `flexibility` (enum): `fixed`, `fuzzy`, `flexible`
- `priority`: 1 - 4 [Eisenhower Method](https://en.wikipedia.org/wiki/Time_management#/media/File:MerrillCoveyMatrix.png)

### Smart Scheduling
- Manager manually assigns tasks to each worker
- For each task:
	- distribute task to assigned worker across available time
- If task is unfinished in due time `adjourn`
	- list reason
	- assign to future time slot using same scheduling algorithm
- Each worker has daily `contingent` time slots reserved for emergencies or catch-ups
- Sync all assignments across system

### Automatic Billing
- Generate timesheet daily
- Generate bill upon case close

## Constraints
### Billable Hours
- per worker 
	- billable hours
		- per year: 1680
		- per week: 35
	- salary
		- per year: 100000
- charge to client
	- per worker hour: 350

## Example
- draft retainer 30 mins
- send retainer 10
- draft HIPAA releases 30
- send HIPAA releases 10

## Authentication and Security
- [User account best practices](https://cloudplatform.googleblog.com/2018/01/12-best-practices-for-user-account.html)
- [Salted Password Hashing - Doing it Right](https://crackstation.net/hashing-security.htm)

## References on Constraint Programming (CP)
### Introduction
- [Wikipedia: Constraint Programming](https://en.wikipedia.org/wiki/Constraint_programming)
- [Wikipedia: Nurse scheduling problem](https://en.wikipedia.org/wiki/Nurse_scheduling_problem)
- [Wikipedia: Automated planning and scheduling](https://en.wikipedia.org/wiki/Automated_planning_and_scheduling)
- [Article: An Introduction to Algorithms for Solving Schedule-Related Problems](http://www.project.net/introduction-algorithms-solving-schedule-related-problems)
- [Stackexchange: What algorithm should I use to create an automatic staff scheduling feature?](https://softwareengineering.stackexchange.com/questions/236668/what-algorithm-should-i-use-to-create-an-automatic-staff-scheduling-feature?noredirect=1&lq=1)
- [Video: Continuous Planning for Nurse Rostering with OptaPlanner](https://www.youtube.com/watch?v=7nPagqJK3bs)
- [OptaPlanner docs: Tabu Search](http://docs.jboss.org/optaplanner/release/latest/optaplanner-docs/html_single/index.html#tabuSearch)
- [OptaPlanner docs: Simulated Annealing](http://docs.jboss.org/optaplanner/release/latest/optaplanner-docs/html_single/index.html#simulatedAnnealing)
- [OptaPlanner docs: Late Acceptance](http://docs.jboss.org/optaplanner/release/latest/optaplanner-docs/html_single/index.html#lateAcceptance)
### Constraint Solvers
- [GitHub: OptaPlanner](https://github.com/kiegroup/optaplanner)
- [Article: Google constraint optimization](https://developers.google.com/optimization/cp/)
- [Google OR-Tools](https://github.com/google/or-tools)
- [Google Optimzation Tools: CP Solver](https://developers.google.com/optimization/cp/cp_solver#cp_solver)
- [Google Optimization Tools: Employee Scheduling](https://developers.google.com/optimization/scheduling/employee_scheduling)
- [Google Optimization Tools: N-Queens Problem](https://developers.google.com/optimization/cp/queens)
- [Google Optimization Tools: Job Shop Problem](https://developers.google.com/optimization/scheduling/job_shop)
- [python-constraints](https://github.com/python-constraint/python-constraint)
- [OpenStack Nova Solver Scheduler](https://github.com/openstack/nova-solver-scheduler)
### Papers
- [Slides: Constraint Programming and Scheduling](https://www.fi.muni.cz/~hanka/konstanz09/slides_bw.pdf)
- [Slides: Constraint-based planning and scheduling](http://icaps12.icaps-conference.org/planningschool/slides-Bartak.pdf)
- [Paper: Xerox Parc Constraint-based Scheduling](http://www2.parc.com/isl/members/fromherz/publications/cbs-tutorial-local.pdf)
- [Paper: Constraint-Based Scheduling: A Tutorial](http://www.math.unipd.it/~frossi/cp-school/lepape.pdf)
- [Paper: Scheduling Algorithm with Optimization of Employee Satisfaction](https://scheduling.philipithomas.com/scheduling.pdf)
- [Paper: Design of an Automated Employee Scheduling System](http://digitalcommons.calpoly.edu/cgi/viewcontent.cgi?article=1117&context=imesp)