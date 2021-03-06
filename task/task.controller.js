const Task = require('./task.model');
const Case = require('../case/case.model.js');
const mongoose = require('mongoose');

exports.getAllTasks = (req, res) => {
  Task
  .find()
  .populate('caseId')
  .populate('userId')
  .sort({'dateOpened': 'descending'})
  .exec((err, data) => {
	  if (err) {
		console.log(err);
	  }
	  return res.send(data);
	})
}

exports.getUserTasks = (req, res) => {
  Task
  .find({ userId: mongoose.Types.ObjectId(req.user.userId) })
  .populate('caseId')
  .sort({'dateOpened': 'descending'})
  .exec((err, data) => {
	  if (err) {
		console.log(err);
	  }
	  return res.send(data);
	});
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
      userId: req.user.userId,
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
        userId: req.user.userId,
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
      userId: req.user.userId,
      caseId: req.body.caseId,
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

exports.patchTaskName = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, { $set:{name: req.body.name } })
 .then((result) => {
  // update database here
  res.status(200).json({
    message: 'Changes to task name have been saved.',
    data: result
  });
 })
 .catch((err) => {
  res.status(500).json({
    message: 'Something happened while finding task by ID and updating task name.',
    data: err
  });
 });
}

exports.patchTaskDescription = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, { $set:{description: req.body.description} })
  .then((result) => {
    res.status(200).json({
      message: 'Changes to task description have been saved.',
      data: result
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Something happened while finding task by ID and updating task description.',
      data: err
    });
  });
}

exports.putCaseByTaskId = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, {$set:{caseId: mongoose.Types.ObjectId(req.body.caseId)}})
  .then((result) => {
    res.status(200).json({
      message: 'Changes to task case have been saved.',
      data: result
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Something happened while finding task by ID and updating case.'
    });
  });
}

exports.getTaskCount = (req, res) => {
  Task.count((err, data) => {
    if (err) {
      console.log(err);
    }
    return res.json({taskCount: data});
  })
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
      console.log(err); // catch
    }
    return res.status(200).json({
      message: "Task has been deleted.",
      data: data
  });

  });
}

exports.patchCaseByTaskId = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      message: "Task case has been updated.",
      data: data
    })
  })
}