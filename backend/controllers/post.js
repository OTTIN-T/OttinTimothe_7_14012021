const models = require('../models/') //On importe notre models user
const jwt = require('jsonwebtoken') //On importe jsonwebtoken

exports.createPost = (req, res, next) => {
     //On récupre notre id
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET)
     const userId = decodedToken.userId

     //Params
     const title = req.body.title
     const message = req.body.message
     const link = req.body.link

     //Condition pour nos champs
     if (title.length <= 2 || message <= 2) {
          return res.status(400).json({ error: 'Merci de remplir tous les champs.' })
     }

     models.Post.create({ //On créé le post
          UserId: userId,
          title: title,
          message: message,
          like: 0,
          link: link,
          reported: 0
     })
          .then(post => res.status(201).json({ message: 'Post créé ! ', post }))
          .catch(error => res.status(500).json({ error })) //Erreur server
}

exports.getAllPost = (req, res, next) => {
     // const offset = parseInt(req.query.offset) //On récupère notre offset
     models.Post.findAll({ //On récupères tous les posts
          attributes: ['id', 'UserId', 'title', 'link', 'message', 'like', 'createdAt', 'updatedAt'],
          order: [['updatedAt', 'DESC']], //On affiche les posts les plus récents
          include: [{
               model: models.User,
               attributes: ['name']
          },
          {
               model: models.Comment,
               attributes: ['comment']
          }]
          // limit: 10 //On limite le nombre de post par page
          // offset: offset //offset pour afficher posts sur les pages suivantes
     })
          .then(post => {
               if (post === null) { //Si null
                    return res.status(404).json({ error: 'Ce post n\'existe pas !' })
               }
               res.status(200).json({ post }) //Renvoi tous nos post
          })
          .catch(error => res.status(400).json({ error: error })) //Erreur Bad Request

}

exports.getOnePost = (req, res, next) => {
     models.Post.findOne({ //On récupère un post
          attributes: ['id', 'UserId', 'title', 'link', 'message', 'like', 'createdAt', 'updatedAt'],
          where: { id: req.params.id }, //On récupère notre id post
          include: [{
               model: models.User,
               attributes: ['name']
          },
          {
               model: models.Comment,
               include: [{
                    model: models.User,
                    attributes: ['name']
               }]
          }],
     })
          .then(post => {
               if (post == null) { //Si null
                    return res.status(404).json({ error: 'Ce post n\'existe pas !' })
               }
               if (post.Comments.length === 0) { //Si pas de commentaire
                    return res.status(200).json({ message: 'Pas de commentaires', post })
               }
               res.status(200).json({ message: 'Commentaire du post', post }) //On affiche le pots et ses commentaires
          })
          .catch(error => res.status(403).json({ error: 'Id incorrect' }))//Erreur server
}

exports.updatePost = (req, res, next) => {
     //On récupre notre id
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET)
     const userId = decodedToken.userId

     //Params
     const title = req.body.title
     const message = req.body.message
     const link = req.body.link

     models.Post.findOne({
          attributes: ['id', 'UserId', 'title', 'message', 'link'],
          where: { id: req.params.id } //On récupère notre id
     })
          .then(post => {
               if (title.length <= 2 || message.length <= 2) { //Si champs trop courts
                    return res.status(400).json({ error: 'Merci de remplir tous les champs.' })
               }
               if (title === post.title && message === post.message && link === post.link) { //Si pas de mofication
                    return res.status(400).json({ error: 'Pas de mise à jour à faire' })
               }
               if (post.UserId === userId) { //On vérifie notre user id
                    return post.update({ title: title, message: message, link: link, }) //On met à jour
                         .then(() => res.status(200).json({ message: 'Post modifié !' }))
                         .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour !' })); //Erreur Bad Request
               }
               models.User.findOne({ //Si id différent
                    attributes: ['id', 'isAdmin', 'name'],
                    where: { id: userId }
               })
                    .then(userAdmin => {
                         if (userAdmin.isAdmin != true) { //Si non admin
                              return res.status(406).json({ error: 'Impossible de modifier ce post.' })
                         }
                         post.update({ title: title, message: message, link: link, }) //On met à jour
                              .then(post => res.status(200).json({ message: 'Post modifié !' }))
                              .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour !' })); //Erreur Bad Request
                    })
                    .catch(error => res.status(404).json({ error: 'Post non trouvé !' })) //Erreur Not Found
          })
          .catch(error => res.status(404).json({ error: 'Post non trouvé !' })); //Erreur Not Found
}

exports.deletePost = (req, res, next) => {
     //On récupre notre id
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET)
     const userId = decodedToken.userId

     models.Post.findOne({
          where: { id: req.params.id }//On récupère notre id post
     })
          .then(post => {
               if (post.UserId === userId) { //Si id identique
                    return post.destroy() //On supprime l'user
                         .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                         .catch(error => res.status(400).json({ error: 'Impossible de supprimer !' })); //Erreur Bad Request
               }
               models.User.findOne({ //Si id différent
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId } //On récupère son id
               })
                    .then(userAdmin => {
                         if (userAdmin.isAdmin != true) { //Si non admin
                              return res.status(406).json({ error: 'Impossible de supprimer le post.' })
                         }
                         post.destroy() //Si admin
                              .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                              .catch(error => res.status(400).json({ error: 'Impossible de supprimer !' })); //Erreur Bad Request
                    })
                    .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé !' })) //Erreur Not Found
          })
          .catch(error => res.status(404).json({ error: 'Post non trouvé !' })); //Erreur Not Found
}

