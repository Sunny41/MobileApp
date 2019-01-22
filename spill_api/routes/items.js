var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* GET items listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from Item', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET items listing, search query for item name. */
router.get('/name', function(req, res, next) {
	connection.query('SELECT * from Item WHERE itemName like ?', '%'+req.query.s+'%' , function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET items  listing, search query for item description. */
router.get('/description', function(req, res, next) {
	connection.query('SELECT * from Item WHERE itemDescription like ?', '%'+req.query.s+'%' , function (error, results, fields) {
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
	connection.query('SELECT Item.*, User.username\n' +
		'FROM Item\n' +
		'JOIN User ON Item.itemUserId = User.userId\n' +
		'WHERE Item.itemId=?', req.query.s, function (error, results, fields) {
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
	connection.query('SELECT * from Item WHERE itemUserId like ?', req.query.s, function (error, results, fields) {
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
	connection.query('SELECT * from Item WHERE itemActivityId like ?', req.query.s, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* POST new item */
router.post('/new', function (req,res,next) {
	var users = req.body.users;
	var response;
	users.forEach(function (user) {
		connection.query('INSERT INTO Item SET itemName = ?, itemDescription = ?, itemUserId = ?, amount = ?, itemActivityId = ?', [req.query.itemName, req.query.itemDescription, user, req.query.amount, req.query.itemActivityId], function (error, results, fields) {
			if(error){
				res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
				//If there is error, we send the error in the error section with 500 status
			} else {
				var itemId = results.insertId;
				connection.query('SELECT * from Item WHERE itemId = ?',itemId, function (error, results, fields) {
					if(error){
						res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
						//If there is error, we send the error in the error section with 500 status
					} else {
						//res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
						response += results;
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
	connection.query('UPDATE Item SET itemName = IfNull(?,itemName), itemDescription = IfNull(?,itemDescription) WHERE itemId = ? ', [req.query.itemName, req.query.itemDescription, req.query.itemId], function (error, results, fields) {
		var itemId = req.query.itemId;
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			//res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			connection.query('SELECT * from Item WHERE ItemId = ?',itemId, function (error, results, fields) {
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
	connection.query('DELETE from Item WHERE itemId = ?', req.query.id, function (error, results, fields) {
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
