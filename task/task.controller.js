const Task = require('./task.model');

exports.getAllTasks = (req, res) => {
  Task
  .find()
  .populate('clientId', 'name address')
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
      return res.status(400).send(message);
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
    if (err) return handleError(err);
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