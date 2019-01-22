var express = require('express');
var router = express.Router();

/* GET payments listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from Payments', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET payment by id. */
router.get('/id', function(req, res, next) {
	connection.query('SELECT * FROM from Payments WHERE paymentId = ?',req.query.s, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* GET payments listing per item id. */
router.get('/item', function(req, res, next) {
	connection.query('SELECT * FROM Payments WHERE itemId = ?',req.query.s, function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

/* POST new payment*/
router.post('/new', function (req,res,next) {
	connection.query('INSERT INTO Payments SET itemId = ?, amountPayed= ?', [req.query.itemId, req.query.amount], function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			var paymentId = results.insertId;
			connection.query('SELECT * from Payments WHERE paymentId = ?',paymentId, function (error, results, fields) {
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

/* delete payment by id*/
router.delete('/delete', function(req, res, next) {
	connection.query('DELETE from Payments WHERE paymentId = ?', req.query.id, function (error, results, fields) {
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
