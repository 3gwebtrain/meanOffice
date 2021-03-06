var
	mongoose	= require('mongoose'),
	bcrypt		= require('bcrypt-nodejs'),
	Schema		= mongoose.Schema;


var User = new Schema({

	name:String,
	username:{type:String, required:true, index:{unique:true}},
	password:{type:String, required:true, select:false}

})


User.pre('save', function( next ) {

	var user = this;

	if( !user.isModified('password')) return next();

	bcrypt.hash( user.password, null, null, function( err, hash ) {

		if( err ) return next( err );

		user.password = hash;
		next();

	})

});


User.methods.comparePassword = function(password) {

	var user = this;

	return bcrypt.compareSync(password, user.password);

}

module.exports = mongoose.model('User', User);