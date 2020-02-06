const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const questionRouter = require('./questions');
const quizsetRouter = require('./quizset');

router.use('/users', usersRouter);
router.use('/questions', questionRouter);
router.use('/quizsets', quizsetRouter);


module.exports = router;