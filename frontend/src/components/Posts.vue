<template>
  <section id="posts">
    <h2 class="title-posts">Les derniers messages</h2>
    <!--On récupère nos posts-->
    <Post
      v-for="(post, index) in posts"
      :key="post.id"
      :index="index"
      :title="post.title"
      :id="post.id"
      :userName="post.User.name"
      :message="post.message"
      :link="post.link"
      :like="post.like"
      :comment="post.Comments.length"
      :createdAt="post.createdAt"
      :updatedAt="post.updatedAt"
      :UserId="post.UserId"
    >
      <!-- Boutton report -->
      <ButtonReport
        v-if="userId != post.UserId && isAdmin === false"
        :id="post.id"
        :userId="userId"
        :reportMessage="post.reportMessage"
        @report="reportPost(post.id, userId, index)"
      >
      </ButtonReport>

      <!-- Boutton like -->
      <ButtonLike
        :id="post.id"
        :userId="userId"
        :likeMessage="likeMessage"
        @like="likePost(post.id, userId, index)"
      >
      </ButtonLike>

      <!-- Boutton dislike -->
      <ButtonDislike
        :id="post.id"
        :userId="userId"
        :dislikeMessage="dislikeMessage"
        @dislike="dislikePost(post.id, userId, index)"
      >
      </ButtonDislike>

      <!-- router comment -->
      <RouterComment :id="post.id" />
    </Post>
    <router-view />
  </section>
</template>

<script>
import Post from "@/components/Post.vue";
import RouterComment from "@/components/RouterComment.vue";
import ButtonLike from "@/components/ButtonLike.vue";
import ButtonDislike from "@/components/ButtonDislike.vue";
import ButtonReport from "@/components/ButtonReport.vue";

export default {
  name: "Posts",
  components: {
    Post,
    RouterComment,
    ButtonLike,
    ButtonDislike,
    ButtonReport,
  },
  data() {
    return {
      posts: [],
      index: "",
      like: "",
      token: "",
      userId: "",
      isAdmin: "",
      reportMessage: "",
      likeMessage: "",
      dislikeMessage: "",
      error: "",
      userReported: "",
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
    fetch("https://localhost:3000/groupomania/post/", {
      method: "GET", //Methode d'envoi
      headers: new Headers({
        Authorization: `Bearer ${this.token}`, //On recupèrer notre token
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        //Si erreur d'auth
        if (response.error) {
          return this.$router.push({ path: "/" }); //On redirige vers le login
        }
        this.posts = response.post;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    reportPost(postId, userReporterId, index) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //Appel de notre API
      fetch(
        `https://localhost:3000/groupomania/report/post/${postId}/${userReporterId}/`,
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
            this.posts[index].reportMessage = report.message;
          }
          this.error = report.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
    likePost(postId, userId, index) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //Appel de notre API
      fetch(
        `https://localhost:3000/groupomania/likePost/like/${postId}/${userId}`,
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
            this.posts[index].like = like.count;
          }
          this.error = like.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dislikePost(postId, userId, index) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //Appel de notre API
      fetch(
        `https://localhost:3000/groupomania/likePost/dislike/${postId}/${userId}`,
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
            this.posts[index].like = dislike.count;
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

#posts {
  width: 45rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  #post:hover {
    box-shadow: 0 0 0 0.1rem $third-color;
  }

  //Bouton report
  #report-div {
    width: 44%;
    right: 1rem;
    bottom: -5rem;
    #report-text {
      width: 100%;
      right: 2rem;
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
}

// Media queries
@media screen and (min-width: 2000px) {
  #posts {
    font-size: 1.5rem;
    width: 50rem;
    
    #report-div {
      width: 59%;

      .gg-block {
        left: 8rem;
      }

      #report-btn {
        font-size: 1.5rem;
      }

      #report-text {
        right: 4rem;
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
  }
}

@media screen and (max-width: 1500px) {
  #posts {
    width: 95%;

    #comment-router {
      height: 1rem;
      bottom: 0rem;
    }

    #like-div {
      bottom: 6rem;
    }

    #dislike-div {
      bottom: 8rem;
    }

    #report-div {
      width: 54%;
    }
  }
}

@media screen and (max-width: 1000px) {
  #posts {
    #like-div {
      bottom: 3rem;
    }

    #dislike-div {
      bottom: 5rem;
    }

    #report-div {
      width: 78%;
    }
  }
}

@media screen and (max-width: 500px) {
  #posts {
    #report-div {
      #report-text {
        right: 0rem;
      }
    }
  }
}
</style>
