'use strict';
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const { DATABASE_URL, PORT } = require('./config');
const bodyParser = require('body-parser');
const app = express();

// Data models
const Case = require('./case/case.model');
const Task = require('./task/task.model');
const Client = require('./client/client.model');

// Routes
const taskRoute = require('./task/task.route');
const caseRoute = require('./case/case.route');
const clientRoute = require('./client/client.route');
const authRoute = require('./auth/auth.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // serves static files

// use middleware
app.use('/tasks', taskRoute);
app.use('/cases', caseRoute);
app.use('/clients', clientRoute);
app.use('/auth', authRoute);

let server;
function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => { // order of words is critical
    // Connect database
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      // Start server
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

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server...");
    server.close((err) => {
      if (err) {
        reject(err);
      }
      resolve();
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

module.exports = {app, closeServer, runServer};