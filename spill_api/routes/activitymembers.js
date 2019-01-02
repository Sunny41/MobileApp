var express = require('express');
var router = express.Router();

/* GET activity members listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from ActivityMembers', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET activity members listing for a certain activity id. */
router.get('/id', function(req, res, next) {
	connection.query('SELECT * from ActivityMembers WHERE activityMembersActivityId=?', req.query.s , function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET activity members listing for a certain user id. */
router.get('/user', function(req, res, next) {
	connection.query('SELECT * from ActivityMembers WHERE activityMembersUserId=?', req.query.s , function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});
/* POST new activity member */
router.post('/new', function (req,res,next) {
	connection.query('INSERT INTO ActivityMembers SET activityMembersActivityId= ?, activityMembersUserId = ?', [req.query.activityMembersActivityId, req.query.activityMembersUserId], function (error, results, fields) {
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
