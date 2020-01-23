const Question = require('../models/Question');

module.exports = {
  createQuestion: (req, res) => {
    Question.create(req.body, (err, question) => {
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

  getQuestion: (req, res) => {
    const id = req.params.id;
    console.log(id, 'id......');

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

  getAllQuestions: (req, res) => {
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
    console.log(req.body, id, 'id...... inside upadte question');

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

  createQusetions: (req, res) => {
    console.log(req.body, "createQusetions insertMany...");

    Question.insertMany(req.body, (err, questions) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (questions) {
        res.status(200).json({
          success: true,
          questions,
          message: 'multiple questions created...'
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
    console.log(req.params.id, 'deleteQuestion params id....');

    const id = req.params.id;
    console.log(id, 'id......inside deleteQuestion....');

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