const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const jwtAuth = require('../utils/jwtAuth');

router.get('/me', jwtAuth.verifyToken, userController.getUser);

router.post('/login', userController.loginUser);

router.post('/register', userController.registerUser);


module.exports = router;