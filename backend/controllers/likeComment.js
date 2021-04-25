const models = require('../models/') //On importe notre models user

exports.like = (req, res, next) => {
     //Params
     const LIKED = 1
     const commentId = req.params.commentId
     const userId = req.params.userId

     models.Comment.findOne({
          attributes: ['id', 'like'],
          where: { id: commentId } //On recupère l'id du comment
     })
          .then(comment => {
               models.LikeComment.findOne({
                    attributes: ['id', 'UserId', 'CommentId', 'isLike'],
                    where: { UserId: userId, CommentId: commentId } //On récupère notre likeComment
               })
                    .then(like => {
                         if (like) { //Si oui
                              if (like.isLike === LIKED) {
                                   return res.status(409).json({ error: 'Déjà liké' }) //Erreur conflit
                              }
                              return like.update({ isLike: LIKED }) //On update le like
                                   .then(like => {
                                        comment.update({ like: comment.like + 1 }) //On update le comment
                                             .then(comment => res.status(201).json({ message: 'Liké !', comment, like }))
                                             .catch(error => res.status(500).json({ error: ' Erreur update comment' })) //Erreur server
                                   })
                                   .catch(error => res.status(500).json({ error: 'Erreur update like' })) //Erreur server 
                         }
                         return models.LikeComment.create({ UserId: userId, CommentId: commentId, isLike: LIKED }) //Si non
                              .then(like => {
                                   comment.update({ like: comment.like + 1 }) //On update le comment
                                        .then(comment => res.status(201).json({ message: 'Liké !', comment, like }))
                                        .catch(error => res.status(500).json({ error: ' Erreur update comment' })) //Erreur server
                              })
                              .catch(error => res.status(500).json({ error: 'Erreur create like' })) //Erreur server 
                    })
                    .catch(error => res.status(406).json({ error: 'Like introuvable' })) //Erreur not accetable
          })
          .catch(error => res.status(406).json({ error: 'comment introuvable' })) //Erreur not accetable
}

exports.dislike = (req, res, next) => {
     //Params
     const DISLIKED = -1
     const commentId = req.params.commentId
     const userId = req.params.userId

     models.Comment.findOne({
          attributes: ['id', 'like'],
          where: { id: commentId } //On recupère l'id du comment
     })
          .then(comment => {
               models.LikeComment.findOne({
                    attributes: ['id', 'UserId', 'CommentId', 'isLike'],
                    where: { UserId: userId, CommentId: commentId }
               })
                    .then(like => {
                         if (like) { //Si oui
                              if (like.isLike === DISLIKED) {
                                   return res.status(409).json({ error: 'Déjà disliké' }) //Erreur conflit
                              }
                              return like.update({ isLike: DISLIKED }) //On update le dislike
                                   .then(like => {
                                        comment.update({ like: comment.like - 1 }) //On update le comment
                                             .then(comment => res.status(201).json({ message: 'Disliké !', comment, like }))
                                             .catch(error => res.status(500).json({ error: ' Erreur update comment' })) //Erreur server
                                   })
                                   .catch(error => res.status(500).json({ error: 'Erreur update like' })) //Erreur server 
                         }
                         return models.LikeComment.create({ UserId: userId, CommentId: commentId, isLike: DISLIKED }) //Si non
                              .then(like => {
                                   comment.update({ like: comment.like - 1 }) //On update le comment
                                        .then(comment => res.status(201).json({ message: 'Disliké !', comment, like }))
                                        .catch(error => res.status(500).json({ error: ' Erreur update comment' })) //Erreur server
                              })
                              .catch(error => res.status(500).json({ error: 'Erreur create like' })) //Erreur server 
                    })
                    .catch(error => res.status(406).json({ error: 'Like introuvable' })) //Erreur not accetable
          })
          .catch(error => res.status(406).json({ error: 'comment introuvable' })) //Erreur not accetable
}