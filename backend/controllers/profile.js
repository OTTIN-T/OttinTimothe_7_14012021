//Imports
const models = require('../models/') //On importe nos models 

exports.userProfile = (req, res, next) => { //Pour afficher un profil
     //Params
     const userId = req.params.userId

     models.User.findOne({ //On cherche notre user
          attributes: ['id', 'name', 'firstname', 'poste'], //On récupère les attributs
          where: { id: userId } // On récupère notre id
     })
          .then(user => {
               if (user == null) { //Si null
                    return res.status(404).json({ error: 'Utilisateur non trouvé la!' })
               }
               res.status(200).json({ user }) //On renvoie notre user
          })
          .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé !' })) //Erreur Not found
}

exports.updateProfile = (req, res, next) => {
     //Params
     const userId = req.params.userId
     const name = req.body.name
     const firstname = req.body.firstname
     const poste = req.body.poste

     models.User.findOne({ //On cherche notre user
          attributes: ['id', 'isAdmin', 'name', 'firstname', 'poste'],
          where: { id: userId } //On récupère notre id
     })
          .then(user => {
               if (name === user.name && firstname === user.firstname && poste === user.poste) { //Si champs identiques
                    return res.status(406).json({ error: 'Pas de modification' })
               }
               if (user.id == userId) { //Si id identique
                    return user.update({ name: name, firstname: firstname, poste: poste }) //On modifie
                         .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
                         .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour !' })); //Erreur Bad Request
               }
               models.User.findOne({ //Si id différent
                    attributes: ['id', 'isAdmin', 'name', 'firstname', 'poste'],
                    where: { id: userId }
               })
                    .then(userAdmin => {
                         if (userAdmin.isAdmin != true) { //Si non admin
                              return res.status(406).json({ error: 'Impossible de modifier cet utilisateur.' })
                         }
                         user.update({ name: name, firstname: firstname, poste: poste }) //Si admin on update
                              .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
                              .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour !' })); //Erreur Bad Request
                    })
                    .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé !' })) //Erreur Not Found

          })
          .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé !' })) //Erreur Not Found
}

exports.deleteProfile = (req, res, next) => {
     //Params     
     const userId = req.params.userId
     const firstname = req.body.firstname
     const name = req.body.name

     models.User.findOne({ //On cherche notre user
          attributes: ['id', 'isAdmin', 'firstname', 'name'],
          where: { id: userId } //On récupère notre id
     })
          .then(user => {
               if (name != user.name || firstname != user.firstname) { //Si vérification incorrect
                    return res.status(406).json({ error: 'Saisie incorrect.' })
               }
               if (user.id == userId || user.isAdmin === true) { //Si id identique
                    return user.destroy() //On supprime l'user
                         .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                         .catch(error => res.status(400).json({ error: 'Impossible de supprimer !' })); //Erreur Bad Request
               }
               res.status(400).json({ error: 'Impossible de supprimer !' })
          })
          .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé !' })) //Erreur Not Found
}
