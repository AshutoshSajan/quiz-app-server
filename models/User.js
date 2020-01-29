const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
  name: {
    type: String,
    min: [3, "Username can't less than 3 characters"],
    max: [20, "Username can't be more than 20 characters"],
    required: [true, "Username can't be blank"],
  },
  email: {
    type: String,
    required: [true, 'Email address should be unique'],
    unique: [true, 'Email address should be unique']
  },
  password: {
    type: String,
    required: [true, "Password can't be blank"],
    min: [8, "Password can't be less than 8 characters"],
    max: [20, "Password can't be more than 20 characters"]
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  scores: [{
    score: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      default: "all"
    },
    date: {
      type: Date,
      default: new Date()
    }
  }],
  totalScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});


// =======================================================================
// password hashing & creating admin user 
// =======================================================================
userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {

    //generating salt
    bcrypt.genSalt(saltRounds, (err, salt) => {

      // hashing the password 
      bcrypt.hash(this.password, salt, (err, hash) => {

        if (err) {
          throw err;
        }
        if (hash) {
          this.password = hash;

          // creating admin user
          if (this.email === process.env.EMAIL) {
            this.isAdmin = true;
            this.isVerified = true;
            next();
          } else next();
        }
      });
    });
  }
});


const User = mongoose.model('User', userSchema);
module.exports = User;