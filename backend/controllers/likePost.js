const models = require('../models') //On importe notre models user

exports.like = (req, res, next) => {
     //Params
     const LIKED = 1
     const postId = req.params.postId
     const userId = req.params.userId

     models.Post.findOne({
          attributes: ['id', 'like'],
          where: { id: postId } //On recupère l'id du post
     })
          .then(post => {
               models.LikePost.findOne({
                    attributes: ['id', 'UserId', 'PostId', 'isLike'],
                    where: { UserId: userId, PostId: postId }
               })
                    .then(like => {
                         if (like) { //Si oui
                              if (like.isLike === LIKED) {
                                   return res.status(409).json({ count: post.like, message: 'Déjà liké' }) //Erreur conflit
                              }
                              return like.update({ isLike: LIKED }) //On update le like
                                   .then(like => {
                                        post.update({ like: post.like + 1 }) //On update le post
                                             .then(post => res.status(201).json({ count: post.like, message: 'Liké !', count: post.like })) //, post, like 
                                             .catch(error => res.status(500).json({ error: ' Erreur update post' })) //Erreur server
                                   })
                                   .catch(error => res.status(500).json({ error: 'Erreur update like' })) //Erreur server 
                         }
                         models.LikePost.create({ UserId: userId, PostId: postId, isLike: LIKED }) //Si non
                              .then(like => {
                                   post.update({ like: post.like + 1 }) //On update le post
                                        .then(post => res.status(201).json({ count: post.like, message: 'Liké !', post, like }))
                                        .catch(error => res.status(500).json({ error: ' Erreur update post' })) //Erreur server
                              })
                              .catch(error => res.status(500).json({ error: 'Erreur create like' })) //Erreur server 
                    })
                    .catch(error => res.status(406).json({ error: 'Like introuvable' })) //Erreur not accetable
          })
          .catch(error => res.status(406).json({ error: 'Post introuvable' })) //Erreur not accetable
}

exports.dislike = (req, res, next) => {
     //Params
     const DISLIKED = -1
     const postId = req.params.postId
     const userId = req.params.userId

     models.Post.findOne({
          attributes: ['id', 'like'],
          where: { id: postId } //On recupère l'id du post
     })
          .then(post => {
               models.LikePost.findOne({
                    attributes: ['id', 'UserId', 'PostId', 'isLike'],
                    where: { UserId: userId, PostId: postId }
               })
                    .then(like => {
                         if (like) { //Si oui
                              if (like.isLike === DISLIKED) {
                                   return res.status(409).json({ count: post.like, message: 'Déjà disliké' }) //Erreur conflit
                              }
                              return like.update({ isLike: DISLIKED }) //On update le dislike
                                   .then(like => {
                                        post.update({ like: post.like - 1 }) //On update le post
                                             .then(post => res.status(201).json({ count: post.like, message: 'Disliké !!', likeId: like.postId, PostId: post.id })) //, post, like
                                             .catch(error => res.status(500).json({ error: ' Erreur update post' })) //Erreur server
                                   })
                                   .catch(error => res.status(500).json({ error: 'Erreur update like' })) //Erreur server 
                         }
                         models.LikePost.create({ UserId: userId, PostId: postId, isLike: DISLIKED }) //Si non
                              .then(like => {
                                   post.update({ like: post.like - 1 }) //On update le post
                                        .then(post => res.status(201).json({ count: post.like, message: 'Disliké !', post, like }))
                                        .catch(error => res.status(500).json({ error: ' Erreur update post' })) //Erreur server
                              })
                              .catch(error => res.status(500).json({ error: 'Erreur create like' })) //Erreur server 
                    })
                    .catch(error => res.status(406).json({ error: 'Like introuvable' })) //Erreur not accetable
          })
          .catch(error => res.status(406).json({ error: 'Post introuvable' })) //Erreur not accetable
}