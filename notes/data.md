task:{otherStuff:[info],caseID:098234023984}
case{otherStuff:[info]}

//we don't want to implement solution that is bigger than it needs to be
//e.g we don't absolutely need an array of tasks on the case document, so we'll leave it off for now
------
"I want to click a case and get all the related tasks"

* get the current caseID
* query the DB for all tasks with caseID === x
* lists those tasks

//in the parallel world where we have data links going in two directions always, so the case has a tasks_ids:[34234,2312312,12312]

* get the current cases tasks_ids array
* query the DB for all tasks with ID's that are in the array
* list those tasks
-----
virtual populate

case{allOtherStuff:[data],tasks:[
  //go find all the tasks that have a matching case_id, return that as an array here
]}

//click a case, find its tasks

* currentCase.tasks

//how is that different from what I was complaining about above? Aren't we linking the data both ways?
//only the task has an attribute that links it to the case, the connection from the case to the task is virtual
//when you add a task, all you have to do is make sure it has a case ID, you don't have to update the case document
-------
how do we do this very basic page that looks like this:

* case A
  >task 12323123
* case B
  >task 0098234098
  >task 0098534098
  >task 0098934098
* case C
* case D

//In the production world where there are thousands of tasks it wouldn't be quite this easy, 
//but for the next two years of this app, all we have to do is:

* query all cases //when you have real customers, you'll querying every case with a matching firm_id
* query all tasks
* create a UL of cases - frontend JS
* append a UL under each cases that has tasks with a matching case_id - frontend JS