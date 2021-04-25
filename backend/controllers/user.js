//Imports
const bcrypt = require('bcrypt')//On importe bcrypt
const jwt = require('jsonwebtoken') //On importe jsonwebtoken
const models = require('../models') //On importe nos models

exports.signup = (req, res, next) => { //Middleware signup     
     //Params
     const email = req.body.email
     const name = req.body.name
     const firstname = req.body.firstname
     const password = req.body.password
     const poste = req.body.poste

     //Regex
     const regexEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/ //Regex pour l'email
     const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$/gm //Regex pour le password

     //Conditions pour nos champs
     if (email == null || name == null || firstname == null || password == null) { //On évite les champs vide
          return res.status(400).json({ error: 'Merci de remplir tous les champs !' }) //Error bad request
     }
     if (!regexEmail.test(email)) {
          return res.status(406).json({ error: 'Email incorrect !' }) //Erreur Not Acceptable 
     }
     if (!regexPassword.test(password)) {
          return res.status(406).json({ error: 'Mot de passe fort requis, minimum: une majuscule, une minuscule, un chiffre.' }) //Erreur Not Acceptable 
     }

     bcrypt.hash(password, 10) //On appel la fonction de hash de bcrypt qui va "saler" le mot de passe 10 fois
          .then(hash => {
               const user = models.User.create({ //On créé notre User
                    email: email,
                    name: name,
                    firstname: firstname,
                    password: hash,
                    poste: poste,
                    reported: false,
                    isAdmin: 0
               })
                    .then(user => {
                         res.status(201).json({
                              userId: user.id,
                              isAdmin: user.isAdmin,
                              token: jwt.sign( //On renvoi un token
                                   { userId: user.id },
                                   process.env.JWT_RAND_SECRET,
                                   { expiresIn: '12h' }
                              )
                         })
                    })
                    .catch(error => res.status(500).json({ error })) //Erreur server
          })
          .catch(error => {
          console.log("error", error)
               res.status(500).json({ error })}) //Erreur server
}


exports.login = (req, res, next) => { //Middleware login
     //Params
     const email = req.body.email
     const password = req.body.password

     if (email == null || password == null) { //On évite les champs vide
          return res.status(400).json({ error: 'Merci de remplir tous les champs !' }) //Erreur bad request
     }

     models.User.findOne({ //On cherche dans notre table User
          where: { email: email } //Si correspondance il y a
     })
          .then(user => {
               if (user) { //Si oui
                    bcrypt.compare(password, user.password)
                         .then(valid => {
                              if (!valid) { //Si mdp invalid
                                   return res.status(406).json({ error: 'Mot de passe incorrect !' }) //Erreur Not Acceptable 
                              }
                              res.status(200).json({
                                   userId: user.id,
                                   isAdmin: user.isAdmin,
                                   token: jwt.sign( //On renvoi un token
                                        { userId: user.id },
                                        process.env.JWT_RAND_SECRET,
                                        { expiresIn: '12h' }
                                   )
                              })
                         })
                         .catch(error => res.status(403).json({ error: 'Mot de passe incorrect !' })) //Erreur forbidden
               } else {
                    return res.status(400).json({ error: 'Utilisateur inexistant !' }) //Erreur bad request
               }
          })
          .catch(error => res.status(403).json({ error: 'Email incorrect !' }))//Erreur server
}