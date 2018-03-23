'use strict';
const express = require('express');
const mongoose = require('mongoose');
const { DATABASE_URL, PORT } = require('./config');
const path = require('path');
const bodyParser = require('body-parser');
const Case = require('./model/case.model');
const Task = require('./model/task.model');
const app = express();

app.use(bodyParser.json());
const jsonParser = bodyParser.json();
app.use(express.static('public'));

app.get('/tasks', (req, res) => {
  Task.find().exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return res.send(data);
  });
});

app.get('/cases', (req, res) => {
  Case.find().exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return res.send(data);
  });
});
app.get('/cases/:id', (req, res) => {
  Case.findById(req.params.id).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return res.send(data);
  });
});

app.post('/new-case', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['name'];
  requiredFields.map((field) => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  const item = Case.create(req.body.name);
  res.status(201).json(item);
});

app.post('/upload', (req, res) =>{
	console.log(req.body);
	/*
	parse req as json
	connect to mongoose
	insert case.json into new case document in collection
	*/
	res.redirect('/');
});

let server;
function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => { // order of words is critical
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      }) 
      .on('error', err => { // makes db available to server reconnect, ensure no busy signal
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}
// If module is distributed, prevents external sources from accessing database
if (require.main === module) { // separates db concerns if planning to distribute module
  console.log('Called directly');
  runServer(DATABASE_URL).catch(err => console.error(err));
} else {
  console.log('Required as a module');
}