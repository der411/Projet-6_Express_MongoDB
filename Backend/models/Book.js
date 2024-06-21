// Importation de Mongoose
const mongoose = require('mongoose');   

// Création du schéma de données
const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Date, required: true},
    pageCount: { type: Number },
    genre: { type: String, required: true },
    description: { type: String },
    ISBN: { type: String },
    language: { type: String },
    imageUrl: { type: String },
    ratings: [
        { 
            userId: { type: String }, // Id du User qui a donné la note
            grade: { type: Number } // Note attribuée par le User
        }
    ],
    averageRating: { type: Number }, // Note moyenne du livre
});

// Exportation du modèle de données
module.exports = mongoose.model('Book', bookSchema);