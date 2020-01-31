const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {

  // create jwt token
  createToken: (id, secret) => {
    return jwt.sign({
        userId: id
      },
      secret, {
        expiresIn: "72h"
      }
    );
  },

  // jwt token verification
  verifyToken: (req, res, next) => {
    var token = req.headers.Authorization || req.headers.authorization || "";

    if (!token) {
      res.status(401).json({
        success: false,
        message: "please authenticate."
      });
    } else if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "server error",
            error: err
          });
        } else if (decoded) {
          req.user = decoded;
          next();
        }
      });
    }
  },

  // check for admin user
  isAdmin: (req, res, next) => {
    const id = req.user.userId;

    User.findOne({
      _id: id
    }, (err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
          error: err
        });
      } else if (!user) {
        res.status(400).json({
          success: false,
          message: "user not found",
          error: err
        });
      } else if (!user.isAdmin) {
        res.status(403).json({
          success: false,
          message: "unauthorized",
          error: err
        });
      } else if (user && user.isAdmin) {
        req.user.isAdmin = user.isAdmin;
        next();
      }
    });
  }
};