var express = require('express');
var router = express.Router();

/* GET activities listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from Activity', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET activities listing, search query for id. */
router.get('/id', function(req, res, next) {
    connection.query('SELECT * from Activity WHERE activityId = ?',req.query.s, function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/* GET activities listing, search query for admin id. */
router.get('/admin', function(req, res, next) {
    connection.query('SELECT * from Activity WHERE activityAdminId = ?',req.query.s, function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/* GET activities listing, search query for group id. */
router.get('/group', function(req, res, next) {
    connection.query('SELECT * from Activity WHERE activityGroupId = ?',req.query.s, function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/* GET activities listing, search query for name. */
router.get('/name', function(req, res, next) {
	connection.query('SELECT * from Activity WHERE name like  ?','%'+req.query.s+'%', function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET activities listing, search query for description content. */
router.get('/description', function(req, res, next) {
	connection.query('SELECT * from Activity WHERE description like  ?','%'+req.query.s+'%', function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET activities listing, search query for place. */
router.get('/place', function(req, res, next) {
		connection.query('SELECT * from Activity WHERE place like  ?','%'+req.query.s+'%', function (error, results, fields) {
			if(error){
				res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
				//If there is error, we send the error in the error section with 500 status
			} else {
				res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
				//If there is no error, all is good and response is 200OK.
			}
		});
	});


/* insert new activity */
router.post('/new', function (req,res,next) {
	connection.query('INSERT INTO Activity SET name = ?, description = ?, date = ?, place = ?, activityAdminId = ?, activityGroupId = ?', [req.query.name, req.query.description, req.query.date, req.query.place, req.query.activityAdminId, req.query.activityGroupId], function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
            var activityId = results.insertId;
            var userId = req.query.activityAdminId;
            connection.query('SELECT * from Activity WHERE activityId = ?',activityId, function (error, results, fields) {
                if(error){
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                    //If there is no error, all is good and response is 200OK.
                    connection.query('INSERT INTO ActivityMembers SET activityMembersActivityId= ?, activityMembersUserId = ?', [activityId, userId]);
                }
            });
        }
    });
});

/* edit existing activity */
router.put('/edit', function (req,res,next) {
	connection.query('UPDATE Activity SET name = IfNull(?,name), description = IfNull(?,description), date = IfNull(?,date), place = IfNull(?,place) WHERE activityId = ? ', [req.query.name, req.query.description, req.query.date, req.query.place, req.query.activityId], function (error, results, fields) {
		var activityId = req.query.activityId;
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			//res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			connection.query('SELECT * from Activity WHERE activityId = ?',activityId, function (error, results, fields) {
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

/* delete activity by id*/
router.delete('/delete', function(req, res, next) {
	connection.query('DELETE from Activity WHERE activityId = ?', req.query.id, function (error, results, fields) {
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
