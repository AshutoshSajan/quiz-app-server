const Quiz = require('../models/Quiz');

module.exports = {
  createQuiz: (req, res) => {
    Quiz.create(req.body, (err, quiz) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quiz) {
        res.status(200).json({
          success: true,
          quiz
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  getQuiz: (req, res) => {
    const id = req.params.id;

    Quiz.findOne({
      _id: id
    }, (err, quiz) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quiz) {
        res.status(200).json({
          success: true,
          quiz
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  getAllQuizzes: (req, res) => {
    Quiz.find({}, (err, quizzes) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizzes) {
        res.status(200).json({
          success: true,
          quizzes
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  updateQuiz: (req, res) => {
    const id = req.params.id;

    Quiz.findOneAndUpdate({
      _id: id
    }, req.body, {
      upsert: true,
      new: true
    }, (err, quiz) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quiz) {
        res.status(200).json({
          success: true,
          quiz,
          message: 'update successful'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  createQuizzes: (req, res) => {
    Quiz.insertMany(req.body, (err, quizzes) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizzes) {
        res.status(200).json({
          success: true,
          quizzes,
          message: 'multiple quiz created...'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  deleteQuiz: (req, res) => {
    const id = req.params.id;

    Quiz.findOneAndDelete({
      _id: id
    }, (err, quiz) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quiz) {
        res.status(200).json({
          success: true,
          message: 'quiz deleted'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  }
}