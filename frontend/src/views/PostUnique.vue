<template>
  <NavHome />
  <main>
    <section id="post-unique">
      <h1 id="title-post-unique">
        Posté par:
        <router-link
          id="nav-user"
          :to="{ name: 'ProfilePage', params: { id: post.UserId } }"
          title="Lien vers le profil de l'utilisateur"
        >
          <i class="gg-user"></i>{{ name }}</router-link
        >
      </h1>

      <!-- Post -->
      <Post
        :title="post.title"
        :message="post.message"
        :comment="comments.length"
        :link="post.link"
        :like="post.like"
        :createdAt="formatCreateDate"
        :updatedAt="formatUpdateDate"
        :UserId="post.UserId"
      >
        <!-- Boutton report -->
        <ButtonReport
          v-if="userId != post.UserId && isAdmin === false"
          :id="post.id"
          :userId="userId"
          :reportMessage="post.reportMessage"
          @report="reportPost(post.id, userId)"
        >
        </ButtonReport>

        <!-- Boutton like -->
        <ButtonLike
          :id="post.id"
          :userId="userId"
          :likeMessage="likeMessage"
          @like="likePost(post.id, userId)"
        >
        </ButtonLike>

        <!-- Boutton dislike -->
        <ButtonDislike
          :id="post.id"
          :userId="userId"
          :dislikeMessage="dislikeMessage"
          @dislike="dislikePost(post.id, userId)"
        >
        </ButtonDislike>

        <!-- Router comment -->
        <RouterComment :id="post.id" />

        <!-- Router update post -->
        <RouterUpdate
          v-if="userId === post.UserId || isAdmin === true"
          :id="post.id"
          :commentUserId="null"
        ></RouterUpdate>

        <!-- Boutton delete post -->
        <ButtonDelete
          v-if="userId === post.UserId || isAdmin === true"
          :postId="post.id"
          :UserId="post.UserId"
          :postUserId="post.UserId"
          :action="action"
          @deleteButton="deletePost(post.id, post.UserId)"
        >
        </ButtonDelete>
      </Post>
    </section>
    <!-- Commentaire -->
    <aside class="inactive">
      <Comment
        v-for="(comment, index) in comments"
        :key="comment"
        :UserId="comment.UserId"
        :userName="comment.User.name"
        :comment="comment.comment"
        :like="comment.like"
      >
        <!-- Boutton like -->
        <ButtonLike
          :id="comment.id"
          :userId="userId"
          @like="likeComment(comment.id, userId, index)"
        >
        </ButtonLike>

        <!-- Boutton dislike -->
        <ButtonDislike
          :id="comment.id"
          :userId="userId"
          @dislike="dislikeComment(comment.id, userId, index)"
        >
        </ButtonDislike>

        <!-- Boutton report -->
        <ButtonReport
          v-if="userId != comment.UserId && isAdmin === false"
          :id="comment.id"
          :userId="userId"
          :reportMessage="comment.reportMessage"
          @report="reportComment(comment.id, userId, index)"
        >
        </ButtonReport>

        <!-- Boutton delete comment -->
        <ButtonDelete
          v-if="userId === comment.UserId || isAdmin === true"
          @deleteButton="deleteComment(comment.id, comment.UserId)"
          :action="action"
        >
        </ButtonDelete>

        <!-- Router update comment -->
        <RouterUpdate
          v-if="userId === comment.UserId || isAdmin === true"
          :id="comment.id"
          :postUserId="null"
        ></RouterUpdate>
      </Comment>
    </aside>
  </main>
  <Footer />
</template>

