var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	connection.query('SELECT * from ItemInvited', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.get('/name', function(req, res, next) {
	connection.query('SELECT * from ItemInvited WHERE itemName like ?', '%'+req.query.s+'%' , function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

router.get('/description', function(req, res, next) {
	connection.query('SELECT * from ItemInvited WHERE itemDescription like ?', '%'+req.query.s+'%' , function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET items  listing, search query for item id. */
router.get('/id', function(req, res, next) {
    connection.query('SELECT * from ItemInvited WHERE itemInvitedId like ?', req.query.s, function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/* GET items  listing, search query for user id. */
router.get('/user', function(req, res, next) {
    connection.query('SELECT * from ItemInvited WHERE itemInviteUserId like ?', req.query.s, function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.get('/invited', function(req, res, next) {
    connection.query('SELECT * from ItemInvited WHERE itemInviteInvitedUserId like ?', req.query.s, function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});


/* GET items  listing, search query for activity id. */
router.get('/activity', function(req, res, next) {
    connection.query('SELECT * from ItemInvited WHERE itemInviteActivityId like ?', req.query.s, function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.post('/new', function (req,res,next) {
    connection.query('INSERT INTO ItemInvited SET itemName = ?, itemDescription = ?, itemUserId = ?, amount = ?, itemInviteActivityId = ?, itemInviteUserId = ?, itemInviteInvitedUserId = ?', [req.query.itemName, req.query.itemDescription, req.query.itemInviteUserId, req.query.amount, req.query.itemInviteActivityId, req.query.itemInviteInvitedUserId], function (error, results, fields) {
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
