const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  score: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: new Date()
  }
}, {
  timestamps: true
});


const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;