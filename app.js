var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();
var socketio = require('socket.io');

server.on('request', app);

var logger = require('morgan')
var swig = require('swig')
var bodyParser = require('body-parser')

var io = socketio(server);

io.on('connection', function(socket){
	console.log("someone connected")
	socket.on('clicked',function($obj){
		socket.broadcast.emit('clickEmit',$obj)
	})
	socket.on('cleared',function(){
		socket.broadcast.emit('clearedEmit')
	})
	socket.on('typeChange',function(data){
		socket.broadcast.emit('typeChangeEmit',data)
	})
	socket.on('releaseChange',function(data){
		socket.broadcast.emit('releaseChangeEmit',data)
	})
	socket.on('bpmChange',function(data){
		socket.broadcast.emit('bpmChangeEmit',data)
	})
});


swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine','html')

app.use(logger('dev'))

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/scripts'));


app.get('/', function(req,res,err){
	if (err) console.log(err);
	res.render('index')
})

app.get('/*', function(req,res,err){
	if (err) console.log(err);
	res.render('index')
})

server.listen(3000)