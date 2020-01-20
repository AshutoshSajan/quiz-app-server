const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const questionSchema = new Schema({
  question: {
    type: String,
    default: ''
  },
  options: {
    type: Object,
    required: [true, 'Email address should be unique'],
    unique: [true, 'Email address should be unique']
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});


const Question = mongoose.model('Question', questionSchema);
module.exports = Question;