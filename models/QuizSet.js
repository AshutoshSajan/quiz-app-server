const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSetSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  questions: [{
    type: Schema.Types.ObjectId,
    default: ""
  }]
}, {
  timestamps: true
});


const QuizSet = mongoose.model('QuizSet', quizSetSchema);
module.exports = QuizSet;