<script>
import Post from "@/components/Post.vue";
import NavHome from "@/components/NavHome.vue";
import Comment from "@/components/Comment.vue";
import RouterComment from "@/components/RouterComment.vue";
import ButtonLike from "@/components/ButtonLike.vue";
import ButtonDislike from "@/components/ButtonDislike.vue";
import ButtonDelete from "@/components/ButtonDelete.vue";
import RouterUpdate from "@/components/RouterUpdate.vue";
import ButtonReport from "@/components/ButtonReport.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "PostUnique",
  components: {
    Post,
    NavHome,
    Comment,
    RouterComment,
    ButtonLike,
    ButtonDislike,
    ButtonDelete,
    RouterUpdate,
    ButtonReport,
    Footer,
  },
  data() {
    return {
      post: [],
      comments: [],
      createdAt: "",
      updatedAt: "",
      name: "",
      token: "",
      userId: "",
      isAdmin: "",
      reportMessage: "",
      likeMessage: "",
      dislikeMessage: "",
      messageComment: "",
      action: "Supprimer",
      error: "",
    };
  },
  created() {
    //On recupère notre token
    const storage = localStorage.getItem("user");
    const auth = JSON.parse(storage);
    if (auth === null) {
      return this.$router.push({ path: "/" }); //On redirige vers le login
    }
    this.token = auth.token;
    this.userId = auth.userId;
    this.isAdmin = auth.isAdmin;

    //Appel de notre API
    fetch("https//localhost:3000/groupomania/post/" + this.$route.params.id, {
      method: "GET", //Methode d'envoi
      headers: new Headers({
        Authorization: `Bearer ${this.token}`, //On authentifie notre requête
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        //Si pas d'erreur
        if (!response.error) {
          this.post = response.post;
          this.name = response.post.User.name;
          this.comments = response.post.Comments;
          this.createdAt = response.post.createdAt;
          this.updatedAt = response.post.updatedAt;
        }
        this.error = response.error;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    formatCreateDate() {
      const dateArray = Array.from(this.createdAt); //Transforme notre string en array
      dateArray.splice(10, 1); //Supprime l'index 10 (le T)
      dateArray.splice(15, 8); //Supprime les secondes

      const date = dateArray.slice(0, 10); //Sépare en 2 notre tableau
      const hour = dateArray.slice(10);

      const dateJoin = date.join(""); //Join notre string
      const dateSplit = dateJoin.split("-", 3); //Sépare "YYYY" "MM" "DD"
      dateSplit.reverse(); //Reverse notre resultat pour obtenir "DD MM YYY"

      return dateSplit.join("/") + " à " + hour.join(""); //On retourne nos tableaux join
    },
    formatUpdateDate() {
      const dateArray = Array.from(this.updatedAt);
      dateArray.splice(10, 1);
      dateArray.splice(15, 8);

      const date = dateArray.slice(0, 10);
      const hour = dateArray.slice(10);

      const dateJoin = date.join("");
      const dateSplit = dateJoin.split("-", 3);
      dateSplit.reverse();

      return dateSplit.join("/") + " à " + hour.join("");
    },
  },
  methods: {
    reportPost(postId, userReporterId) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //Appel de notre API
      fetch(
        `https//localhost:3000/groupomania/report/post/${postId}/${userReporterId}/`,
        {
          //Notre requête GET
          method: "GET", //Methode d'envoi
          headers: new Headers({
            Authorization: `Bearer ${this.token}`, //On authentifie notre requête
          }),
        }
      )
        .then(async (result_) => {
          const report = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (report.message) {
            this.post.reportMessage = report.message;
          }
          this.error = report.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reportComment(commentId, userReporterId, index) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //Appel de notre API
      fetch(
        `https//localhost:3000/groupomania/report/comment/${commentId}/${userReporterId}/`,
        {
          //Notre requête GET
          method: "GET", //Methode d'envoi
          headers: new Headers({
            Authorization: `Bearer ${this.token}`, //On authentifie notre requête
          }),
        }
      )
        .then(async (result_) => {
          const report = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (report.message) {
            this.comments[index].reportMessage = report.message;
          }
          this.error = report.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost(postId, userIdPost) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      if (userIdPost != this.userId && this.isAdmin != true) {
        //On vérifie l'user/admin
        return this.$router.push({ path: "/home" }); //On redirige vers la home
      }

      //Appel de notre API
      fetch("https//localhost:3000/groupomania/post/" + postId, {
        //L'id du post à supprimer
        //Notre requête GET
        method: "DELETE", //Methode d'envoi
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`, //On authentifie notre requête
        }),
      })
        .then(async (result_) => {
          const post = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (!post.error) {
            //Si pas d'erreur
            this.reportMessage = "Post supprimé";
            this.$router.push({ path: "/home" }); //On redirige vers la home
          }
          this.error = post.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteComment(commentId, userIdComment) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      if (userIdComment != this.userId && this.isAdmin != true) {
        // On vérifie l'user/admin
        return this.$router.push({ path: "/home" }); //On redirige vers la home
      }

      //Appel de notre API
      fetch("https//localhost:3000/groupomania/comment/" + commentId, {
        method: "DELETE", //Methode d'envoi
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`, //On authentifie notre requête
        }),
      })
        .then(async (result_) => {
          const comment = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (!comment.error) {
            //Si pas d'erreur
            this.reportMessage = "Commentaire supprimé";

            //On raffraichit notre post
            return fetch(
              "https//localhost:3000/groupomania/post/" + this.$route.params.id,
              {
                method: "GET", //Methode d'envoi
                headers: new Headers({
                  Authorization: `Bearer ${this.token}`, //On authentifie notre requête
                }),
              }
            )
              .then((response) => response.json())
              .then((response) => {
                //Si pas d'erreur
                if (!response.error) {
                  this.post = response.post;
                  this.name = response.post.User.name;
                  this.comments = response.post.Comments;
                  this.createdAt = response.post.createdAt;
                  this.updatedAt = response.post.updatedAt;
                }
                this.error = response.error;
              })
              .catch((error) => {
                console.log(error);
              });
          }
          this.error = comment.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
    likePost(postId, userId) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //Appel de notre API
      fetch(
        `https//localhost:3000/groupomania/likePost/like/${postId}/${userId}`,
        {
          method: "GET", //Methode d'envoi
          headers: new Headers({
            Authorization: `Bearer ${this.token}`, //On authentifie notre requête
          }),
        }
      )
        .then(async (result_) => {
          const like = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (!like.error) {
            if (like.message != "Déjà liké") {
              return (this.post.like += 1); //On incrémente
            }
            this.post.like === this.post.like;
          }
          this.error = like.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dislikePost(postId, userId) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //Appel de notre API
      fetch(
        `https//localhost:3000/groupomania/likePost/dislike/${postId}/${userId}`,
        {
          method: "GET", //Methode d'envoi
          headers: new Headers({
            Authorization: `Bearer ${this.token}`, //On authentifie notre requête
          }),
        }
      )
        .then(async (result_) => {
          const dislike = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (!dislike.error) {
            //Si pas d'erreur
            if (dislike.message != "Déjà disliké") {
              return (this.post.like -= 1); //On décremente
            }
            this.post.like === this.post.like;
          }
          this.error = dislike.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
    likeComment(commentId, userId, index) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //Appel de notre API
      fetch(
        `https//localhost:3000/groupomania/likeComment/like/${commentId}/${userId}`,
        {
          method: "GET", //Methode d'envoi
          headers: new Headers({
            Authorization: `Bearer ${this.token}`, //On authentifie notre requête
          }),
        }
      )
        .then(async (result_) => {
          const like = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (!like.error) {
            this.comments[index].like = like.comment.like;
          }
          this.error = like.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dislikeComment(commentId, userId, index) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //Appel de notre API
      fetch(
        `https//localhost:3000/groupomania/likeComment/dislike/${commentId}/${userId}`,
        {
          method: "GET", //Methode d'envoi
          headers: new Headers({
            Authorization: `Bearer ${this.token}`, //On authentifie notre requête
          }),
        }
      )
        .then(async (result_) => {
          const dislike = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (!dislike.error) {
            //Si pas d'erreur
            this.comments[index].like = dislike.comment.like;
          }
          this.error = dislike.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#post-unique {
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;

  #title-post-unique {
    text-align: left;
    margin: 0 auto;
  }

  #nav-user,
  .gg-user {
    color: $third-color;
    transition: all 0.5s ease-out;
    position: relative;
    z-index: 7;
  }

  #nav-user {
    display: flex;
    justify-content: center;
    margin: 1rem auto 0 auto;
    width: 25rem;
    word-break: break-all;
  }

  .gg-user {
    opacity: 0;
    top: 2rem;
    margin-right: 1rem;
  }

  &:hover {
    #nav-user,
    .gg-user {
      color: $background-color;
    }
    #nav-user {
      text-shadow: 1px 1px 2px $third-color;
    }
    .gg-user {
      color: $secondary-color;
      top: 0.4rem;
      opacity: 1;
    }
  }

  #post {
    position: relative;
    z-index: 6;
    margin: 3rem auto 1rem auto;

    &:hover {
      box-shadow: 0 0 0 100vh $third-color;

      .date-div {
        .updateAt {
          color: $third-color;
        }
      }
    }

    .title {
      height: auto;
    }

    .link-div {
      top: 0rem;

      .link {
        margin: 0.5rem auto;
      }
    }

    .date-div {
      top: 0rem;

      .updateAt {
        color: $primary-color;
      }
    }

    .utils-div {
      margin-top: 3.5rem;

      #comment-post-div {
        top: 4rem;
      }
    }

    //Bouton report
    #report-div {
      width: 44%;
      right: 1rem;
      bottom: -5rem;

      #report-text {
        width: 100%;
        left: -2rem;
      }

      .gg-block {
        left: 6rem;
      }
    }

    //Bouton like
    #like-div {
      bottom: 6rem;
      left: -2rem;
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
      z-index: 6;

      #like-btn {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .gg-smile {
        --ggs: 1.5;
      }
    }

    //Bouton dislike
    #dislike-div {
      bottom: 8rem;
      right: -2rem;
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
      z-index: 6;

      #dislike-btn {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .gg-smile-sad {
        --ggs: 1.5;
      }
    }

    //Bouton commentaire
    #comment-router {
      height: 1rem;
      bottom: 0rem;
    }

    //Bouton update post
    #update-router {
      width: 30%;
      position: relative;
      z-index: 6;
      bottom: 2rem;

      #update-link {
        width: 100%;
        height: 100%;
      }

      .gg-pen {
        left: 3rem;
      }

      &:hover {
        .gg-pen {
          left: 1rem;
        }
      }
    }

    //Bouton delete
    #delete-div {
      bottom: 15rem;
      width: 30%;
      margin: 0 0 0 auto;

      #delete-btn {
        justify-content: flex-end;
      }

      .gg-trash {
        top: 2rem;
        right: -6rem;
      }

      &:hover {
        .gg-trash {
          color: $secondary-color;
          top: 0rem;
        }
      }
    }
  }
}

