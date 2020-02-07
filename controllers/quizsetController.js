const Quizset = require('../models/Quizset');

module.exports = {
  createQuizset: (req, res) => {
    Quizset.findOne({
      name: req.body.name
    }, (err, quizset) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizset) {
        res.status(400).json({
          success: false,
          message: 'quizset already exist'
        })
      } else if (!quizset) {


        Quizset.create(req.body, (err, quizset) => {
          if (err) {
            res.status(500).json({
              success: false,
              error: err,
              message: "server error"
            });
          } else if (quizset) {
            res.status(200).json({
              success: true,
              quizset
            });
          } else {
            res.status(404).json({
              success: false,
              message: 'Not found'
            })
          }
        })
      }
    })
  },

  getQuizset: (req, res) => {
    const id = req.params.id;

    Quizset.findOne({
        _id: id
      })
      .populate({
        path: 'questions',
        // for nested population
        populate: {
          path: 'quizsetId',
        }
      })
      .exec((err, quizset) => {
        if (err) {
          res.status(500).json({
            success: false,
            error: err,
            message: "server error"
          });
        } else if (quizset) {
          res.status(200).json({
            success: true,
            quizset
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'page not found'
          })
        }
      })
  },

  getQuizsets: (req, res) => {
    Quizset.find({}, (err, quizsets) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizsets) {
        res.status(200).json({
          success: true,
          quizsets
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  updateQuizset: (req, res) => {
    const id = req.params.id;
    Quizset.findOneAndUpdate({
      _id: id
    }, req.body, {
      upsert: true,
      new: true
    }, (err, quizset) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: err.codeName === 'DuplicateKey' ? 'Quizset Alredy exists' : "server error",

        });
      } else if (quizset) {
        res.status(200).json({
          success: true,
          quizset,
          message: 'quizset update successful'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },

  createQuizsets: (req, res) => {
    Quizset.insertMany(req.body, (err, quizsets) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizsets) {
        res.status(200).json({
          success: true,
          quizsets,
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

  deleteQuizset: (req, res) => {
    const id = req.params.id;

    Quizset.findOneAndDelete({
      _id: id
    }, (err, quizset) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err,
          message: "server error"
        });
      } else if (quizset) {
        deleteQuizsetQuestions(res, quizset._id, quizset.questions)

        res.status(200).json({
          success: true,
          message: 'quizset deleted'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'page not found'
        })
      }
    })
  },
}

// to delete all the quizset questions
function deleteQuizsetQuestions(res, id, questions) {

  Quizset.deleteMany({
    _id: id
  }, {
    questions: {
      $in: questions
    }
  }, (err, questions) => {
    console.log(err, questions, 'deleteQuizsetQuestions2...');
    if (err) {
      console.log(err, 'delete quizset questions err');
      return false
    } else if (questions) {
      console.log(err, 'delete quizset questions success');
      return true;
    } else {
      console.log(err, 'delete quizset questions not found');
      return false;
    }
  })
}