//Imports
const express = require('express') //On importe express
const router = express.Router() //On créé un routeur Express
const auth = require('../middleware/auth') //On importe notre middleware auth

const likeCtrl = require('../controllers/likePost') //On importes nos controllers like

router.get('/like/:postId/:userId', auth, likeCtrl.like) //On like un post
router.get('/dislike/:postId/:userId', auth, likeCtrl.dislike) //On dislike un post

module.exports = router //On exporte notre router pour l'importer dans app.js
