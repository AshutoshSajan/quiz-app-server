const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizsetSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
  }]
}, {
  timestamps: true
});


const Quizset = mongoose.model('Quizset', quizsetSchema);
module.exports = Quizset;