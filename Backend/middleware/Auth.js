// Importation du module 'jsonwebtoken' qui permet de gérer les tokens JWT
const jwt = require('jsonwebtoken');

// Exportation d'un middleware pour vérifier le token de l'utilisateur
module.exports = (req, res, next) => {
   try {
       // Récupération du token à partir de l'en-tête d'autorisation
       // Le format attendu de l'en-tête est "Authorization: Bearer <token>"
       const token = req.headers.authorization.split(' ')[1];
       
       // Vérification et décodage du token avec une clé secrète 'RANDOM_TOKEN_SECRET'
       // Vérification que le token est toujours valide
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       
       // Récupère l'ID utilisateur à partir du token décodé
       const userId = decodedToken.userId;
       
       // Ajout de l'ID utilisateur à l'objet 'req.auth' pour le rendre accessible dans les prochaines étapes de la requête
       req.auth = {
           userId: userId
       };
       
       // Appel de la fonction 'next()' pour passer au middleware ou à la route suivante
       next();
   } catch(error) {
       // En cas d'erreur (par exemple, si le token est invalide ou manquant), renvoyer une réponse 401 Unauthorized avec un message d'erreur
       res.status(401).json({ error });
   }
};
