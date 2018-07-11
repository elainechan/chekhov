const Task = require('./task.model');
const Case = require('../case/case.model.js');
const mongoose = require('mongoose');

exports.getAllTasks = (req, res) => {
  Task
  .find()
  .populate('caseId')
  .sort({'dateOpened': 'descending'})
  .exec((err, data) => {
	  if (err) {
		console.log(err);
	  }
	  return res.send(data);
	})
}

exports.postNewTask = (req, res) => {
	const requiredFields = ['name']; // add later  'clientId', 'caseId', 'userId'
  requiredFields.map((field) => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      //res.status(400).send(message);
      return;
    }
  });
  // if case doesn't exist already
  if (!req.body.caseId) {
    Case.create({
      name: req.body.caseName,
      dateOpened: new Date()
    }, (err, data) => {
      if (err)  {
        handleError(err);
        return;
      }
      // create task in callback
      Task.create({ 
        name: req.body.name,
        clientId: req.body.clientId,
        caseId: data._id,
        userId: req.body.userId,
        description: req.body.description,
        dateOpened: new Date()
      }, (err, data) => {
        if (err) { 
          handleError(err);
          return; 
        }
        res.status(201).json({
          task: data,
          caseName: req.body.caseName
        });
        return;
      }); 
      return;
    });
  } else {
    // if case exists
    Task.create({ 
      name: req.body.name,
      caseId: mongoose.Types.ObjectId(req.body.caseId),
      description: req.body.description,
      dateOpened: new Date()
    }, (err, data) => {
      if (err) { 
        handleError(err);
        return; 
      }
      req.task = data; // save entire task
      console.log("Case ID from body:");
      console.log(req.body.caseId);
      console.log("Case ID from task:")
      console.log(req.task.caseId);
      Case.findById(req.body.caseId, (err, data) => {
        if (err) {
          handleError(err);
          return;
        }
        res.status(201).json({
          task: req.task,
          case: data
        });
        //console.log(data);
      });
    });
  }
}

exports.getTasksByClientId = (req, res) => {
  Task
  .find({clientId: req.params.id})
  .populate('clientId', 'name address')
  .exec((err, data) => {
	  if (err) {
		console.log(err);
	  }
	  return res.send(data);
	})
}
exports.getTasksByCaseId = (req, res) => {
  Task
  .find({caseId: req.params.id})
  .populate('caseId') 
  .exec((err, data) => {
	  if (err) {
		console.log(err);
	  }
	  return res.send(data);
	})
}
exports.getTasksByUserId = (req, res) => {
  Task
  .find({userId: req.params.id})
  .populate('userId')
  .where('userId').in('userIds')
  .exec((err, data) => {
	  if (err) {
		console.log(err);
	  }
	  return res.send(data);
	})
}
exports.editTaskName = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, { $set:{name: req.body.name } })
 .then((result) => {
  // update database here
  res.status(200).json({
    message: 'Changes have been saved.',
    data: result
  });
 })
 .catch((err) => {
  res.status(500).json({
    message: 'Something happened while finding task by ID and updating.',
    data: err
  });
 });
}

exports.editTaskDescription = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, { $set:{description: req.body.description} })
  .then((result) => {
    res.status(200).json({
      message: 'Changes have been saved.',
      data: result
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Something happened while finding task by ID and updating.',
      data: err
    });
  });
}

exports.getNumberOfTasksByCaseId = (req, res) => {
  // call mongoose to get task count
  Task.count(
    {caseId: req.params.caseId},
    (err, data) => {
      if (err) {
        console.log(err);
      }
      return res.json({taskCount: data});
    }
  );
}

exports.deleteTaskById = (req, res) => {
  Task.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      message: "Task has been deleted.",
      data: data
  });

  });
}