const express = require('express');
const router = express.Router();

const quizsetController = require('../controllers/quizsetController');
const jwtAuth = require('../utils/jwtAuth');

router.get('/', jwtAuth.verifyToken, quizsetController.getQuizsets);

router.post('/', jwtAuth.verifyToken, jwtAuth.isAdmin, quizsetController.createQuizset);

router.post('/create-many', jwtAuth.verifyToken, jwtAuth.isAdmin, quizsetController.createQuizsets);

router.get('/:id', jwtAuth.verifyToken, quizsetController.getQuizset);

router.put('/:id/update', jwtAuth.verifyToken, jwtAuth.isAdmin, quizsetController.updateQuizset);

router.delete('/:id/delete', jwtAuth.verifyToken, jwtAuth.isAdmin, quizsetController.deleteQuizset);

module.exports = router;