const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController');
const jwtAuth = require('../utils/jwtAuth');

router.get('/', jwtAuth.verifyToken, jwtAuth.isAdmin, questionController.getAllQuestions);

router.post('/', jwtAuth.verifyToken, jwtAuth.isAdmin, questionController.createQuestion);

router.post('/create-many', jwtAuth.verifyToken, jwtAuth.isAdmin, questionController.createQusetions);

router.get('/:id', jwtAuth.verifyToken, questionController.getQuestion);

router.put('/:id/update', jwtAuth.verifyToken, jwtAuth.isAdmin, questionController.updateQuestion);

router.delete('/:id/delete', jwtAuth.verifyToken, questionController.deleteQuestion);

module.exports = router;