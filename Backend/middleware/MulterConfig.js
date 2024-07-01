const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const { rimraf } = require('rimraf');

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
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Middleware de multer pour gérer le téléchargement d'un seul fichier image
const upload = multer({ storage }).single('image');

// Fonction pour tenter de supprimer un fichier avec des réessais
const tryToDeleteFile = async (filePath, attempts = 3, delay = 1000) => {
    for (let i = 0; i < attempts; i++) {
        try {
            await rimraf.moveRemove(filePath);
            return;
        } catch (err) {
            console.error(`Erreur lors de la suppression de l'image originale (tentative ${i + 1}):`, err);
            if (i < attempts - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw new Error(`Impossible de supprimer l'image originale après ${attempts} tentatives: ${filePath}`);
};

// Middleware pour optimiser l'image téléchargée avec sharp
const optimizeImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const { filename } = req.file;
    const filePath = path.join('images', filename);
    const extension = path.extname(filename).toLowerCase();
    const filenameWithoutExtension = path.basename(filename, extension);
    const webpFilePath = path.join('images', `${filenameWithoutExtension}-${Date.now()}${extension === '.webp' ? '.webp' : '.webp'}`);

    try {
        await sharp(filePath)
            .resize(200, 300, { fit: 'fill' })
            .webp()
            .toFile(webpFilePath);
        
        if (extension !== '.webp') {
            await tryToDeleteFile(filePath);
        }

        req.file.filename = path.basename(webpFilePath);

        next();
    } catch (error) {
        console.error('Erreur lors de l\'optimisation de l\'image:', error);
        res.status(500).json({ error: 'Erreur lors du traitement de l\'image' });
    }
};

module.exports = { upload, optimizeImage };