.active {
  position: relative;
  z-index: 5;
  width: 45rem;
  margin: 1rem auto;
  border-radius: 1.5rem;
  // transition: all 0.5s ease-out;

  &:hover {
    z-index: 1;
    background-color: $third-color;
    box-shadow: 0 0 0 100vh $third-color;
  }
}

.inactive {
  display: none;
}

// Media queries
@media screen and (min-width: 2000px) {
  #post-unique {
    width: 50rem;
    font-size: 1.5rem;

    #nav-user {
      width: 50rem;

      .gg-user {
        --ggs: 1.5;
      }
    }

    #post {
      #report-div {
        width: 59%;

        #report-btn {
          font-size: 1.5rem;
        }

        .gg-block {
          left: 8rem;
        }

        #report-text {
          left: -3rem;
        }
      }

      #comment-router #comment-link {
        font-size: 1.5rem;
      }

      #update-router {
        #update-link {
          font-size: 1.5rem;
        }
      }

      #update-link {
        font-size: 1.5rem;
      }

      #delete-div #delete-btn {
        font-size: 1.5rem;
      }

      #like-div {
        bottom: 7rem;

        .gg-smile {
          --ggs: 2;
        }
      }

      #dislike-div {
        bottom: 8.5rem;

        .gg-smile-sad {
          --ggs: 2;
        }
      }

      &:hover {
        .gg-block {
          transform: scale(var(--ggs, 1.5)) rotate(-180deg);
          top: -0.1rem;
        }
      }
    }
  }

  .active {
    width: 50rem;
    font-size: 1.5rem;
    left: 1rem;

    #report-div {
      top: -7rem;

      #report-btn {
        font-size: 1.5rem;

        .gg-block {
          left: 8rem;
        }
      }
      #report-text {
        width: 100%;
        left: -12rem;
      }

      &:hover {
        .gg-block {
          transform: scale(var(--ggs, 1.5)) rotate(-180deg);
          top: -0.1rem;
        }
      }
    }

    #comment-router #comment-link {
      font-size: 1.5rem;
    }

    #comment-div {
      #delete-div {
        width: 32%;
      }

      #dislike-div {
        left: 7rem;
        bottom: -0.5rem;
      }
    }

    #update-router #update-link {
      font-size: 1.5rem;
    }

    #delete-div #delete-btn {
      font-size: 1.5rem;
    }
  }
}

