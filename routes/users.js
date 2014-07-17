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
		var transport = global.nm.createTransport("direct", {debug: true});
		transport.sendMail({
			from: "Madhacks <noreply@madhacks.org>", // sender address
			to: "<"+email+">", // list of receivers
			subject: "Subscribed!", // Subject line
			text: "Thanks for subscribing!", // plaintext body
			html: "<h1>Thank you!</h1><br><p>You'll be kept up to date with the newest news regarding madhacks as it develops!</p><br>"
		}, function(error, response){
			if(error){res.send(200, {success:false, reason:"Mailing error before attempt"}); console.log(error); return;}
			// response.statusHandler only applies to 'direct' transport
			response.statusHandler.once("failed", function(data){
				console.log(
				  "Permanently failed delivering message to %s with the following response: %s",
				  data.domain, data.response);
				res.send(200, {success:false, reason:"Mailing error on attempt", mail_response:data.response});
			});

			response.statusHandler.once("requeue", function(data){
				console.log("Temporarily failed delivering message to %s", data.domain);
			});

			response.statusHandler.once("sent", function(data){
				console.log("Message was accepted by %s", data.domain);
				res.send(200, {success:true});
			});
		});
	});
});

module.exports = router;
