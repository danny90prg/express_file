var express = require('express');
var router = express.Router();
var targetDir = './files/';
var fs = require('fs');
var exec = require('child_process').exec;
const spawn = require("child_process").spawn;

/* 파일 */
router.get('/',  async (req, res) => {
    res.render('inputurl');
});

router.get('/ping',  async (req, res) => {
    // 한글깨짐 cp949->cp65001로 바꿔야하는데 거지같음으로 안함
    res.writeHead(200, { 
        "Content-Type": "text/event-stream" 
    });
    var spw = spawn('ping', ['127.0.0.1']),
        str = "";
        spw.stdout.on('data', function (data) {
            console.log(data.toString());
            str += data.toString();
            // Flush out line by line.
		var lines = str.split("\n");
		for(var i in lines) {
			if(i == lines.length - 1) {
				str = lines[i];
			} else{
				res.write(lines[i] + "\n");	
			}
		}
	});
	
	spw.on('close', function (code) {
		res.end(str);
	});
	
	spw.stderr.on('data', function (data) {
		res.end('stderr: ' + data);
	});
	
	
});
router.post('/',  async (req, res) => {
    const url = req.param('url');
    //console.log(url);
    res.writeHead(200, { "Content-Type": "text/event-stream" });
    var spw = spawn('ping', ['127.0.0.1']),
        str = "";
        spw.stdout.on('data', function (data) {
            str += data.toString();
            
            console.log("data");
            // Flush out line by line.
		var lines = str.split("\n");
		for(var i in lines) {
			if(i == lines.length - 1) {
				str = lines[i];
			} else{
				res.write(lines[i] + "\n");	
			}
		}
	});
	
	spw.on('close', function (code) {
		res.end(str);
	});
	
	spw.stderr.on('data', function (data) {
		res.end('stderr: ' + data);
	});
	/*
    const pythonProcess = await spawn('python',["../ytcc.py",
    const ex = await exec('pwd', function callback(error, stdout, stderr){
        console.log(req.param.url);
        //res.send('done' + req.param.url);
    });

    res.send(url);*/
	
});


module.exports = router;
