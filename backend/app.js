const express = require('express') //On importe express
// const bodyParser = require('body-parser') //On importe bodyParser
const helmet = require("helmet") //On importe helmet
const apiLimiter = require("./middleware/api-limiter") //On importe notre apiLimiter 
const userRoutes = require('./routes/user') //Nos routes pour nos auth user
const profileRoutes = require('./routes/profile') //Nos routes pour le profile des users
const postRoutes = require('./routes/post') //Nos routes pour les posts
const commentRoutes = require('./routes/comment') //Nos routes pour les commentaires
const likePostRoutes = require('./routes/likePost') //Nos routes pour les posts
const likeCommentRoutes = require('./routes/likeComment') //Nos routes pour les commentaires
const reportRoutes = require('./routes/reported') //Nos routes pour les commentaires


const app = express()



app.use((req, res, next) => { //On ajoute des headers à notre objet response
     res.setHeader('Access-Control-Allow-Origin', '*') //Permet d'accéder à notre API depuis n'importe quelle origine (*)
     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')//Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API 
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')//Permet d'envoyer des requêtes avec les méthodes mentionnées
     next()
})


app.use(express.urlencoded({ extended: true })) //Transforme le corps de la requête en objet JS, encode l'url et limite leurs taille
app.use(express.json({ limit: "1kb" }))
app.use(helmet()) //Sécurise les en-têtes HTTP (package de 11 middlewares)

// app.use(bodyParser.urlencoded({ extended: true })) //Transforme le corps de la requête en objet JS, encode l'url et limite leurs taille
// app.use(bodyParser.json({ limit: "1kb" }))

app.use('/groupomania/user', apiLimiter, userRoutes) //On indique le chemin de nos requêtes
app.use('/groupomania/profile', apiLimiter, profileRoutes) //On enregistre nos routes
app.use('/groupomania/post', apiLimiter, postRoutes)
app.use('/groupomania/comment', apiLimiter, commentRoutes)
app.use('/groupomania/likePost', apiLimiter, likePostRoutes)
app.use('/groupomania/likeComment', apiLimiter, likeCommentRoutes)
app.use('/groupomania/report', apiLimiter, reportRoutes)

module.exports = app //On export notre constante





