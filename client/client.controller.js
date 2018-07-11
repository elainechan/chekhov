const Client = require('./client.model');
const mongoose = require('mongoose');

exports.getAllClients = (req, res) => {
  Client.find()
  .exec((err, data) => {
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

exports.getClientById = (req, res) => {
  Client.findById({_id: req.params.id}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json({
      client: data
    })
  });
}

exports.deleteClientById = (req, res) => {
  Client.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      message: "Client has been deleted.",
      data: data
    });
  });
}

exports.editClientName = (req, res) => {
  Client.findByIdAndUpdate(req.params.id, {
    $set: { name: req.body.name }
  })
  .then((result) => {
    res.status(200).json({
      message: 'Changes to client name have been saved.',
      data: result
    })
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Something happened while updating client name.',
      data: err
    });
  });
}

exports.editClientAddress = (req, res) => {
  Client.findByIdAndUpdate(req.params.id, {
    $set:{ address: req.body.address } })
    .then((result) => {
      res.status(200).json({
        message: 'Changes to client address have been saved.',
        data: result
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Something happened while updating client address.',
        data: err
      });
    });
}