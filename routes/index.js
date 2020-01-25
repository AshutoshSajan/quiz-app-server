const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const quizRouter = require('./quizzes');


router.use('/users', usersRouter);
router.use('/quizzes', quizRouter);

module.exports = router;