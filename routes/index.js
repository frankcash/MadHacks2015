var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Madhacks' });
});

router.get('/lightshow', function(req, res) {
  res.render('lightning', { title: 'Madhacks' });
});


module.exports = router;
