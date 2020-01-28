const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const jwtAuth = require('../utils/jwtAuth');

// get all users
router.get(
  '/',
  jwtAuth.verifyToken,
  jwtAuth.isAdmin,
  userController.getAllUsers
);

// token login
router.get('/me', jwtAuth.verifyToken, userController.getUser);

// get single user
router.get(
  '/:id',
  jwtAuth.verifyToken,
  jwtAuth.isAdmin,
  userController.getUser
);

// login user
router.post('/login', userController.loginUser);

// register user
router.post('/register', userController.registerUser);

// update user
router.put('/update', jwtAuth.verifyToken, userController.updateUser);

// new route
router.put('/update/score', jwtAuth.verifyToken, userController.updateUserScore);

// update total score
router.get('/update/total-score', jwtAuth.verifyToken, userController.incrementTotalScore);

// delete score
router.patch('/update/score/:id/delete', jwtAuth.verifyToken, userController.deleteScore);

// delete user
router.delete('/delete', jwtAuth.verifyToken, userController.deleteUser);

module.exports = router;