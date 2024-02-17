const router = require('express').Router();
const User = require('../controllers/userController')

// Register
router.post('/register',User.register)

// login
router.post('/login',User.login);

module.exports = router;