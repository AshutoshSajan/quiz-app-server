const Question = require('../models/Question');
const QuizSet = require('../models/QuizSet');

module.exports = {
  createQuestion: (req, res) => {
    console.log(req.body, "create quiz request body");

    Question.create(req.body, (err, question) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (question) {
        QuizSet.findByIdAndUpdate(req.body.quizSetId, {
            $push: {
              questions: question._id
            }
          }, {
            new: true,
            upsert: true
          },
          (err, quizSet) => {
            if (err) {
              res.status(500).json({
                success: false,
                error: err,
                message: "server error"
              });
            } else if (quizSet) {
              console.log(quizSet, 'quizset updated and question created...');

              res.status(200).json({
                success: true,
                question,
                message: "question created"
              });
            }
          }
        )
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  getQuestion: (req, res) => {
    const id = req.params.id;

    Question.findOne({
      _id: id
    }, (err, question) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (question) {
        res.status(200).json({
          success: true,
          question
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  getQuestions: (req, res) => {
    Question.find({}, (err, questions) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (questions) {
        res.status(200).json({
          success: true,
          questions
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  updateQuestion: (req, res) => {
    const id = req.params.id;

    Question.findOneAndUpdate({
      _id: id
    }, req.body, {
      upsert: true,
      new: true
    }, (err, question) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (question) {
        res.status(200).json({
          success: true,
          question,
          message: 'question update successful'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  createQuestions: (req, res) => {
    Question.insertMany(req.body, (err, question) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (question) {
        res.status(200).json({
          success: true,
          question,
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

  deleteQuestion: (req, res) => {
    const id = req.params.id;

    Question.findOneAndDelete({
      _id: id
    }, (err, question) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (question) {
        res.status(200).json({
          success: true,
          message: 'question deleted'
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