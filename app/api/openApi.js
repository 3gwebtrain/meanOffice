"use strict";

var User 		= require('../models/user');

module.exports = function( express, app ) {


	var apiRouter = express.Router();


	apiRouter
		.get('/create', function( req, res ){

			res.send( "yet to get users!");

		})
		.post('/create', function( req, res ) {

			var user = new User();

			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;

			user.save(function(err) {

				if( err ){

					if( err.code == 11000 ) {
						return res.json({success:false, message:'Username already exist'});
					} else {
						return res.send( err );
					}

				}

				res.send("user created!");

			})

		})


	app.use('/open', apiRouter);

	return apiRouter;

}