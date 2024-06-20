const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// Route pour créer un nouvel utilisateur
router.post('/signup', userController.signup);

// Route pour connecter un utilisateur existant
router.post('/login', userController.login);


module.exports = router;