const express = require("express");
const app = express();
const http = require("http").Server(app).listen(80);
const upload = require("express-fileupload");
var shell = require('shelljs');

console.log("server started");
app.use(upload());

app.get("/",function(req,res){
	res.sendFile(__dirname+'/index.htm');
	console.log("Get request");
})	

app.post("/",function(req,res){
	console.log("Post request");
	if (Object.keys(req.files).length == 0) {
		return res.status(400).send('No files were uploaded.');
	}
	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	var testFile = req.files.testFile;
	var filename=testFile.name;
	var filedata=testFile.data;
	console.log(testFile);
	testFile.mv('/home/shiv/Desktop/Demo-Api/test.sh', function(err) {
		if (err)
		      return res.status(500).send(err);
		console.log("Execution started");
		const response= shell.exec("./test.sh");
		console.log("Execution Ended");
		res.json({ output : response })
	});
})
