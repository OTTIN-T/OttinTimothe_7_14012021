//Imports
const express = require('express') //On importe express
const router = express.Router() //On créé un routeur Express
const auth = require('../middleware/auth') //On importe notre middleware auth

const reportedCtrl = require('../controllers/reported') //On importes nos controllers

router.get('/post/:postId/:userReporterId', auth, reportedCtrl.reportPost) //Pour report un user
router.get('/comment/:commentId/:userReporterId', auth, reportedCtrl.reportComment) //Pour report un user
router.get('/admin/:adminId', auth, reportedCtrl.allReported) //Pour afficher tous les signalment
router.delete('/admin/cancel', auth, reportedCtrl.cancelReported) //Pour annuler un report

module.exports = router //On exporte notre router pour l'importer dans app.js
