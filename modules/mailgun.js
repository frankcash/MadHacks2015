var Mailgun = require('mailgun-js');
var mailgun = new Mailgun({apiKey: 'key-8wsdq8aid8zr9-61bww-3ysnhq8ss2k0', domain: 'madhacks@sandbox6e1b84a8c0ac43b9827519b9e5ad70dd.mailgun.org'});

var publickey = 'pubkey-0q5g9ttze5kqb6y49llftpzqb8frvrd9';

exports.addUser = function(email, cb){
	var members = [
		{
			address: email
		}
	];

	mailgun.lists('madhacks@sandbox6e1b84a8c0ac43b9827519b9e5ad70dd.mailgun.org').members().add({members: members, subscribed: true }, function(err, body, cb){
		console.log(body);
	});
}