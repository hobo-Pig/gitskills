/**
 * 
 * @authors hobo (you@example.org)
 * @date    2016-08-26 15:30:53
 * @version 1.0.0
 */

var express =require('express');
var fs = require('fs');
var path = require('path');
var url = require('url');
var uuid = require('node-uuid')
var app = express();

// var cors= require('cors');
// app.use(cors());
app.get('/', function(req, res){
  res.send('testJSONP()');
});


app.get('/api/html/elements', function(req, res) { //Restful Get方法,查找整个集合资源  
	fs.readFile(__dirname + "/data/data.json", "utf8", function(err, data) {
		var newData = JSON.parse(data).data;
		if (err) {
			res.writeHead(500, {
				'Content-text': 'text/plain'
			});
			res.end(err);
		} else {
			res.json({
				"_meta": {
					"hint": "OK",
					"response_status": "200",
					"serveName": "adpaqaap8001",
					"log_id":uuid.v1()
				},
				"data": newData
			});
		}
	});
});

app.get('/api/html/elements/:id/data', function(req, res) { //Restful Get方法,查找一个单一资源  
	fs.readFile(__dirname + "/data/data.json", "utf8", function(err, data) {
		var newData = JSON.parse(data).options;
		if (err) {
			res.writeHead(500, {
				'Content-text': 'text/plain'
			});
			res.end(err);
		} else {
			// res.send(map.toString());
			// res.send(data); 
			var id = req.param('id');
			if (!newData[id]) {
				res.writeHead(500, {
					'Content-text': 'text/plain'
				});
				res.end("can not find " + id);
			} else {

				res.json({
					"_meta": {
						"hint": "OK",
						"response_status": "200",
						"serveName": "adpaqaap8001",
						"log_id": uuid.v1()
					},
					"data": newData[id].data
				});
			}
		}
	});
});



app.get('/api/html/elements/:id/actions',function(req, res){ //Restful Get方法,查找一个单一资源  
		fs.readFile(__dirname+"/data/data.json","utf8",function(err, data) {
			var acrionsData = JSON.parse(data).actions;
			if (err) {
				res.writeHead(500, {
					'Content-text': 'text/plain'
				});
				res.end(err);
			} else {
				// res.send(map.toString());
    			// res.send(data); 
 				var id = req.param('id');
 				var newData = acrionsData.other;
 				if(id === "image"){
 					newData = acrionsData.image;
 				}
				res.json({
				"_meta": {
					"hint": "OK",
					"response_status": "200",
					"serveName": "adpaqaap8001",
					"log_id":uuid.v1()
				},
				"data": newData
			});
			}
		});
});  


app.use(express.static('app'));

var server = app.listen(3000,function(){
	  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});