@media screen and (max-width: 1500px) {
  #post-unique {
    #nav-user {
      width: auto;
    }

    #post {
      .utils-div {
        margin-top: 1.5rem;
      }

      #update-router {
        width: 38%;
        bottom: 12.2rem;
      }

      #report-div {
        width: 50%;

        #report-text {
          bottom: 0rem;
          left: -1.5rem;
        }
      }

      #delete-div {
        bottom: 14rem;
      }
    }
  }

  .active {
    width: 41rem;

    #comment-div {
      .like-comment {
        top: 1rem;
        justify-content: center;
      }

      #like-div {
        top: -0.5rem;
        left: 10rem;
      }

      #dislike-div {
        left: 28rem;
        top: -2.5rem;
      }

      #report-div {
        top: -3rem;
        margin-top: 1.5rem;
        width: 54%;

        #report-text {
          left: -3rem;
          width: 100%;
        }
      }

      #text-comment {
        width: 100%;
        padding-bottom: 2rem;
        bottom: 2rem;
      }

      #delete-div {
        top: -1.5rem;
        width: 16%;

        .gg-trash {
          left: -0.5rem;
        }
      }

      #update-router {
        top: -2.8rem;
        width: 38%;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  #post-unique {
    width: 95%;

    #post {
      #delete-div {
        width: 30%;
        margin: 0 auto 0 0;
        bottom: 2rem;
        left: -0.5rem;

        #delete-btn {
          justify-content: flex-start;
        }

        .gg-trash {
          right: -7rem;
        }
      }

      #like-div {
        bottom: 3rem;
      }

      #dislike-div {
        bottom: 5rem;
      }

      #report-div {
        width: 55%;

        #report-text {
          left: 2.5rem;
        }
      }
    }
  }

  .active {
    width: 25rem;

    #comment-div {
      #name-comment {
        width: 18rem;
      }

      #like-div {
        left: 0.5rem;
      }

      #dislike-div {
        left: 20rem;
      }

      #report-div {
        width: 91%;
      }

      #delete-div {
        width: 26%;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  #post-unique {
    width: 95%;

    #post {
      #update-router {
        width: 50%;
        bottom: 12.2rem;
      }

      #delete-div {
        width: 32%;
        left: -0.5rem;

        .gg-trash {
          right: -7rem;
        }
      }
    }
  }

  .active {
    width: 18rem;

    #comment-div {
      #name-comment {
        width: 14rem;
      }

      #dislike-div {
        left: 14rem;
        top: -2.5rem;
      }

      #report-div {
        width: 50%;

        #report-text {
          left: 2rem;
        }
      }

      #delete-div {
        width: 36%;
      }
    }
  }
}
</style>