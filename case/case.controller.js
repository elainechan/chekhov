const Case = require('./case.model');

exports.getAllCases = (req, res) => {
	Case.find().exec((err, data) => {
	  if (err) {
		console.log(err);
	  }
	  return res.send(data);
	})
}

exports.getCaseById = (req, res) => {
	Case.findById(req.params.id).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return res.send(data);
  });
}

exports.getCaseTasksById = (req, res) => {
	Case.findById({ _id: req.params.id }, function(err, aCase) {
    console.log(aCase.tasks);
    return res.json({ tasks: aCase.tasks });
  });
}

exports.getCaseByClient = (req, res) => {
  Case.find({ clientId: req.params.clientId }, function(err, aCase) {
    console.log(aCase);
  });
}

exports.postNewCase = (req, res) => {
	const requiredFields = ['name'];
	console.log(req.body.name);
  requiredFields.map((field) => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
			res.status(400).send(message); // problem
			return;
    }
  });
  Case.create({
    name: req.body.name,
    dateCreated: new Date(),
    dateOpened: new Date()
  }, (err, data) => {
    if (err) return handleError(err);
    res.status(201).json(data); // problem
    console.log(data);
  });
}