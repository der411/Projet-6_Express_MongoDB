const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma de données pour les utilisateurs
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // Plugin pour vérifier l'unicité de l'email

module.exports = mongoose.model('User', userSchema);