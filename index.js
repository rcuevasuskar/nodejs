#!/usr/bin/env

var rest = require('restler');
var express=require('express');
var app = express();
var contadores = new Array;
var puerto = 8080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT")
  next();
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

app.listen(puerto);
console.log('Server running at http://127.0.0.1:'+puerto+'/');
