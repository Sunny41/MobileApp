var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT userId, mail, username from User', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET user listing, search query for mail address. */
router.get('/mail', function(req, res, next) {
	connection.query('SELECT userId, mail, username from User WHERE mail like  ?','%'+req.query.s+'%', function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET users listing, search query for username. */
router.get('/name', function(req, res, next) {
	connection.query('SELECT userId, mail, username from User WHERE username like ?','%'+req.query.s+'%', function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

router.get('/id', function(req, res, next) {
	connection.query('SELECT userId, mail, username from User WHERE userId = ?',req.query.s, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

//insert a new user into the db
router.post('/new', function (req,res,next) {
    var mail = req.query.mail.trim();
    connection.query('SELECT COUNT (*) as count from User WHERE mail =  ?',mail, function (error, results, fields) {
        console.log(results[0].count);
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else if (results[0].count > 0){
            res.send(JSON.stringify({"status": 500, "error": error, "response": "email-address already taken"}));
            //If there is no error, all is good and response is 200OK.
        } else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.query.password, salt);
            connection.query('INSERT INTO User SET mail = ?, username = ?, password = ?', [mail, req.query.username, hash], function (error, results, fields) {
                if(error){
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    var userId = results.insertId;
                    connection.query('SELECT * from User WHERE userId = ?',userId, function (error, results, fields) {
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
        }
    });
});

/* edit existing User */
router.put('/edit', function (req,res,next) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.query.password, salt);
    connection.query('UPDATE User SET mail = IfNull(?,mail), username = IfNull(?,username), password = IfNull(?,password) WHERE userId = ? ', [req.query.mail, req.query.username, hash, req.query.userId], function (error, results, fields) {
        var userId = req.query.userId;
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            connection.query('SELECT * from User WHERE userId = ?',userId, function (error, results, fields) {
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

/* login */
router.post('/login', function(req, res, next) {
	connection.query('SELECT userId, password from User WHERE mail = ?',req.query.mail, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			var hash = results[0].password;
			var userId = results[0].userId;
			if (bcrypt.compareSync(req.query.password, hash)) {
				connection.query('SELECT userId, username, mail from User WHERE userId = ?',userId, function (error, results, fields) {
					if(error){
						res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
					} else {
						res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
					}
				});
			} else {
				res.send(JSON.stringify({"status": 500, "error": error, "response": "invalid credentials"}));
			}
		}
	});
});

/* delete user by id*/
router.delete('/delete', function(req, res, next) {
	connection.query('DELETE from User WHERE userId = ?', req.query.id, function (error, results, fields) {
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
