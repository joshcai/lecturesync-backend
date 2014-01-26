
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Lecture = mongoose.model('Lecture');
var path = require('path');
var fs = require('fs');

exports.upload = function(req, res){
	res.render('upload');
}
exports.doUpload = function(req, res){
	fs.readFile(req.files.slides.path, function (err, data) {

		var slidesName = req.files.slides.name
		console.log(data);

		/// If there's an error
		if(!slidesName){

			console.log("There was an error")
			res.redirect("/upload");
			res.end();

		} else {

		  var newPath = path.join(__dirname, '../', 'public/pdf', slidesName);
		  console.log(newPath);
		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {
		  	if(err) console.log(err);
		  	/// let's see it

		  	res.redirect("/pdf/" + slidesName);

		  });
		}
	});
}

exports.create = function(req, res){
	var query = User.findOne({'_id':req.user._id})
	query.exec(function(err, user){
	  res.render('create', {'user': user});
	})
};

exports.doCreate = function(req, res){

	var lecture = new Lecture(req.body)
	lecture.authorId = req.user.id

	lecture.save(function (err) {
		if (err) {
		  return res.render('create', {
		    // errors: utils.errors(err.errors),
		    lecture: lecture
		  })
		}
		return res.redirect('/lecture/'+lecture._id)
	})

};

exports.display = function(req, res){
	var id = req.params.id;
	var query = Lecture.findOne({'_id': id})
							.populate('authorId', 'username')
							.sort({'created': -1})
	query.exec(function(err, lecture){
		if(err) return res.json(500);
			res.render('lecture', { lecture: lecture})
	})

}
