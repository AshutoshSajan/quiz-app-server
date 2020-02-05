const QuizSet = require('../models/QuizSet');

module.exports = {
  createQuizSet: (req, res) => {
    QuizSet.create(req.body, (err, quizSet) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizSet) {
        res.status(200).json({
          success: true,
          quizSet
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Not found'
        })
      }
    })
  },

  getQuizSet: (req, res) => {
    const id = req.params.id;

    QuizSet.findOne({
      _id: id
    }, (err, quizSet) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizSet) {
        res.status(200).json({
          success: true,
          quizSet
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  getQuizSets: (req, res) => {
    QuizSet.find({}, (err, quizSets) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizSets) {
        res.status(200).json({
          success: true,
          quizSets
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  updateQuizSet: (req, res) => {
    const id = req.params.id;

    QuizSet.findOneAndUpdate({
      _id: id
    }, req.body, {
      upsert: true,
      new: true
    }, (err, quizSet) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizSet) {
        res.status(200).json({
          success: true,
          quizSet,
          message: 'quizSet update successful'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  createQuizSets: (req, res) => {
    QuizSet.insertMany(req.body, (err, quizSet) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizSet) {
        res.status(200).json({
          success: true,
          quizSet,
          message: 'multiple quizsets created...'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  deleteQuizSet: (req, res) => {
    const id = req.params.id;

    QuizSet.findOneAndDelete({
      _id: id
    }, (err, quizSet) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizSet) {
        res.status(200).json({
          success: true,
          message: 'quizSet deleted'
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