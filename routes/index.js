const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const questionRouter = require('./questions');
const quizsetRouter = require('./quizset');
const scoreRouter = require('./score');

router.use('/users', usersRouter);
router.use('/questions', questionRouter);
router.use('/quizsets', quizsetRouter);
router.use('/scores', scoreRouter);

module.exports = router;