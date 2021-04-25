const models = require('../models/') //On importe notre models user
const jwt = require('jsonwebtoken') //On importe jsonwebtoken

exports.createComment = (req, res, next) => {
     //On récupre notre id
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET)
     const userId = decodedToken.userId

     //Params
     const comment = req.body.comment
     const postId = req.params.postId

     //Condition pour nos champs
     if (comment.length < 2 || comment.length == null) {
          return res.status(400).json({ error: 'Merci de remplir tous les champs.' })
     }

     if (postId == null || undefined) { //On vérifie nos id post
          return res.status(400).json({ error: 'Impossible de commenter.' })
     }

     models.Comment.create({ //On créé notre comment
          UserId: userId,
          PostId: postId,
          comment: comment,
          like: 0,
          reported: 0
     })
          .then(comment => res.status(201).json({ message: 'Post commenté ! ' + comment.id }))
          .catch(error => res.status(500).json({ error })) //Erreur server

}

exports.getAllComment = (req, res, next) => {
     //Params
     const postId = req.params.postId

     models.Comment.findAll({
          attributes: ['id', 'PostId', 'UserId', 'like', 'comment', 'createdAt', 'updatedAt'],
          where: { PostId: postId }, //On récupère notre id comment
          include: [{
               model: models.User,
               attributes: ['name']
          }]
     })
          .then(comment => {
               if (comment.length === 0) {
                    return res.status(200).json({ message: 'Pas de commentaire' })
               }
               res.status(200).json({ comment }) //Renvoi nos commentaires
          })
          .catch(error => res.status(400).json({ error: error })) //Erreur Bad Request
}

exports.getOneComment = (req, res, next) => {
     //Params
     const commentId = req.params.commentId

     models.Comment.findOne({
          attributes: ['id', 'PostId', 'UserId', 'like', 'comment', 'createdAt', 'updatedAt'],
          where: { id: commentId },
          include: [{
               model: models.User,
               attributes: ['name']
          }]
     })
          .then(comment => {
               if (comment == null) { //Si nul
                    return res.status(404).json({ error: 'Ce commentaire n\'existe pas !' })
               }
               res.status(200).json({ comment }) //Renvoi notre commentaire
          })
          .catch(error => res.status(403).json({ error: 'Commentaire non trouvé' }))//Erreur server
}

exports.updateComment = (req, res, next) => {
     //On récupre notre id
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET)
     const userId = decodedToken.userId

     //Params
     const message = req.body.message
     const commentId = req.params.commentId

     models.Comment.findOne({
          attributes: ['id', 'PostId', 'UserId', 'comment'],
          where: { id: commentId } //On récupère notre id
     })
          .then(comment => {
               if (message === comment.comment || message === null || message.length < 2) { //Si pas de mofication
                    return res.status(400).json({ error: 'Pas de mise à jour à faire ou champs vide.' })
               }
               if (comment.UserId === userId) {  //On vérifie notre user
                    return comment.update({ comment: message }) //On modifie
                         .then(comment => res.status(200).json({ message: 'Commentaire modifié !', PostId: comment.PostId }))
                         .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour !' })); //Erreur Bad Request
               }
               models.User.findOne({ //Si id différent
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId }
               })
                    .then(userAdmin => {
                         if (userAdmin.isAdmin != true) { //Si non admin
                              return res.status(406).json({ error: 'Impossible de modifier ce commentaire.' })
                         }
                         comment.update({ comment: message }) //On modifie
                              .then(comment => res.status(200).json({ message: 'Commentaire modifié !' }))
                              .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour !' })); //Erreur Bad Request
                    })
                    .catch(error => res.status(404).json({ error: 'Post non trouvé !' })) //Erreur Not Found

          })
          .catch(error => { res.status(404).json({ error: 'Commentaire non trouvé !' }) }); //Erreur Not Found
}

exports.deleteComment = (req, res, next) => {
     //On récupre notre id
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET)
     const userId = decodedToken.userId

     //Params
     const commentId = req.params.commentId

     models.Comment.findOne({
          where: { id: commentId } //On récupère notre id
     })
          .then(comment => {
               if (comment.UserId === userId) { //On vérifie notre user
                    return comment.destroy() //On supprime le commentaire
                         .then(comment => res.status(200).json({ message: 'Commentaire supprimé !' }))
                         .catch(error => res.status(400).json({ error: 'Impossible de supprimer !' })); //Erreur Bad Request
               }
               models.User.findOne({ //Si id différent
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId } //On récupère son id
               })
                    .then(userAdmin => {
                         if (userAdmin.isAdmin != true) { //Si non admin
                              return res.status(406).json({ error: 'Impossible de supprimer le commentaire.' })
                         }
                         comment.destroy() //On supprime le commentaire
                              .then(comment => res.status(200).json({ message: 'Commentaire supprimé !' }))
                              .catch(error => res.status(400).json({ error: 'Impossible de supprimer !' })); //Erreur Bad Request
                    })
                    .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé !' })) //Erreur Not Found

          })
          .catch(error => res.status(404).json({ error: 'Commentaire non trouvé !' })); //Erreur Not Found
}