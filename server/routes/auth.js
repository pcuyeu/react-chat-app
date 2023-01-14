const express = require('express');

const { signup, login } = require('../controllers/auth.js');

const router = express.Router();

// Create two different routes

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;