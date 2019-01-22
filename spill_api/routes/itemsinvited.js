var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	connection.query('SELECT * from ItemInvited WHERE itemInviteUserId = ? AND itemInviteActivityId = ?',[req.query.userId, req.query.activityId], function (error, results, fields) {
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
    connection.query('SELECT ItemInvited.*, a.username, b.username as "invitedUser" ' +
        'FROM ItemInvited JOIN User AS a ON ItemInvited.itemInviteUserId=a.userId ' +
        'JOIN User as b ON ItemInvited.itemInviteInvitedUserId = b.userId ' +
        'WHERE ItemInvited.itemInvitedId=?', req.query.s, function (error, results, fields) {
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
    connection.query('SELECT * from ItemInvited WHERE itemInviteUserId = ?', req.query.s, function (error, results, fields) {
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
    connection.query('SELECT * from ItemInvited WHERE itemInviteInvitedUserId = ?', req.query.s, function (error, results, fields) {
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
    connection.query('SELECT * from ItemInvited WHERE itemInviteActivityId = ?', req.query.s, function (error, results, fields) {
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
    var users = req.body.users;
    users.forEach(function (user) {
        connection.query('INSERT INTO ItemInvited SET itemName = ?, itemDescription = ?, amount = ?, itemInviteActivityId = ?, itemInviteUserId = ?, itemInviteInvitedUserId = ?', [req.query.itemName, req.query.itemDescription, req.query.amount,req.query.itemInviteActivityId, req.query.itemInviteUserId, user], function (error, results, fields) {
            if(error){
                res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                //If there is error, we send the error in the error section with 500 status
            } else {
                var itemId = results.insertId;
                connection.query('SELECT * from ItemInvited WHERE itemInvitedId = ?',itemId, function (error, results, fields) {
                    if(error){
                        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                        //If there is error, we send the error in the error section with 500 status
                    } else {
                        //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                        //If there is no error, all is good and response is 200OK.
                    }
                });
            }
        });
    });
    res.send(JSON.stringify({"status": 200, "error": null, "response": "ok"}));
});

/* edit existing Item */
router.put('/edit', function (req,res,next) {
    connection.query('UPDATE ItemInvited SET itemName = IfNull(?,itemName), itemDescription = IfNull(?,itemDescription) WHERE itemId = ? ', [req.query.itemName, req.query.itemDescription, req.query.itemId], function (error, results, fields) {
        var itemId = req.query.itemId;
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            connection.query('SELECT * from ItemInvited WHERE ItemId = ?',itemId, function (error, results, fields) {
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



/* delete item by id*/
router.delete('/delete', function(req, res, next) {
    connection.query('DELETE from ItemInvited WHERE itemInvitedId = ?', req.query.id, function (error, results, fields) {
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
