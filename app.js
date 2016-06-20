var express = require('express');
var promise = require('bluebird');
var path = require('path');
var app = express();
var options =  {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var db = pgp('postgres://faisalkhan:admin@localhost:5432/todolist');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));

app.get("/list",function(req,res, next){
  db.any('SELECT * FROM list')
  	.then(function(data){
  		res.render('index',{ data: data });
  	})
  	.catch(function(err){
  		return next(err);
  	});
});
app.post("/list",function(req,res,next){
  var newitem = req.body.item;
console.log(newitem);
	console.log("INSERT INTO list(item) values('"+ newitem +"')");
	db.none("INSERT INTO list(item) values('"+ newitem +"')")
	.then(function(){
		console.log('success');
		res.redirect('/list');
	})
	.catch(function(err){
		console.log('err');
		return next(err);
	});
});




app.listen(8000, function(){
 console.log('listening on port 8000');
});
