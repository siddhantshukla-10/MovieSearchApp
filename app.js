var express = require('express');
var app = express();

var request  = require('request');

app.use(express.static("public"));  //tell app to view files(app.css) from public directory
app.set("view engine","ejs");  //now we can remove .ejs from every get request, it automatically expects ejs files

app.get("/",function(req,res){
	res.render("search");
});

app.get("/results",function(req,res){
	var movieName = req.query.movieName;
	var url = "http://www.omdbapi.com/?s="+movieName+"&apikey=thewdb";
	request(url,function(error,response,body){
	if(!error && response.statusCode===200){
		var data = JSON.parse(body);
		res.render("results", {data: data});
	}
});
});

app.listen(3000,function(){
	console.log("Server started!!");
})