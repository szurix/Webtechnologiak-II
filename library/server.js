var http = require("http");
var fs = require("fs");
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var user;

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

app.get("/books", function(req,res){
	fs.readFile(__dirname+"/public/json/books.json","utf8",function(err,data){
	res.send(data);
	});
});

app.get("/authors", function(req,res){
	fs.readFile(__dirname+"/public/json/authors.json","utf8",function(err,data){
	res.send(data);
	});
});

app.post("/addBook", function(req,res){
	var books = JSON.parse(fs.readFileSync(__dirname+"/public/json/books.json"));
	books.push(req.body);
	fs.writeFile(__dirname+"/public/json/books.json",JSON.stringify(books),function(err){
		res.send(err);
	});
});

app.post("/addAuthor", function(req,res){
	var authors = JSON.parse(fs.readFileSync(__dirname+"/public/json/authors.json"));
	authors.push(req.body);
	fs.writeFile(__dirname+"/public/json/authors.json",JSON.stringify(authors),function(err){
		res.send(err);
	});
});

app.get("/user", function(req, res) {
	res.send(user);
});

app.post("/login", function(req, res) {
	var users = JSON.parse(fs.readFileSync(__dirname + "/public/json/user.json", "utf8"));
	for (var u of users) {
		if (u.username === req.body.username && u.password === req.body.password) {
			user = u;
			break;
		}
	}
	if (user === undefined) {
		res.status(201).end();
	} else {
		res.send(user);
	}
});

app.post("/logout", function(req, res) {
	user = undefined;
	res.end();
});
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
