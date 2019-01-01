var express = require('express');
var router = express.Router();
var fs = require('fs');
var targetDir = '';
const read = fs.readFile('./file.conf', (err, data) => {
  if (err) throw err;
  targetDir = data;
  console.log(targetDir);
}); //'./files/';

/* 파일 */
router.get('/', function(req, res, next) {
    //res.send('hello');
    //names = await fs.readdir('path/to/dir');
    //cfg = await fs.readFile('../file.conf');
  console.log(targetDir);
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
