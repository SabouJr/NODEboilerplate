/**
 ** Importer les composants serveur
 */

    // NodeJS
    require('dotenv').config()          // Import des variables d'environnement
    const express = require('express')
    const path = require('path')
    const bodyParser = require('body-parser')

    // Inner
    const frontRouter = require('./routes/front.router')
    const apiRouter = require('./routes/api.router')

//

/**
 ** Configuration du serveur
 */

    // Définir les variables serveur
    const server = express()
    const port = process.env.PORT       // Utilisation de la variable d'environnement PORT

    // Définition du dossier statique du client (ici /www)
    server.set('views', __dirname + '/www')
    server.use( express.static(path.join(__dirname, 'www') ))

    // Configuration de body parser
    server.use(bodyParser.json({limit: '10mb'}))
    server.use(bodyParser.urlencoded({ extended: true } ))

    // Configuration du moteur de rendu
    server.set('view engine', 'ejs'); 

    // Utilisation des routeurs
    server.use('/api', apiRouter)
    server.use('/', frontRouter)
//

/**
 ** Lancer le serveur
 * 
 */

    server.listen(port, () => {
        console.log(`Server listening on ${port}`)
    })

//
