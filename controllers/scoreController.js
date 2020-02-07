const Score = require('../models/Score');
const User = require('../models/User');

module.exports = {
  createScore: (req, res) => {
    const userId = req.user.userId;
    let newScore = req.body;

    Score.create(newScore, (err, score) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (score) {
        User.findByIdAndUpdate(userId, {
          $push: {
            scores: score._id
          }
        }, {
          new: true
        }, (err, user) => {
          if (err) {
            res.status(500).json({
              success: false,
              error: err,
              message: "server error"
            });
          } else if (user) {
            score.__v = undefined;
            score.createdAt = undefined;
            score.updatedAt = undefined;

            res.status(200).json({
              success: true,
              score,
              message: "score created and user score updated",
            });
          }
        })
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
        scores: scoreId
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
        Score.findByIdAndDelete(scoreId, (err, score) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "server error",
              error: err
            });
          } else if (score) {
            res.status(200).json({
              success: true,
              message: "score deleted and user updated...",
            });
          }
        })
      } else {
        res.status(404).json({
          success: false,
          message: "page not found",
        });
      }
    })
  },
}