const express = require('express');
const auth = require('../middleware/Auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

const bookController = require('../controllers/BookController');

// Route pour récupérer les meilleurs livres
router.get('/bestrating', bookController.getBestRatedBooks);

// Route pour créer un nouveau Book
router.post('/', auth, multer, bookController.createBook);

// Route pour modifier un Book existant
router.put('/:id', multer, bookController.modifyBook);

// Route pour supprimer un Book
router.delete('/:id', bookController.deleteBook);

// Route pour récupérer un Book par son id
router.get('/:id', bookController.getOneBook);

// Route pour récupérer tous les Books
router.get('/', bookController.getAllBooks);


module.exports = router;