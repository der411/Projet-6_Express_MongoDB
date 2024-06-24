const express = require('express');
const auth = require('../middleware/Auth');
const { upload, optimizeImage } = require('../middleware/multer-config');
const router = express.Router();

const bookController = require('../controllers/BookController');

// Route pour récupérer les meilleurs livres
router.get('/bestrating', bookController.getBestRatedBooks);

// Route pour créer un nouveau Book
router.post('/', auth, upload, optimizeImage, bookController.createBook);

// Route pour modifier un Book existant
router.put('/:id', auth, upload, optimizeImage, bookController.modifyBook);

// Route pour supprimer un Book
router.delete('/:id', auth, bookController.deleteBook);

// Route pour récupérer un Book par son id
router.get('/:id', bookController.getOneBook);

// Route pour récupérer tous les Books
router.get('/', bookController.getAllBooks);

// Route pour noter un Book
router.post('/:id/rating', auth, bookController.rateBook);

module.exports = router;
