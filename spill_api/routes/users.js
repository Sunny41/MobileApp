var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from User', function (error, results, fields) {
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
	connection.query('SELECT * from User WHERE mail like  ?','%'+req.query.s+'%', function (error, results, fields) {
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
	connection.query('SELECT * from User WHERE username like ?','%'+req.query.s+'%', function (error, results, fields) {
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
	connection.query('SELECT * from User WHERE userId = ?',req.query.s, function (error, results, fields) {
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
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.query.password, salt);
	connection.query('INSERT INTO User SET mail = ?, username = ?, password = ?', [req.query.mail, req.query.username, hash], function (error, results, fields) {
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

module.exports = router;
