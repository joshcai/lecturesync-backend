
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.signin = function (req, res) {}

exports.signup = function(req, res){
  res.render('signup');
};

exports.logout = function(req, res){
	req.logout()
	res.redirect('/')
}

exports.doSignup = function(req, res){
	var error = ''
	if(req.param('username')===''||req.param('password')==='')
	{
		error='Please fill in all fields';
	}
	// todo: check if user / email already exists


	var user = new User(req.body)
	user.save(function (err) {
	if (err) {
	  return res.render('signup', {
	    // errors: utils.errors(err.errors),
	    user: user
	  })
	}
	req.login(user, function(err){
			if(err) return next(err)
			return res.redirect('/')
		})
	})

};

exports.login = function(req, res){
  res.render('login');
};

exports.doLogin = function(req, res){
	res.redirect('/')

};


exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}

// exports.followAll = function(req, res){

// 	User.find({}, function(err, users){
// 		for(var i=0; i < users.length; i++)
// 		{
// 			User.findOne({'_id': users[i]._id}, function(err, user){
// 				User.find({'_id': {'$ne': user._id}}, function(err, users2){
// 					user.following = new Array()
// 					for(var j=0; j < users2.length; j++)
// 					{
// 						user.following.push(users2[j]._id)
// 					}
// 					user.save(function(err){
// 						console.log(user)
// 					});
// 				})
// 			})

// 		}
// 		// User.find({})
// 	})
// 	res.redirect('/')
// }