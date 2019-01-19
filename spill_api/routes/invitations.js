var express = require('express');
var router = express.Router();

/* GET invitations listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from Invitation', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET invitation by id. */
router.get('/id', function(req, res, next) {
	connection.query('Select Invitation.*, a.username as "sender", b.username as "recipient", c.name as "groupname", c.description, c.groupAdminId, d.username as "groupadmin"\n' +
		'from Invitation\n' +
		'Join User As a On Invitation.invitationFromUserId=a.userId\n' +
		'Join User As b On Invitation.invitedUserId=b.userId\n' +
		'Join mobileapp.Group As c On Invitation.invitationForGroupId=c.groupId\n' +
		'Join User As d On c.groupAdminId=d.userId\n' +
		'where Invitation.invitationId=?',req.query.s, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET invitations listing per user id. */
router.get('/user', function(req, res, next) {
	connection.query('Select Invitation.*, a.username as "sender", b.username as "recipient", c.name as "groupname", c.description, c.groupAdminId, d.username as "groupadmin"\n' +
		'from Invitation\n' +
		'Join User As a On Invitation.invitationFromUserId=a.userId\n' +
		'Join User As b On Invitation.invitedUserId=b.userId\n' +
		'Join mobileapp.Group As c On Invitation.invitationForGroupId=c.groupId\n' +
		'Join User As d On c.groupAdminId=d.userId\n' +
		'where Invitation.invitationFromUserId=?',req.query.s, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET invitations listing per invited user id. */
router.get('/invitedUser', function(req, res, next) {
	connection.query('Select Invitation.*, a.username as "sender", b.username as "recipient", c.name as "groupname", c.description, c.groupAdminId, d.username as "groupadmin"\n' +
		'from Invitation\n' +
		'Join User As a On Invitation.invitationFromUserId=a.userId\n' +
		'Join User As b On Invitation.invitedUserId=b.userId\n' +
		'Join mobileapp.Group As c On Invitation.invitationForGroupId=c.groupId\n' +
		'Join User As d On c.groupAdminId=d.userId\n' +
		'where Invitation.invitedUserId=?',req.query.s, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET invitations listing per invited group id. */
router.get('/groupId', function(req, res, next) {
	connection.query('SELECT * from Invitation WHERE invitationForGroupId = ?',req.query.s, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* POST new invitation*/
router.post('/new', function (req,res,next) {
	connection.query('INSERT INTO Invitation SET invitedUserId = ?, invitationFromUserId = ?, invitationForGroupId = ?', [req.query.invitedUserId, req.query.invitationFromUserId, req.query.invitationForGroupId], function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			var invitationId = results.insertId;
			connection.query('SELECT * from Invitation WHERE invitationId = ?',invitationId, function (error, results, fields) {
				if(error){
					res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
					//If there is error, we send the error in the error section with 500 status
				} else {
					res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
					//If there is no error, all is good and response is 200OK.
				}
			});
		}
	});
});

/* delete invitation by id*/
router.delete('/delete', function(req, res, next) {
	connection.query('DELETE from Invitation WHERE invitationId = ?', req.query.id, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

module.exports = router;
