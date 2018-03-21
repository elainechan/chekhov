const express = require('express');
const mongoose = require('mongoose');
const { DATABASE_URL, PORT } = require('./config');
const path = require('path');
const bodyParser = require('body-parser');
const { CaseSchema, TaskSchema } = require('./model/models');

const app = express();
app.use(bodyParser.json());

var task = mongoose.model('task', TaskSchema, 'task'); // (collection, schema)
app.get('/task', (req, res) => {
  task.find().exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return res.send(data);
  });
});
var cases = mongoose.model('case', CaseSchema, 'case')
app.get('/cases', (req, res) => {
  cases.find().exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return res.send(data);
  });
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
      .on('error', err => { // make db available to server reconnect, make sure no busy signal
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}
// If module is distributed, this prevents external sources from accessing my database
if (require.main === module) { // separation of db concerns if planning to distribute module
  console.log('Called directly');
  runServer(DATABASE_URL).catch(err => console.error(err));
} else {
  console.log('Required as a module');
}