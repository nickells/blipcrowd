var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();
var socketio = require('socket.io');
var favicon = require('serve-favicon')

server.on('request', app);

var logger = require('morgan')
var swig = require('swig')
var bodyParser = require('body-parser')

var io = socketio(server);
var allClientsIds = [];
var allBlips = [];
var allSettings = {};


io.on('connection', function(socket){
	allClientsIds.push(socket.id);
	console.log(socket.id," has connected")
	socket.emit('setup',allClientsIds,allBlips,allSettings)

	socket.broadcast.emit('connectEmit', socket.id)
	// console.log("someone connected")
	socket.on('clicked',function($obj){
		socket.broadcast.emit('clickEmit',$obj)
		allBlips.push($obj)
	})
	socket.on('cleared',function(){
		socket.broadcast.emit('clearedEmit')
		allBlips = [];
	})
	socket.on('typeChange',function(data){
		allSettings.type = data;
		console.log(data)
		socket.broadcast.emit('typeChangeEmit',data)
	})
	socket.on('releaseChange',function(data){
		allSettings.release = data;
		socket.broadcast.emit('releaseChangeEmit',data)
	})
	socket.on('bpmChange',function(data){
		allSettings.bpm = data;
		socket.broadcast.emit('bpmChangeEmit',data)
	})
 	socket.on('disconnect', function() {
 	console.log(socket.id,' has disconnected');
 	socket.broadcast.emit('disconnectEmit', socket.id)
      var i = allClientsIds.indexOf(socket.id);
      allClientsIds.splice(i,1);
      console.log("new client list:",allClientsIds)
   });
 	socket.on('error', function(err){
 		console.log(err)
 	})
});





swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine','html')

// app.use(logger('dev'))

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/scripts'));


app.get('/', function(req,res,err){
	// if (err) console.log(err);
	res.render('index')
})

app.get('/*', function(req,res,err){
	// if (err) console.log(err);
	res.render('index')
})

server.listen(3000)

