const Task = require('./task.model');

exports.getAllTasks = (req, res) => {
	Task.find().exec((err, data) => {
	  if (err) {
		console.log(err);
	  }
	  return res.send(data);
	})
}

exports.postNewTask = (req, res) => {
	const requiredFields = ['name'];
  requiredFields.map((field) => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  Task.create({ 
    name: req.body.name,
    description: req.body.description,
    dateCreated: new Date(),
    caseId: req.body.caseId
  }, (err, data) => {
    if (err) return handleError(err);
    res.status(201).json(data);
    console.log(data);
  });
}