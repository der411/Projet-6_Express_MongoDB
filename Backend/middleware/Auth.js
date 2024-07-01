const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
   try {

       // Récupération du token à partir de l'en-tête d'autorisation
       const token = req.headers.authorization.split(' ')[1];
       
       // Vérification et décodage du token
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
       
       const userId = decodedToken.userId;
    
       req.auth = {
           userId: userId
       };
       
       next();

   } catch(error) {

       res.status(401).json({ error });
   }
};
