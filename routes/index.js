var express = require('express');
var router = express.Router();
var blankUser = { 
	firstname: '',
	lastname: '',
	email: '',
	password: '',
	swag_size: '',
	is_18: 'false',
	attend_school: 'true',
	school: '',
	state: '',
	country: '',
	city: '',
	zip: '',
	travel: 'false',
	venmo: '',
	food_vegetarian: 'false',
	food_vegan: 'false',
	food_glutenfree: 'false',
	food_pescetarian: 'false',
	food_dairyfree: 'false',
	food_kosher: 'false',
	food_halal: 'false',
	food_other: '',
	Github: '',
	linkedIn: '',
	Dribble: '',
	resume: 'Select Resume',
	exposure: '',
	plan_hardware: 'false',
	plan_hardware_on: '',
	plan_mentee: 'false',
	plan_mentor: 'false',
	need_partner: 'false',
	plan_need_partner_skills: '',
	update:'false'
}

/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.signedCookies.user)
	if(req.signedCookies.user == undefined)
		res.render('page_index', { title: 'Madhacks', logged:'false' });
	else		
		res.render('page_index', { title: 'Madhacks', logged:'true' });

});
router.get('/about', function(req, res) {
	res.render('page_about', { title: 'Madhacks' });
});
router.get('/sponsor', function(req, res) {
	res.render('page_sponsor', { title: 'Madhacks' });
});
router.get('/contact', function(req, res) {
	res.render('page_contact', { title: 'Madhacks' });
});

router.get('/apply', function(req, res) {
	global.sqler.getUser(req, function(err, user){
		if(err || user == undefined){
			res.render('page_application', blankUser);
		}else{
			user.update = 'true';
			console.log("old", user);
			res.render('page_application', user);
		}
	});
});
router.get('/login', function(req, res) {
	res.render('page_login', {tittle: 'Apply'});
});
router.get('/logout', function(req, res) {
	res.clearCookie('user');
	res.redirect("/");
});

module.exports = router;
