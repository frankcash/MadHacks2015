console.log(global.keys.sendgrid.username, global.keys.sendgrid.password);

var sendGrid = require('sendgrid')(global.keys.sendgrid.username, global.keys.sendgrid.password);
var ejs = require('ejs');
var fs = require('fs');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

router.post('/subscribe', function(req, res){
	console.log(req.body);
	var email = validator.toString(req.body.email);
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(re.test(email) == false){
		res.send(200, {success:false, reason:"invalid"});
		return;
	}
	
	if(email == undefined){res.send(200, {success:false, reason:"Email is not valid"}); return;}

	db.run("INSERT INTO subscriptions ('email') VALUES ('"+email+"');", function(err){
		if(err){
			if(err.errno == 19){
				res.send(200, {success:false, reason:"already"});
			}else{
				res.send(200, {success:false, reason:"Database error"});
			}
			console.log(err.errno); return;
		}
		db.get("SELECT rowid FROM subscriptions WHERE email='"+email+"';", function(err, user){
			if(!err && user != null){
				
				var subEmail = new sendGrid.Email();
				subEmail.addTo(email);
				subEmail.setFrom("noreply@madhacks.org");
				subEmail.fromname = "Madhacks";
				subEmail.setSubject("MadHacks News Subscription");
				var view = fs.readFileSync(__dirname + '/../views/email_subscribe.ejs', 'utf8');
				var rendered = ejs.render(view, {id:user.rowid});
				console.log(rendered);
				subEmail.setHtml(rendered);

				subEmail.setText("You have been subscribed to MadHacks emails. #HackCity To unsubscribe visit http://madhacks.org/unsubscribe?id="+user.rowid);
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

			}else{
				console.log(err, json);
				res.send(200, {success:false, reason:"db error"});
			}
		});
	});
});

router.get('/unsubscribe', function(req, res){
	console.log(req.query);
	var id = req.query.id;
	if(id == parseInt(id, 10))
	db.run("DELETE FROM subscriptions WHERE rowid='"+id+"';");
	res.render("unsubscribe", {title:"Unsubscribed"});
});

router.post('/apply', function(req, res){
	var body = {};
	var once = false;
	var done = function (){
		if(once == false){
			once = true;
			global.sqler.insertApplication(body, function(err){
				console.log("done");
				console.log("error", err);
				if(err)
					res.send(400, {success:false, error:err.err});
				else
					res.send(200,{success:true});
			});
		}
	}
	if(req.busboy) {
		req.busboy.on("file", function(fieldName, file, filename) {
			filename = global.s4() + global.s4() + "." + filename.split(".")[filename.split(".").length - 1];
			body.resume = filename;
			var fstream = fs.createWriteStream(__dirname + '/../resumes/' + filename);
			fstream.on('close', function () {
				if(req.busboy["_done"]);
					done();
			});
			file.pipe(fstream);
		});
		req.busboy.on('field', function(key, value) {
			body[key] = value;
			if(req.busboy["_done"]);
				done();
    	});
		req.pipe(req.busboy);
	}
	else {
		console.log("shit")
	}
});

router.post('/anon', function(req, res){
	global.sqler.insertAnon(req.body, function(){});
	res.send(200, {success:true});
});
module.exports = router;
