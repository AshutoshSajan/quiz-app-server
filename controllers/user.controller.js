const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwtAuth = require('../utils/jwtAuth');

module.exports = {
  // create/register user
  registerUser: (req, res) => {
    console.log("inside register user");
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
            console.log(err);
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
          console.log(err);
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
          console.log(user, req.body, plainPassword, "inside login user before password compare...");

          bcrypt.compare(plainPassword, user.password, (err, match) => {
            console.log(match, 'match...');
            if (err) {
              console.log(err, "bcrypt password compare err...");
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
    console.log(req.user.userId, "req.user.userId");
    const id = req.user.userId;

    User.findById(id)
      .select('-password -__v -createdAt -updatedAt')
      .exec((err, user) => {
        if (err) {
          console.log(err);
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
    console.log(req.user, "inside get all users...");
    if (req.user.isAdmin) {
      User.find({})
        .select('-password -__v -createdAt -updatedAt')
        .exec((err, users) => {
          if (err) {
            console.log(err);
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
    console.log(id, "inside update user...");

    User.findOneAndUpdate({
      _id: id
    }, req.body, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "server error",
          error: err
        });
      } else if (user) {
        user.password = undefined;

        console.log(user, "updated user...");
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
    console.log(req.user, "deleteUser");
    const id = req.user.userId;

    User.findOneAndDelete({
      _id: id
    }).select('userName email').exec((err, user) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "server error",
          error: err
        });
      } else if (user) {
        console.log(user, 'deleted user...');
        res.status(200).json({
          success: true,
          message: "user deleted",
        });
      } else {
        console.log(user, 'deleted user...');
        res.status(404).json({
          success: false,
          message: "page not found",
        });
      }
    })
  }
}