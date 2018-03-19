# Design Notes

- Considerations:
	- most common queries
	- data structures
	- Data model
	- STUDENT HAS ONE TEACHER
	- hasOne
	- hasMany
	- belongsTo

## Possible actions
- create an input array
- sort to your satisfaction
- give a queue of tasks, e.g. all tasks for userID toby
- input a case
	- outputs tasks status
	- outputs worker task completion performance

## Wireframe
1. Get a few db collection entries populated so they can get listed on the dashboard
2. Dashboard for the interface
	- [ ] list of a case's tasks
	- [ ] list of a user's tasks
	- [ ] creating a new case or task
3. imagine that someone going to the index is 'logged in'
4. get some tasks/subtasks into the DB and get them displaying
5. form/upload input

- once wireframing is done, we can work on a page that 'gets' tasks and displays the info

- Tasks:
	- briefs - 3 hrs
	- research - 2 hrs
	- documentation - 1 hrs
	- deposition - 2 hrs

- What my staff is good at:
	- Steve - briefs, research, documentation
	- Alice - [all 4]
	- Bob - deposition
	- Sinead - documentation, research

### Priorities: 
1. All tasks are assigned
2. All tasks are listed for each staff member in a display
3. No staff member is overcapacity

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


## TODO
- [ ] **Add procfile before upload to Heroku**

- console.log out the uploaded files contents
- add a single pre-baked line to the DB
- 4-5 records manually inserted
- be able to review those from the mongod terminal
- [ ] display all records within the site
- [ ] HTML for posting a csv as form data
- [ ] define the data modeling:
user, case, task, client

Case has:
	- many tasks
	- many users
	- belongs to an owner

Task has:
	- one user
	- one case
	- one owner (via case)
	- a reusable attriburte of `task_type`

some application logic sets a `required_time` based on `task_type`

## Digital Design Prototyping
- [Sketch InVision Craft tutorial 20mins Youtube](https://www.youtube.com/watch?v=5lg-PbDZEn8)
- [Sketch](https://www.sketchapp.com/)
- [InVision](https://www.invisionapp.com/sketch-prototyping)
- [Craft](https://www.invisionapp.com/craft)
- [Principle](http://principleformac.com/)
- [Form](http://www.relativewave.com/form/)

## Native Prototyping
### Kanban UI
- [Wekan](https://github.com/wekan/wekan)
- [React DnD](https://github.com/react-dnd/react-dnd)
### Calendar UI
- [fullcalendar](https://github.com/fullcalendar/fullcalendar)
### Database
- [MogoDB MERN-CRUD](https://github.com/jaydestro/mern-crud)
	-[blogpost](https://www.mongodb.com/blog/post/building-a-nodejs-app-with-mongodb-atlas-and-aws-elastic-container-service-part-1)