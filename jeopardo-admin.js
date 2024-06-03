var express = require('express');
var http = require('http');
http.globalAgent.maxSockets = 10000;
var bodyParser = require('body-parser');
var count = 0
var site = express();
site.use(bodyParser.json());
var action = {"action":"wrong","data": {"row": 3, "column": 3}}

site.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

site.get('/getAction', function(req, res){
	console.log('a');
  	res.set("Connection", "close");
	res.send(action);
	if (action != {}){
  		action = {};
  	}
});
site.post('/setAction', function(req, res){
	count += 1
	console.log(req.body,count);
  action = req.body;
  res.send('ok');
});
module.exports = site;
site.listen(8081);
