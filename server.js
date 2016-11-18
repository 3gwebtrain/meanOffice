var

	express		= require('express'),
	app			= express(),
	path		= require('path'),
	bodyParser	= require('body-parser'),
	mongoose	= require('mongoose'),
	OpenApi 	= require('./app/api/openApi'),
	UserApi 	= require('./app/api/userApi'),
	PORT		= process.env.PORT || 8080;


app.use( express.static( __dirname + '/public'));


//connect to db 

mongoose.connect('mongodb://3gwebtrain:Admin@ds147975.mlab.com:47975/family');

app.use( bodyParser.urlencoded({extended : true }));
app.use( bodyParser.json() );



OpenApi( express, app );
UserApi( express, app );

app.get('/', function( req, res ) {

	res.sendFile( path.join( __dirname + '/public/app/views/index.html') );

});



app.listen( PORT );
console.log( 'app listens at ' + PORT );
