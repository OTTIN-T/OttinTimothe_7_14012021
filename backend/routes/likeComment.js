//Imports
const express = require('express') //On importe express
const router = express.Router() //On créé un routeur Express
const auth = require('../middleware/auth') //On importe notre middleware auth

const likeCtrl = require('../controllers/likeComment') //On importes nos controllers like

router.get('/like/:commentId/:userId', auth, likeCtrl.like) //On like un comment
router.get('/dislike/:commentId/:userId', auth, likeCtrl.dislike) //On dislike un comment

module.exports = router //On exporte notre router pour l'importer dans app.js
