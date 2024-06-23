const Book = require('../models/Book');
const fs = require('fs');


// Créer un livre
exports.createBook = (req, res, next) => {
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);

  try {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    book.save()
      .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
      .catch(error => 
        res.status(400).json({ error })
      );
      
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Modifier un livre
exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete bookObject._userId;
  Book.findOne({_id: req.params.id})
      .then((book) => {
          if (book.userId != req.auth.userId) {
              res.status(401).json({ message : 'Non-autorisé'});
          } else {
              Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {res.status(400).json({ error });
      });
};

// Supprimer un livre
exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id})
      .then(book => {
          if (book.userId != req.auth.userId) {
              res.status(401).json({message: 'Non-autorisé'});
          } else {
              const filename = book.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Book.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

// Récupérer un livre
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => {
        if (!book) {
          return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(book);
      })
      .catch(error => res.status(500).json({ error: 'Erreur serveur' }));
};

// Récupérer tous les livres
exports.getAllBooks = (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error })
      );
};

// Récupérer les meilleurs livres
exports.getBestRatedBooks = (req, res, next) => {
  Book.find().sort({ averageRating: -1 }).limit(5)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};
