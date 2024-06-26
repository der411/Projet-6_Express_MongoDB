require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, passwordSchema } = require('../models/User');
const validator = require('validator');


// Fonction pour l'inscription d'un utilisateur
exports.signup = (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "L'adresse email n'est pas valide." });
  }

  if (!passwordSchema.validate(password)) {
    return res.status(400).json({ message: "Le format du mot de passe n'est pas valide." });
  }

  bcrypt.hash(password, 10)
    .then(hash => {
      const user = new User({ email, password: hash });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur enregistré !' }))
        .catch(error => res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur.", error }));
    })
    .catch(error => res.status(500).json({ message: "Erreur lors du hachage du mot de passe.", error }));
};


// Fonction pour la connexion d'un utilisateur
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
          } else {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
              )
            });
          }
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
