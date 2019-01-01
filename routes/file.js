var express = require('express');
var router = express.Router();

/* 파일 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
