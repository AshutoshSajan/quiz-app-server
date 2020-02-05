const express = require('express');
const router = express.Router();

const quizSetController = require('../controllers/quizSetController');
const jwtAuth = require('../utils/jwtAuth');

router.get('/', jwtAuth.verifyToken, quizSetController.getQuizSets);

router.post('/', jwtAuth.verifyToken, jwtAuth.isAdmin, quizSetController.createQuizSet);

router.post('/create-many', jwtAuth.verifyToken, jwtAuth.isAdmin, quizSetController.createQuizSets);

router.get('/:id', jwtAuth.verifyToken, quizSetController.getQuizSet);

router.put('/:id/update', jwtAuth.verifyToken, jwtAuth.isAdmin, quizSetController.updateQuizSet);

router.delete('/:id/delete', jwtAuth.verifyToken, jwtAuth.isAdmin, quizSetController.deleteQuizSet);

module.exports = router;