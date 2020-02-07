const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    default: ''
  },
  quizsetId: {
    type: Schema.Types.ObjectId,
    ref: 'Quizset'
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});


const Question = mongoose.model('Question', questionSchema);
module.exports = Question;