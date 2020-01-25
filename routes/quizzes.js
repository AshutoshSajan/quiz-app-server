const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quizController');
const jwtAuth = require('../utils/jwtAuth');

router.get('/', jwtAuth.verifyToken, quizController.getAllQuizzes);

router.post('/', jwtAuth.verifyToken, jwtAuth.isAdmin, quizController.createQuiz);

router.post('/create-many', jwtAuth.verifyToken, jwtAuth.isAdmin, quizController.createQuizzes);

router.get('/:id', jwtAuth.verifyToken, quizController.getQuiz);

router.put('/:id/update', jwtAuth.verifyToken, jwtAuth.isAdmin, quizController.updateQuiz);

router.delete('/:id/delete', jwtAuth.verifyToken, jwtAuth.isAdmin, quizController.deleteQuiz);

module.exports = router;