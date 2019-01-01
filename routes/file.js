var express = require('express');
var router = express.Router();
var targetDir = './files/';
var fs = require('fs');

/* 파일 */
router.get('/', function(req, res, next) {
    //res.send('hello');
  fs.readdir(targetDir, function(error, filelist){
    res.render('filelist', { files: filelist });
    //console.log(filelist);
      //res.send(filelist);
      
  });
});
router.get('/:filename', async (req, res) => {
    var file = fs.readFileSync(targetDir + req.params.filename, 'binary');
    res.setHeader('Content-Length', file.length);
    res.write(file, 'binary');
    res.end();
});
module.exports = router;
