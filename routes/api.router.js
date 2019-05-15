/**
 * Configurer le module de routes
 */
    const express = require('express');
    const router = express.Router();
//

/**
 * Configurer MySQL
 */
    const mysql = require('mysql')
    const connexion = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 8889,
        database: 'node-boilerplate'
    })
    connexion.connect()
//
/**
* Définition des routes
*/
    // Create item : POST
    router.post('/article', (req, res) => {
        /**
         * Pour créer un article il faut une valeur pour : 
         * title Le titre de mon article
         * content Le contenu de cet article
        */
        if(req.body && req.body.title.length > 0 && req.body.content.length > 0) {
            // Nous sommes sûrs que les données existent, nous pouvons donc les enregistrer

            // Définir l'item
            const newItem = {
                title: req.body.title,
                content: req.body.content
            }

            // Enregistrer l'item
            connexion.query(`INSERT INTO post SET ?`, newItem, (error, result, fields) => {
                if(error) res.json({ msg: 'Connection failed', data: error})
                else res.json({ msg: 'Create article', data: req.body})
            })

        } else {
            res.json({ msg: 'No data', data: null})
        }

    })

    // Read all items : GET
    router.get('/article', (req, res) => {
        
        // Récupérer des données SQL
        connexion.query('SELECT * FROM post', (error, results, fields) => {
            if (error) {
                res.json({ msg: 'Error get all', err: error })
            }
            else{
                res.json({ msg: 'Get ALL', data: results })
            }
        });
    })
    
    // Read one item: GET
    router.get('/article/:id', (req, res) => {
        // Récupérer le paramêtre d'une route
        const routeParam = req.params.id;

        // Récupérer des données SQL
        connexion.query(`SELECT * FROM post WHERE _id = ${routeParam}`, (error, results, fields) => {
            if (error) {
                res.json({ msg: 'Error get one', err: error })
            }
            else{
                res.json({ msg: 'Get One', data: results })
            }
        });
    });

    // Update one item: UPDATE
    router.put('/article/:id', (req, res) => {
        /**
         * Pour éditer un article il faut une valeur pour : 
         * @param title Le titre de mon article
         * @param content Le contenu de cet article
        */
       // Récupérer le paramêtre d'une route
       const routeParam = req.params.id;       

       if(req.body && req.body.title.length > 0 && req.body.content.length > 0) {
           connexion.query(`UPDATE post SET title=?, content=? WHERE _id=${routeParam}`,[req.body.title, req.body.content],(error, result, fields) => {
            if (error) {
                res.json({ msg: 'Error get one', err: error })
            }
            else{
                res.json({ msg: 'Update one article', data: result });
            }
           })
       } else {
            res.json({ msg: 'No data', data: null})
       }        
    });

    // Delete one item: DELETE
    router.delete('/article/:id', (req, res) => {
        // Récupérer le paramêtre d'une route
        const routeParam = req.params.id;   
        
        connexion.query(`DELETE FROM post WHERE _id=${routeParam}`,(error, result, fields) => {
            if(error) {
                res.json({ msg: 'Error while deleting', data: error });
            } else res.json({ msg: 'Delete one article', data: result });
        })
    });
//

/**
* Exporter le module de routes
*/
    module.exports = router;
//