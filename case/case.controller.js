const Case = require('./case.model');
const Client = require('../client/client.model');
const mongoose = require('mongoose');

exports.getAllCases = (req, res) => {
  Case
  .find()
  .populate('clientId')
  .exec((err, data) => {
	  if (err) {
		console.log(err);
	  }
	  return res.send(data);
	})
}

exports.getCaseCount = (req, res) => {
  Case.count((err, data) => {
    if(err) {console.log(err)}
    return res.json({caseCount: data});
  })
}

exports.getCaseByName = (req, res) => {
  Case.find(req.params.name).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return res.send(data);
  });
}

exports.getCaseById = (req, res) => {
  Case.findById(req.params.id)
  .populate('clientId')
  .exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return res.send(data);
  });
}

exports.getCaseTasksById = (req, res) => {
	Case.findById({ _id: req.params.id }, function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({ tasks: data.tasks });
  });
}

exports.getCaseByClient = (req, res) => {
  Case.find({ clientId: req.params.clientId }, function(err, aCase) {
    if (err) {
      console.log(err);
        return;
    }
    res.json({
      cases: aCase 
    });
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
  // if client doesn't exist already
  if (!req.body.clientId) {
    Client.create({
      name: req.body.clientName,
      userId: req.user.userId
    }, (err, data) => {
      if (err) {
        handleError(err);
        return;
      } else {
        Case.create({
          name: req.body.name,
          clientId: data._id,
          userId: req.user.userId,
          dateOpened: new Date()
        }, (err, data) => {
          if (err) {
            handleError(err);
            return;
          } else {
            res.status(201).json({
              case: data,
              clientName: req.body.clientName
            });
            return;
          }
        });
        return;
      }
    });
  } else {
    // if client exists
    Case.create({
      name: req.body.name,
      clientId: mongoose.Types.ObjectId(req.body.clientId),
      userId: req.user.userId,
      dateOpened: new Date()
    }, (err, data) => {
      if (err) {
        handleError(err);
        return;
      } else {
        req.case = data; // save entire case
        console.log(`Client ID from body (req.body.clientId): ${req.body.clientId}`);
        console.log(`Client ID from case (req.case.clientId): ${req.case.clientId}`);
        Client.findById(req.body.clientId, (err, data) => {
          if (err) {
            handleError(err);
            return;
          }
          res.status(201).json({
            case: req.case,
            client: data
          })
        })
      }
    });
  }
}

exports.deleteCaseById = (req, res) => {
  Case.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      message: "Case has been deleted.",
      data: data
  });

  });
}

exports.putClientByCaseId = (req, res) => {
  Case.findByIdAndUpdate(req.params.id, { $set:{clientId: mongoose.Types.ObjectId(req.body.clientId) } })
  .then((result) => {
    res.status(200).json({
      message: 'Changes to case client have been saved.',
      data: result
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Something happened while finding case by ID and updating client.',
      data: err
    });
  });
}

exports.patchCaseName = (req, res) => {
  Case.findByIdAndUpdate(req.params.id, { $set:{name: req.body.name } })
  .then((result) => {
   // update database here
   res.status(200).json({
     message: 'Changes to case name have been saved.',
     data: result
   });
  })
  .catch((err) => {
   res.status(500).json({
     message: 'Something happened while finding case by ID and updating case name.',
     data: err
   });
  });
}