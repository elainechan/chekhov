# Design Notes

most common queries
data structures
Data model
STUDENT HAS ONE TEACHER
hasOne
hasMany
belongsTo

task
priority?
time allotment
age (how long ago they were created)
due date (sort by)

- give a queue of tasks
e.g. all tasks for userID tobyfee
- input a case
	- tasks status
	- worker task completion performance


## TODO
- [ ] **Add procfile before upload to Heroku**

console.log out the uploaded files contents
can we add a single pre-baked line to the DB
4-5 records manually inserted
be able to review those from the mongod terminal
display all records within the site
ideal HTML for posting a csv as form data
define the data modeling:
user, case, task, client

tasks:[{}]

tasks:[{task_id:2139789, assigned_to:"joan"}]

case has many tasks

case has many users

case belongs to an owner

task has one user

task has one case

task has an owner ? (via case)

task has an attriburte of task_type which is repeated

some application logic sets a required_time based on task_type

"promises" "callbacks" *they differ only in style

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