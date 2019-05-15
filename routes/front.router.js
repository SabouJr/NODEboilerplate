    
/**
 * Configurer le module de routes
 */
    const express = require('express');
    const router = express.Router();
//

/**
 * Définition des routes
 */
// Accueil
    router.get('/', (req, res) => {
        res.render('index');
    });
//

/**
 * Exporter le module de routes
 */
    module.exports = router;
//