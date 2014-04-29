var MailChimpAPI = require('mailchimp').MailChimpAPI;
var apiKey = '8af769502da3f8f2a5ced2261da35ef3-us8';

try { 
    var api = new MailChimpAPI(apiKey, { version : '2.0' });
} catch (error) {
    console.log(error.message);
}

module.exports = function(app){
	app.get('/subscribe/:email', function(req, res){
		var email = req.params.email;

		api.call('lists', 'list', function(error, data){
			if (error)
		        console.log(error.message);
		    else{
		    	console.log(JSON.stringify(data)); // Do something with your data!
		    	res.json(data);
		    	var id = data.data[0].id;
		    	subscribeEmail(id, email, res);
		    }  
		});
	});
}

function subscribeEmail(id, email, res){
	console.log(email);
	api.call('lists', 'subscribe', {id: id, email:{email: email}}, function (error, data) {
    if (error)
        console.log(error.message);
    else
        res.json(data); // Do something with your data!
    	//pause();
	});
}