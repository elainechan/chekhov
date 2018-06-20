const Task = require('./task.model');

exports.getAllTasks = (req, res) => {
  Task
  .find()
  .populate('caseId')
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
      res.status(400).send(message);
      return;
    }
  });
  Task.create({ 
    name: req.body.name,
    clientId: req.body.clientId,
    caseId: req.body.caseId,
    userId: req.body.userId,
    description: req.body.description,
    dateCreated: new Date()
  }, (err, data) => {
    if (err) { 
      handleError(err);
      return; 
    }
    res.status(201).json(data);
    console.log(data);
  });
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
  })
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
