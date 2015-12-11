#!/usr/bin/env

var express=require('express');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var app = express();
var contadores = new Array;
var puerto = 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT")
  next();
});

app.set('port', (process.env.PORT || puerto));

app.get('/', function(req,res) {
  res.end(index);
});

app.put('/crear/:id', function( req,res ) {
    contadores[req.params.id] = 0;
    res.send( { creado: req.params.id, valor: contadores[req.params.id]} );
});

app.get('/contador/:id', function (req, res) {
    res.send( "{ "+req.params.id+": "+ contadores[req.params.id] + "}" );
});

app.post('/sumar/:id', function (req, res) {
    contadores[req.params.id]++;
    res.send( "{ "+req.params.id+": "+ contadores[req.params.id] + "}" );
});

app.post('/borrar/:id', function (req, res) {
    contadores[req.params.id] = 0;
    res.send( "{ "+req.params.id+": "+ contadores[req.params.id] + "}" );
});

app.listen(process.env.PORT || 5000);
console.log('Server running..');
