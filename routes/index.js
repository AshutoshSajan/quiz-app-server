const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const questionRouter = require('./questions');
const quizSetRouter = require('./quizSet');

router.use('/users', usersRouter);
router.use('/questions', questionRouter);
router.use('/quiz-sets', quizSetRouter);


module.exports = router;