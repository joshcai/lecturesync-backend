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
  times: [{ type: Number}]
})

mongoose.model('Lecture', LectureSchema)
