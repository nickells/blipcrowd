var express = require('express');
var app = express();
var logger = require('morgan')
var swig = require('swig')
var bodyParser = require('body-parser')


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

app.listen(3000)