var express = require('express');
var router = express.Router();

/* GET groups listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from mobileapp.Group', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET groups listing, search query for id. */
router.get('/id', function(req, res, next) {
	connection.query('SELECT * from mobileapp.Group WHERE groupId = ? ',req.query.s, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET groups listing, search query for user id. */
router.get('/user', function(req, res, next) {
	connection.query('SELECT * from mobileapp.Group WHERE groupAdminId = ? ',req.query.s, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET groups listing, search query for name. */
router.get('/name', function(req, res, next) {
	connection.query('SELECT * from mobileapp.Group WHERE name like ? ','%'+req.query.s+'%', function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET groups listing, search query within description. */
router.get('/description', function(req, res, next) {
	connection.query('SELECT * from mobileapp.Group WHERE description like ? ','%'+req.query.s+'%', function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});


/* insert new group */
router.post('/new', function (req,res,next) {
    connection.query('INSERT INTO mobileapp.Group SET name = ?, description = ?, groupAdminId = ?', [req.query.name, req.query.description, req.query.groupAdminId], function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            var groupId = results.insertId;
            var userId = req.query.groupAdminId;
            //adding the group admin to the group
            connection.query('SELECT * from mobileapp.Group WHERE groupId = ?',groupId, function (error, results, fields) {
                if(error){
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                    connection.query('INSERT INTO GroupMembers SET groupID= ?, userId = ?', [groupId, userId]);
                }
            });
        }
    });
});

/* edit existing group */
router.put('/edit', function (req,res,next) {
	connection.query('UPDATE mobileapp.Group SET name = IfNull(?,name), description = IfNull(?,description) WHERE groupId = ? ', [req.query.name, req.query.description, req.query.groupId], function (error, results, fields) {
		var groupId = req.query.groupId;
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			//res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			connection.query('SELECT * from mobileapp.Group WHERE groupId = ?',groupId, function (error, results, fields) {
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

/* delete group by id*/
router.delete('/delete', function(req, res, next) {
	connection.query('DELETE from mobileapp.Group WHERE groupId = ?', req.query.id, function (error, results, fields) {
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
