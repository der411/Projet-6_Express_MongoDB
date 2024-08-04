# Mon Vieux Grimoire - Site de notation de livres 
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Mongoose](https://img.shields.io/badge/Mongoose-AA2929?logo=mongoose&logoColor=white&style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white&style=for-the-badge)
![Multer](https://img.shields.io/badge/Multer-20232A?logo=multer&logoColor=white&style=for-the-badge)
![Sharp](https://img.shields.io/badge/Sharp-00b300?logo=sharp&logoColor=white&style=for-the-badge)

C'est une application web permettant aux utilisateurs de noter et de consulter des livres. Le projet implique le développement du back-end avec Node.js, Express, et une base de données MongoDB.
# Aperçu 🎨
[![Aperçu](https://live.staticflickr.com/65535/53900562245_abe6368787_n.jpg)](https://flic.kr/p/2q81thH)
[![Aperçu](https://live.staticflickr.com/65535/53900562240_442ca3dfe4_n.jpg)](https://flic.kr/p/2q81thC)

# Installation
1. Clonez le dépôt
``` git clone git@github.com/Projet-6_Express_MongoDB.git```

2. Installez les dépendances
   ```npm install```
   
3. Configurations 📊 Base de données et 🔒 JWT
   Créez un fichier .env à la racine du projet et ajoutez les variables d'environnement nécessaires, y compris la clé secrète JWT pour l'authentification sécurisée.
   Exemple de contenu du fichier .env :
   - ```MONGODB_URI=<votre_url_mongodb>```
   - **Remplacez <votre_url_mongodb> par l'URL de votre base de données MongoDB.**
   - ```JWT_SECRET=<votre_clé_secrète_jwt>``` 
   - **Remplacez <votre_clé_secrète_jwt> par une chaîne de caractères sécurisée utilisée pour signer et vérifier les tokens JWT.**
   
4. Démarrez l'application 🚀
   ```npm start```
   
# Fonctionnalités
 - **CRUD pour les livres et notations :**
   - Créer, Lire, Mettre à jour et Supprimer des livres et leurs notations.
   
 - **Authentification sécurisée :**
   - Système de connexion pour les utilisateurs avec gestion des sessions et sécurité renforcée.
    
- **Gestion des images :**
  - Téléchargement et optimisation des images de couverture des livres.
    
- **Calcul de la note moyenne :**
  - Calcul automatique de la note moyenne pour chaque livre basé sur les notations des utilisateurs.
    
- **Conformité Green Code :**
  - Implémentation des bonnes pratiques pour réduire l'empreinte écologique du site.

   
# Technologies utilisées
- **Node.js :** Pour le développement du serveur back-end.
- **Express :** Pour la gestion des routes et des middlewares.
- **MongoDB :** Pour le stockage des données des utilisateurs et des livres.
- **Mongoose :** Pour la modélisation des données MongoDB.
- **JWT (JSON Web Tokens) :** Pour l'authentification sécurisée des utilisateurs.
- **Multer :** Pour la gestion des fichiers et des images.
- **Sharp :** Pour le traitement et l'optimisation des images.
  
# Contraintes technique et Fonctionnelles

- **Architecture MVC :**
  - Utilisation de l'architecture Modèle-Vue-Contrôleur pour structurer l'application.
- **Sécurité des données :**
  - Chiffrement des mots de passe et protection des données sensibles.
- **API RESTful :**
  - Création d'une API RESTful pour les opérations sur les livres et les utilisateurs.
- **Optimisation des images :**
  - Compression et redimensionnement des images pour une meilleure performance.
