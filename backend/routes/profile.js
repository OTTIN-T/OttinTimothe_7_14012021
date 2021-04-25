//Imports
const express = require('express') //On importe express
const router = express.Router() //On créé un routeur Express
const auth = require('../middleware/auth') //On importe notre middleware auth

const profileCtrl = require('../controllers/profile') //On importes nos controllers
// const multer = require('../middleware/multer-config') //On importe notre middleware multer

router.get('/:userId', auth, profileCtrl.userProfile) //Pour récupérer un profil user
router.put('/:userId', auth, profileCtrl.updateProfile) //Route pour modifier son profile
router.delete('/:userId', auth, profileCtrl.deleteProfile) //Route pour supprimer son profile

module.exports = router //On exporte notre router pour l'importer dans app.js