// Importation des modules nécessaires
const http = require('http');
const app = require('./app');

// Fonction pour normaliser le port sur lequel le serveur va écouter. Cela assure que le numéro de port est valide.
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // Si le port n'est pas un nombre, retourner la valeur originale (peut être un nom de pipe ou un chemin)
    return val;
  }
  if (port >= 0) {
    // Si le port est un nombre positif, utiliser ce port
    return port;
  }
  return false; // Si le port n'est pas valide, retourner false
};

// Définit le port par défaut ou utilise une variable d'environnement PORT si elle est définie
const port = normalizePort(process.env.PORT || '4200');
app.set('port', port);

// Gestionnaire d'erreurs pour le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error; // Si l'erreur n'est pas liée à l'écoute, la relancer
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port; // Détermine la chaîne de connexion

  switch (error.code) {
    case 'EACCES': // Erreur de permissions
      console.error(bind + ' requires elevated privileges.'); // Le port nécessite des privilèges élevés
      process.exit(1);
      break;
    case 'EADDRINUSE': // Erreur si le port est déjà utilisé
      console.error(bind + ' is already in use.'); // Le port est déjà en utilisation
      process.exit(1);
      break;
    default:
      throw error; // Relancer les autres types d'erreurs
  }
};

// Création du serveur HTTP en utilisant l'application express `app`
const server = http.createServer(app);

// Écouteurs d'événements pour le serveur
server.on('error', errorHandler); // Gestion des erreurs
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port; // Détermine la chaîne de connexion
  console.log('Listening on ' + bind); // Log l'adresse ou le port d'écoute
});

// Le serveur commence à écouter sur le port configuré
server.listen(port);
