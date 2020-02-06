const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const questionRouter = require('./questions');
const quizSetRouter = require('./quizset');

router.use('/users', usersRouter);
router.use('/questions', questionRouter);
router.use('/quizsets', quizSetRouter);


module.exports = router;