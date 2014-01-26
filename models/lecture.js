var mongoose = require('mongoose')
  , Schema = mongoose.Schema

/**
 * Question/Answer Schema
 */


var LectureSchema = new Schema({
  // question: { type: Schema.Types.ObjectId, ref: 'Question' },
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, default: '' },
  slides: { type: String, default: '' },
  recording: { type: String, default: '' },
  created: { type: Date, default: Date.now },
  delay: [{ type: Number}],
  note: [{ type: String}]
})

mongoose.model('Lecture', LectureSchema)
