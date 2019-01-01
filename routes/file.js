var express = require('express');
var router = express.Router();
var targetDir = './';
var fs = require('fs');

/* 파일 */
router.get('/', function(req, res, next) {
    //res.send('hello');
  fs.readdir(targetDir, function(error, filelist){
    console.log(filelist);
      res.send(filelist);
      
  });
});

module.exports = router;
