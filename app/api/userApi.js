"use strict";

var User 		= require('../models/user');
var jwt 		= require('jsonwebtoken');
var superSecret = 'ilovescotchscotchyscotchscotch';

module.exports = function( express, app ) {


	var UserRouter = express.Router();


	UserRouter.post('/authenticate', function( req, res ) {

		console.log( req.body.username )

		User.findOne({

			username : req.body.username

		}).select('name username password').exec(function(err, user ) {


			if( err ) throw err;

			if( !user ){

				res.json({success:false,message:'Authentication Failed, User Not found'})

			} else if ( user ) {


				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.json({
						success:false,
						message:'Authentication failed, Wrong Password'
					})
				} else {

					var token = jwt.sign({
						name:user.name,
						username:user.username
					}, superSecret, {
						expiresIn: '1440m'
					});

					res.json({
						success:true,
						message:'Enjoy the token',
						token:token
					})

				}

			}

		})

	})


	UserRouter.use(function( req, res, next ) {

		// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, superSecret, function(err, decoded) {

			if (err) {

				return res.status(403).send({

					success: false,
					message: 'Failed to authenticate token.'
				});

			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});

	} else {

		// if there is no token
		// return an HTTP response of 403 (access forbidden) and an error message

		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}

	})

	UserRouter
		.get('/users', function( req, res ) {

			User.find( function( err, users ) {

				if( err ) res.send( err );

				res.json( users );

			} )

		});

	UserRouter
		.get('/user/:user_id', function( req, res ) {

			console.log('req.param.user_id', req.params.user_id )

			User.findById( req.params.user_id, function( err, user ) {

				if( err ) res.send( err );

				res.json( user );

			} )

		});

	UserRouter
		.get('/me', function( req, res ) {
			res.send( req.decoded );

		})


	app.use('/api', UserRouter);
	
	return UserRouter;
}