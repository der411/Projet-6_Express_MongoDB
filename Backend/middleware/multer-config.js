// Importation des modules nécessaires pour le traitement des fichiers et des images
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Définition des types MIME pour correspondre les types de fichiers entrants avec leurs extensions
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

// Configuration de stockage pour multer qui gère le stockage des fichiers images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Dossier de destination des fichiers téléchargés
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        // Génération d'un nom de fichier unique : remplace les espaces par des underscores et ajoute le timestamp
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Middleware de multer pour gérer le téléchargement d'un seul fichier image
const upload = multer({ storage }).single('image');

// Middleware pour optimiser l'image téléchargée en utilisant sharp
const optimizeImage = async (req, res, next) => {
    if (!req.file) {
        // Si aucun fichier n'est téléchargé, passe au middleware suivant
        return next();
    }

    // Chemin complet du fichier image original
    const { filename } = req.file;
    const filePath = path.join('images', filename);

    // Préparation du chemin du fichier WebP optimisé
    const filenameWithoutExtension = path.basename(filename, path.extname(filename));
    const webpFilePath = path.join('images', `${filenameWithoutExtension}-${Date.now()}.webp`);

    console.log(`Optimizing image: ${filePath}`);
    console.log(`Saving optimized image to: ${webpFilePath}`);

    try {
        // Assurer que le fichier original est accessible
        await fs.access(filePath);

        // Redimensionner l'image et la convertir en format WebP avec sharp
        const data = await sharp(filePath)
            .resize(300, 300, { fit: 'inside' })  // Redimensionne avec une contrainte de taille
            .webp()  // Convertit en WebP
            .toBuffer();
        
        // Écrire le nouveau fichier WebP sur le disque
        await fs.writeFile(webpFilePath, data);

        console.log(`Image optimized: ${webpFilePath}`);

        // Mettre à jour le chemin du fichier dans l'objet req.file pour refléter le nouveau fichier WebP
        req.file.filename = path.basename(webpFilePath);

        // Passer au middleware suivant
        next();
    } catch (error) {
        // En cas d'erreur, loguer l'erreur et envoyer une réponse avec erreur
        console.error('Error optimizing image:', error);
        res.status(500).json({ error: 'Error processing image' });
    }
};

// Exportation des middlewares pour utilisation dans d'autres fichiers
module.exports = { upload, optimizeImage };
