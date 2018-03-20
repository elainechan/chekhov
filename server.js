const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
// app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/tasks', (req, res) => {
  Tasks
    .find().then(data => res.json(data))
    .catch(err => { //this is just us handling an error
      console.error(err);
      res.status(500).json({ error: 'Unable to complete request.' });
    });
  })
app.post('/upload', (req, res) =>{
	console.log(req.body);
	/*
	parse req as json
	connect to mongoose
	insert case.json into new case document in collection
	*/
	res.redirect('/');
});
/*
app.listen(3000, () => console.log('Example app listening on port 3000!'))
mongoose.connect('mongodb://127.0.0.1:27017');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('MongoDB connected!');
});
*/
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');
const { Restaurant } = require('./model/models');

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
      .on('error', err => { // safety measure: make db available to server reconnect, make sure no busy signal
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}
// If module is distributed, this prevents external sources from accessing my database
if (require.main === module) { // safety measure: separation of db concerns if planning to distribute module
  console.log('Called directly');
  runServer(DATABASE_URL).catch(err => console.error(err));
} else {
  console.log('Required as a module');
}