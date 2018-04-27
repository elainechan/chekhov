const Client = require('./client.model');

exports.getAllClients = (req, res) => {
	Client.find().exec((err, data) => {
	  if (err) {
		console.log(err);
	  }
	  return res.send(data);
	})
}

exports.postNewClient = (req, res) => {
	const requiredFields = ['name', 'address'];
  requiredFields.map((field) => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  Client.create({
    name: req.body.name,
    address: req.body.address
  }, (err, data) => {
    if (err) return handleError(err);
    res.status(201).json(data);
    console.log(data);
  });
}