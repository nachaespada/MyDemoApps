// Setup mongoose and the database
// Check out ./config-sample to configure your MongoDb, rename it to config.js
var mongoose = require('mongoose/');
//var config = require('./config'); // Local congig file to hide creds
db = mongoose.connect('mongodb://localhost/messagesdb'),
Schema = mongoose.Schema;
// require express and bodyParser to read Backbone.js syncs

var express = require('express'),
		routes = require('./routes');



var server = module.exports = express.createServer();

server.set('views', __dirname + '/templates');
server.set('view engine', 'hbs');
server.register('.html', require('hbs'));
server.use(express.bodyParser());
server.use(express.methodOverride());
server.use(server.router);
server.use(express.static(__dirname));

server.get('/', routes.index);

// Example Application

// Create a schema for our data
var MessageSchema = new Schema({
  message: String,
  author: String
});

var UserSchema = new Schema({
	user: String,
	password: String
});

// Use the schema to register a model
mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

function getUsers(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to server our response to any origin
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  User.find().limit(100).sort('user', -1).execFind(function (arr,data) {
    res.send(data);
  });
}

function postUser(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var user = new User();
  user.user = req.body.user;
  user.password = req.body.password;
  user.save(function () {
    res.send(req.body);
  });
}

// This function is responsible for returning all entries for the Message model
function getMessages(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to server our response to any origin
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  Message.find().limit(100).sort('author', -1).execFind(function (arr,data) {
    res.send(data);
  });
}

function postMessage(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var message = new Message();
  message.message = req.body.message;
  message.author = req.body.author;
  message.save(function () {
    res.send(req.body);
  });
}

/*server.post('/users', function (req, res){
	User.findOne({user: req.body.user, password: req.body.password}).execFind(function (arr,data) {
    res.send(data);
  });
});*/

server.delete('/messages/:id', function (req, res){
  Message.findById(req.params.id, function (err, m) {
	if(m) {
		m.remove(function (err) {
		if (!err) {
			console.log("removed");
			return res.send('');
		} else {
			console.log(err);
		}
		});
	}
  });
});

server.put('/messages/:id', function (req, res){
  Message.findById(req.params.id, function (err, message) {
    message.message = req.body.message;
    message.author = req.body.author;
    message.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(message);
    });
  });
});



// Set up our routes and start the server
server.get('/messages', getMessages);
server.post('/messages', postMessage);

server.post('/users', postUser);
server.get('/users', getUsers);

server.listen(8080, function() {
  console.log('%s listening at %s, love & peace', server.address().port, server.settings.env);
});

