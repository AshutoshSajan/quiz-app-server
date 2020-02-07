const express = require('express');
const router = express.Router();

const scoreController = require('../controllers/scoreController');
const jwtAuth = require('../utils/jwtAuth');


router.post('/', jwtAuth.verifyToken, scoreController.createScore);

router.delete('/:id/delete', jwtAuth.verifyToken, jwtAuth.isAdmin, scoreController.deleteScore);

module.exports = router;