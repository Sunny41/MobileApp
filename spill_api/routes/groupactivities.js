var express = require('express');
var router = express.Router();


/* GET group activities listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from GroupActivity', function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET group activites listing for a certain group id. */
router.get('/id', function(req, res, next) {
	connection.query('SELECT * from GroupActivity WHERE groupId = ?', req.query.s , function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET group activites listing for a certain activity id. */
router.get('/activity', function(req, res, next) {
	connection.query('SELECT * from GroupActivity WHERE activityId = ?', req.query.s , function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});


/* POST new group activity*/
router.post('/new', function (req,res,next) {
	connection.query('INSERT INTO GroupActivity SET groupID= ?, activityId = ?', [req.query.groupI, req.query.activityId], function (error, results, fields) {
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
