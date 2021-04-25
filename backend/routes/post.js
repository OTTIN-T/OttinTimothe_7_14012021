//Imports
const express = require('express') //On importe express
const router = express.Router() //On créé un routeur Express
const auth = require('../middleware/auth') //On importe notre middleware auth

const postCtrl = require('../controllers/post') //On importes nos controllers post


router.get('/', auth, postCtrl.getAllPost) //On recupère tous les posts
router.get('/:id', auth, postCtrl.getOnePost) //On recupère un post
router.post('/', auth, postCtrl.createPost) //On créé un post
router.put('/:id', auth, postCtrl.updatePost) //On modifie un post
router.delete('/:id', auth, postCtrl.deletePost) //On supprime un post

module.exports = router //On exporte notre router pour l'importer dans app.js
