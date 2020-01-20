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
          req.user = decoded;
          next();
        }
      });
    }
  },

  // check for admin user
  isAdmin: (req, res, next) => {
    console.log(req.user, "inside is admin");
    const id = req.user.userId;
    User.findById(id)
      .select("isAdmin")
      .exec((err, user) => {
        console.log(user, "inside is admin...");
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "server error",
            error: err
          });
        } else if (!user.isAdmin) {
          console.log(user);
          res.status(403).json({
            success: false,
            message: "unauthorized",
            error: err
          });
        } else if (user.isAdmin) {
          console.log(user, "isadmin true...");
          req.user.isAdmin = user.isAdmin;
          next();
        }
      });
  }
};