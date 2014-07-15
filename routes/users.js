var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

router.get('/sub', function(req, res){
	var email = validator.toString(req.query.email);
	console.log(email);
	if(email == undefined){res.send(200, {success:false, reason:"Email is not valid"}); return;}
	db.run("INSERT INTO subscriptions ('email') VALUES ('"+email+"');", function(err){
		if(err){res.send(200, {success:false, reason:"Database error"}); console.log(err); return;}
		
		res.send(200, {success:true});
	});
});

module.exports = router;
