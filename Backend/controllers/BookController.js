const Book = require('../models/Book');
const fs = require('fs');


// Fonction pour créer un livre
exports.createBook = (req, res, next) => {

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

// Fonction pour modifier un livre
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
            Book.updateOne({ _id: req.params.id }, bookObject)
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {res.status(400).json({ error });
      });
};

// Fonction pour supprimer un livre
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

// Fonction pour récupérer un livre
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => {
        if (!book) {
          return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(book);
      })
      .catch(error => res.status(500).json({ error: error.message }));
};

// Fonction pour récupérer tous les livres
exports.getAllBooks = (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error })
      );
};

// Fonction pour récupérer les meilleurs livres
exports.getBestRatedBooks = (req, res, next) => {
  Book.find().sort({ averageRating: -1 }).limit(5)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

// Fonction pour gérer la notation d'un livre
exports.rateBook = (req, res) => {
  // Récupérer le bookId depuis les paramètres de l'URL
  const bookId = req.params.id;
  
  // Récupérer la note depuis le corps de la requête
  const { rating } = req.body; 

  // Rechercher le livre par son ID dans la base de données
  Book.findById(bookId)
    .then(book => {
      // Si le livre n'est pas trouvé, renvoyer une erreur 404
      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }

      // Vérifier si l'utilisateur a déjà noté ce livre
      const existingRating = book.ratings.find(r => r.userId.equals(req.auth.userId));

      if (existingRating) {
        // Si une note existe déjà, renvoyer une erreur 400
        return res.status(400).json({ message: 'Vous avez déjà noté ce livre' });
      }

      // Ajouter la nouvelle note au tableau des notes du livre
      book.ratings.push({ userId: req.auth.userId, grade: rating });

      // Calculer la nouvelle note moyenne du livre
      let total = book.ratings.reduce((acc, r) => acc + r.grade, 0);
      let averageRating = total / book.ratings.length;

      // Arrondir la moyenne au dixième
      book.averageRating = parseFloat(averageRating.toFixed(1));

      // Sauvegarder les modifications dans la base de données
      book.save()
        .then(updatedBook => {
          res.status(201).json(updatedBook);
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

