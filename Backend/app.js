// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Importation des routes
const bookRoutes = require('./routes/BookRoutes');
const userRoutes = require('./routes/UserRoutes');

// Création de l'application Express
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://der411:MjuDNzlo9AURYIp0@der411.inimlm0.mongodb.net/?retryWrites=true&w=majority&appName=der411',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour analyser les corps de requête JSON
app.use(express.json());

// Middleware pour gérer les erreurs CORS
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

// Middleware pour analyser les corps de requête JSON
 app.use(bodyParser.json());

// Middleware pour gérer les routes
 app.use('/api/books', bookRoutes);
 app.use('/api/auth', userRoutes);

// Exportation de l'application Express
module.exports = app;