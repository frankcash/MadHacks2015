var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Madhacks' });
});
router.get('/email', function(req, res) {
	res.render('email_subscribe', { title: 'Madhacks', rowid:0 });
});

router.get('/lightshow', function(req, res) {
	res.render('lightning', { title: 'Madhacks' });
});

router.get('/apply', function(req, res) {
	res.render('application', {tittle: 'Apply'});
});

module.exports = router;
