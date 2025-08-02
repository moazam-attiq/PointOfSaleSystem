const express = require('express');
const router = express.Router();
const { authUser, loginUser, registerUser, changePassword, resetForgottenPassword } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', authMiddleware, authUser);
router.put('/change-password', changePassword);
router.put('/reset-password', resetForgottenPassword);

module.exports = router;
