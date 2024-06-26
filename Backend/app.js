require('dotenv').config();

// Importation des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Importation des routes
const bookRoutes = require('./routes/BookRoutes');
const userRoutes = require('./routes/UserRoutes');

// Création de l'application Express
const app = express();

// Middleware pour gérer les erreurs CORS
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

// Middleware pour analyser les corps de requête JSON
app.use(express.json()); // Remplace bodyParser.json()

// Middleware pour journaliser les requêtes
app.use((req, res, next) => {
  console.log('Requête reçue:', req.body);
  next();
});

// Connexion à la base de données MongoDB
mongoose.connect( process.env.MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour gérer les routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

// Exportation de l'application Express
module.exports = app;
