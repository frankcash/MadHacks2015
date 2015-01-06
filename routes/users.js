console.log(global.keys.sendgrid.username, global.keys.sendgrid.password);

var sendGrid = require('sendgrid')(global.keys.sendgrid.username, global.keys.sendgrid.password);

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

router.post('/subscribe', function(req, res){
	console.log(req.body);
	var email = validator.toString(req.body.email);
	
	if(email == undefined){res.send(200, {success:false, reason:"Email is not valid"}); return;}

	db.run("INSERT INTO subscriptions ('email') VALUES ('"+email+"');", function(err){
		if(err){
			if(err.errno == 19){
				res.send(200, {success:false, reason:"Already exists"});
			}else{
				res.send(200, {success:false, reason:"Database error"});
			}
			console.log(err); return;
		}

		var subEmail = new sendGrid.Email();
		console.log(email);
		subEmail.addTo(email);
		subEmail.setFrom("noreply@madhacks.org");
		subEmail.setSubject("MadHacks News Subscription");
		subEmail.setHtml("You have been subscribed to MadHacks emails. #HackCity");
		console.log(subEmail);
		sendGrid.send(subEmail, function(err, json){
			if(!err){
				res.send(200, {success:true});
			}else{
				console.log(err, json)
				db.run("DELETE FROM subscriptions WHERE email='"+email+"';");
				res.send(200, {success:false, reason:"sendgrid error"});
			}
		});
	});
});

module.exports = router;
