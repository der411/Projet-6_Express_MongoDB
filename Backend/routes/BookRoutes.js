const express = require('express');
const router = express.Router();

const bookController = require('../controllers/BookController');

// Route pour créer un nouveau Book
router.post('/', bookController.createBook);

// Route pour modifier un Book existant
router.put('/:id', bookController.modifyBook);

// Route pour supprimer un Book
router.delete('/:id', bookController.deleteBook);

// Route pour récupérer un Book par son id
router.get('/:id', bookController.getOneBook);

// Route pour récupérer tous les Books
router.get('/', bookController.getAllBooks);

module.exports = router;