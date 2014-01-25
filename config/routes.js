var routes = require('../controllers/application');
// var user = require('../controllers/user');
// var question = require('../controllers/question');

module.exports = function(app, passport){


	app.get('/', routes.index);
	// app.get('/signup', user.signup);
	// app.post('/signup', user.doSignup);
	// app.get('/login', user.login);
	// app.get('/logout', user.logout);
	// app.post('/login',
	// 	passport.authenticate('local',{
	// 		failureRedirect: '/login',
	// 		failureFlash: 'Invalid username or password. '
	// 	}), user.doLogin);
	// app.get('/auth/facebook',
	// 	passport.authenticate('facebook', {
	// 	  	scope: [ 'email', 'user_about_me'],
	// 	  failureRedirect: '/login'
	// 	}), user.signin)
	// app.get('/auth/facebook/callback',
	// 	passport.authenticate('facebook', {
	// 	  	failureRedirect: '/login'
	// 	}), user.doLogin)	

	// app.get('/ask', question.ask);
	// app.post('/ask', question.doAsk);

	// app.get('/question/:id', question.display)
	// app.get('/follow/:id', question.follow)
	// app.post('/follow/:id', question.doFollow)

}
