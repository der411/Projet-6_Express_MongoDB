const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const PasswordValidator = require('password-validator');
const validator = require('validator');

// Création du schéma de validation du mot de passe
const passwordSchema = new PasswordValidator();

passwordSchema
  .is().min(8)                                    // Longueur minimale de 8
  .is().max(100)                                  // Longueur maximale de 100
  .has().uppercase()                              // Doit contenir des lettres majuscules
  .has().lowercase()                              // Doit contenir des lettres minuscules
  .has().digits(1)                                // Doit contenir au moins 1 chiffre
  .has().not().spaces();                          // Ne doit pas contenir d'espaces


// Création du schéma de données pour les utilisateurs
const userSchema = mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: props => `${props.value} n'est pas un email valide !`
    }
  },
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: (password) => passwordSchema.validate(password),
      message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et ne pas contenir d\'espaces.'
    }
  }
});

userSchema.plugin(uniqueValidator); // Plugin pour vérifier l'unicité de l'email

module.exports = {
  User: mongoose.model('User', userSchema),
  passwordSchema 
};
