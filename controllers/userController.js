const User = require("../models/User");

const bcrypt = require('bcrypt');
const jwtAuth = require('../utils/jwtAuth');

module.exports = {
  // create/register user
  registerUser: (req, res) => {
    User.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
          error: err
        });
      } else if (!user) {
        User.create(req.body, (err, user) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "server error",
              error: err
            });
          } else if (user) {
            user.password = undefined;

            const token = jwtAuth.createToken(user.id, process.env.JWT_SECRET);
            res.status(200).json({
              success: true,
              message: "user created",
              user,
              token
            });
          }
        })
      } else if (user) {
        res.status(400).json({
          success: false,
          message: "user alredy exist",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "page not found...",
        });
      }
    })
  },

  // user login
  loginUser: (req, res) => {
    User.findOne({
        email: req.body.email
      })
      .exec((err, user) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "server error",
            error: err
          });
        } else if (!user) {
          res.status(400).json({
            success: false,
            message: "user does not exist."
          });
        } else if (user) {
          const plainPassword = req.body.password;

          bcrypt.compare(plainPassword, user.password, (err, match) => {
            if (err) {
              res.status(400).json({
                success: false,
                message: "bcrypt password compare error",
                error: err
              });
            } else if (match) {
              const token = jwtAuth.createToken(user._id, process.env.JWT_SECRET);
              user.password = undefined;

              res.status(200).json({
                success: true,
                message: "user login successfull :)",
                user,
                token
              });
            } else if (!match) {
              res.status(400).json({
                success: false,
                message: "invalid password",
              });
            }
          });
        }
      })
  },

  // get single user
  getUser: (req, res) => {
    const id = req.user.userId;

    User.findById(id)
      .select('-password -__v -createdAt -updatedAt')
      .exec((err, user) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "server error",
            error: err
          });
        }
        res.status(200).json({
          success: true,
          message: "user found",
          user
        });
      })
  },

  // get all users
  getAllUsers: (req, res) => {
    if (req.user.isAdmin) {
      User.find({})
        .select('-password -__v -createdAt -updatedAt')
        .exec((err, users) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "server error",
              error: err
            });
          } else {
            res.status(200).json({
              success: true,
              message: "users found",
              users
            });
          }
        })
    } else {
      res.status(404).json({
        success: false,
        message: "not authorized",
      });
    }
  },

  // update user
  updateUser: (req, res) => {
    const id = req.user.userId;

    User.findOneAndUpdate({
      _id: id
    }, req.body, {
      upsert: true,
      new: true
    }, (err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
          error: err
        });
      } else if (user) {
        user.password = undefined;

        res.status(200).json({
          success: true,
          message: "user updated...",
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: "page not found",
        });
      }
    })
  },

  updateUserScore: (req, res) => {
    const id = req.user.userId;
    let scores = req.body;
    console.log(scores, 'update user score....');

    User.findByIdAndUpdate(id, {
      $push: {
        scores
      }
    }, {
      new: true
    }, (err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
          error: err
        });
      } else if (user) {
        user.password = undefined;

        res.status(200).json({
          success: true,
          message: "user updated...",
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: "page not found",
        });
      }
    })
  },

  deleteScore: (req, res) => {
    const userId = req.user.userId;
    const scoreId = req.params.id;

    User.findByIdAndUpdate(userId, {
      $pull: {
        scores: {
          _id: scoreId
        }
      }
    }, {
      new: true
    }, (err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
          error: err
        });
      } else if (user) {
        user.password = undefined;

        res.status(200).json({
          success: true,
          message: "user updated...",
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: "page not found",
        });
      }
    })
  },

  // delete user
  deleteUser: (req, res) => {
    const id = req.user.userId;

    User.findOneAndDelete({
      _id: id
    }).select('userName email').exec((err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
          error: err
        });
      } else if (user) {
        res.status(200).json({
          success: true,
          message: "user deleted",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "page not found",
        });
      }
    })
  }
}