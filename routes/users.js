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
router.put('/score/update', jwtAuth.verifyToken, userController.updateUserScore);

// delete score
router.delete('/score/:id/delete', jwtAuth.verifyToken, userController.deleteScore);

// delete user
router.delete('/delete', jwtAuth.verifyToken, userController.deleteUser);

module.exports = router;