const mongoose = require('mongoose');

// Création du schéma de données pour les livres
const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    imageUrl: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ID de l'utilisateur
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ObjectId pour la référence
            grade: { type: Number } // Note attribuée par l'utilisateur
        }
    ],
    averageRating: { type: Number } // Note moyenne du livre
});

module.exports = mongoose.model('Book', bookSchema);
