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
    console.log(token, "inside verify token...");

    if (!token) {
      res.status(401).json({
        success: false,
        message: "please authenticate."
      });
    } else if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err, "invalid jwt token verification error....");
          res.status(500).json({
            success: false,
            message: "server error",
            error: err
          });
        } else if (decoded) {
          console.log(decoded, 'decoded jwt data...');

          req.user = decoded;
          next();
        }
      });
    }
  },

  // check for admin user
  isAdmin: (req, res, next) => {
    console.log(req.user, "inside is admin 1...");
    const id = req.user.userId;

    User.findOne({
      _id: id
    }, (err, user) => {
      console.log(user, "inside is admin...2");
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "server error",
          error: err
        });
      } else if (!user) {
        console.log(user);
        res.status(400).json({
          success: false,
          message: "user not found",
          error: err
        });
      } else if (!user.isAdmin) {
        console.log(user);
        res.status(403).json({
          success: false,
          message: "unauthorized",
          error: err
        });
      } else if (user && user.isAdmin) {
        console.log(user, "isadmin true...");
        req.user.isAdmin = user.isAdmin;
        next();
      }
    });
  }
};