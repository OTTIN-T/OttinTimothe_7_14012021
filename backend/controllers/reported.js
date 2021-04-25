//Imports
const models = require('../models/') //On importe nos models 

exports.reportPost = (req, res, next) => {
     //Params
     const userReporterId = req.params.userReporterId
     const postId = req.params.postId

     models.Post.findOne({ //On recupère notre post
          attributes: ['id', 'message', 'UserId'],
          where: { id: postId }
     })
          .then(post => {
               models.Reported.findOne({ //On regarde si déjà présente dans notre table
                    attributes: ['id', 'postId', 'userReportedId', 'userReporterId'],
                    where: { postId: post.id, userReportedId: post.UserId, userReporterId: userReporterId } //On récupère le report
               })
                    .then(report => {
                         if (report === null) { //Si non
                              return models.Reported.create({ //On créé le report
                                   userReporterId: userReporterId,
                                   userReportedId: post.UserId,
                                   postId: post.id,
                                   commentId: '',
                                   message: post.message,
                                   reported: 1
                              })
                                   .then(report => res.status(201).json({ message: 'Post signalé !', report }))
                                   .catch(error => res.status(500).json({ error: 'Impossible de créer le signalement ici' })) //Erreur server
                         }
                         report.destroy() //Si oui on annule
                              .then(report => res.status(201).json({ message: 'Signalement annulé !', report }))
                              .catch(error => res.status(500).json({ error: 'Impossible de supprimer le signalement' })) //Erreur server
                    })
                    .catch(error => res.status(500).json({ error: 'Impossible de créer le signalement' })) //Erreur server

          })
          .catch(error => res.status(404).json({ error: 'Post non trouvé !' })) //Erreur Not found

}

exports.reportComment = (req, res, next) => {
     //Params
     const userReporterId = req.params.userReporterId
     const commentId = req.params.commentId

     models.Comment.findOne({ //On recupère notre commentaire
          attributes: ['id', 'comment', 'UserId', 'PostId'],
          where: { id: commentId }
     })
          .then(comment => {
               models.Reported.findOne({ //On regarde si déjà présente dans notre table
                    attributes: ['id', 'commentId', 'userReportedId', 'userReporterId'],
                    where: { commentId: comment.id, userReportedId: comment.UserId, userReporterId: userReporterId } //On récupère le report
               })
                    .then(report => {
                         if (report === null) { //Si non
                              return models.Reported.create({ //On créé le report
                                   userReporterId: userReporterId,
                                   userReportedId: comment.UserId,
                                   commentId: comment.id,
                                   postId: comment.PostId,
                                   message: comment.comment,
                                   reported: 1
                              })
                                   .then(report => res.status(201).json({ message: 'Commentaire signalé !', report }))
                                   .catch(error => res.status(500).json({ error: 'Impossible de créer le signalement ici' })) //Erreur server
                         }
                         report.destroy() //Si oui on annule
                              .then(report => res.status(201).json({ message: 'Signalement annulé !', report }))
                              .catch(error => res.status(500).json({ error: 'Impossible de supprimer le signalement' })) //Erreur server
                    })
                    .catch(error => res.status(500).json({ error: 'Impossible de créer le signalement' })) //Erreur server

          })
          .catch(error => res.status(404).json({ error: 'Commentaire non trouvé !' })) //Erreur Not found

}

exports.allReported = (req, res, next) => { //Pour afficher tous nos report
     //Params
     const adminId = req.params.adminId

     models.User.findOne({
          attributes: ['id', 'isAdmin'],
          where: { id: adminId }
     })
          .then(user => {
               if (user.isAdmin != true) { //On vérifie si admin
                    return res.status(404).json({ error: 'Cet user n\'est pas admin !' })
               }
               models.Reported.findAll({ //On cherche tous nos user reports userReporterId
                    attributes: ['id', 'reported', 'message', 'postId', 'commentId', 'userReporterId', 'userReportedId'],
                    where: { reported: true } // On récupère notre id user
               })
                    .then(report => res.status(200).json({ report })) //Renvoi tous nos user report
                    .catch(error => res.status(400).json({ error: error })) //Erreur Bad Request
          })
          .catch(error => res.status(400).json({ error: error })) //Erreur Bad Request
}

exports.cancelReported = (req, res, next) => { //Pour afficher tous nos report
     //Params
     const userReportedId = req.body.userReportedId
     const userReporterId = req.body.userReporterId
     const postId = req.body.postId
     const commentId = req.body.commentId

     models.Reported.findOne({
          where: { userReportedId: userReportedId, userReporterId: userReporterId, postId: postId, commentId: commentId } //On récupère le report
     })
          .then(report => {
               report.destroy() //On supprime
                    .then(report => res.status(201).json({ message: 'Signalement annulé !', report }))
                    .catch(error => res.status(500).json({ error: 'Impossible de supprimer le signalement' })) //Erreur server
          })
          .catch(error => res.status(500).json({ error: 'Signalement non trouvé' })) //Erreur server
}