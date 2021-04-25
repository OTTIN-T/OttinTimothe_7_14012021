const express = require('express') //On importe express
const router = express.Router() //nous créons un routeur Express
const auth = require('../middleware/auth') //On importe notre middleware auth

const commentCtrl = require('../controllers/comment') //On importes nos controllers

router.get('/post/:postId', auth, commentCtrl.getAllComment) //On raccourci le chemin de la requête à "/"
router.get('/:commentId', auth, commentCtrl.getOneComment) //On raccourci le chemin de la requête à "/" + le params nécessaire (postId dans notre cas)
router.post('/:postId', auth, commentCtrl.createComment) //On raccourci le chemin de la requête à "/"
router.put('/:commentId', auth, commentCtrl.updateComment)
router.delete('/:commentId', auth, commentCtrl.deleteComment)

module.exports = router //On exporte notre router pour l'importer dans app.js
