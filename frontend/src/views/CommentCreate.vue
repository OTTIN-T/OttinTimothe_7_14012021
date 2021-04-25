<template>
  <NavHome />
  <main>
    <section>
      <div id="intro-comment-post">
        <h1 id="title-comment-post">Votre commentaire:</h1>
      </div>
      <form action="" method="post" id="form-post" v-on:submit.prevent>
        <label id="message-label" for="comment"></label>
        <textarea
          rows="10"
          cols="25"
          maxlength="255"
          id="comment-input"
          v-model="comment"
          required
        />
        <p>{{ comment.length }}/255</p>

        <div id="create-comment-div">
          <i class="gg-play-list-add"></i>
          <button
            v-if="
              //Condition pour afficher le bouton
              comment.length >= 2
            "
            id="comment-btn"
            type="submit"
            title="Bouton pour commenter"
            @click="send"
          >
            Commenter
          </button>
          <button id="comment-opacity-btn" v-else>Commenter</button>
        </div>
      </form>
      <p id="succes">{{ commmentSucces }}</p>
      <p id="error">{{ error }}</p>
    </section>
  </main>
  <Footer />
</template>

<script>
import NavHome from "@/components/NavHome.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "CommentCreate",
  components: {
    NavHome,
    Footer,
  },
  data() {
    return {
      comment: "",
      token: "",
      userId: "",
      commmentSucces: "",
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
  },
  methods: {
    send() {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      const comment = {
        comment: this.comment.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
      };

      fetch(
        "https//localhost:3000/groupomania/comment/" + this.$route.params.id,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`, //On recupèrer notre token
          }),
          body: JSON.stringify(comment), //L'objet envoyé
        }
      )
        .then(async (result_) => {
          const comment = await result_.json(); //On attend le résultat de result_.json() pour exécuter le reste
          if (!comment.error) {
            //Si pas d'erreur
            this.commmentSucces = "Commentaire envoyé !";
            return this.$router.push({
              name: "PostUnique",
              params: this.$route.params.id,
            }); //On redirige vers le post
          }
          this.error = comment.error; //Si erreur
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

#intro-comment-post {
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 1rem auto;

  #text-comment-post,
  #title-comment-post {
    display: flex;
    justify-content: flex-start;
    text-align: left;
    padding-bottom: 1rem;
  }
}

#form-post {
  width: 25rem;
  margin: 0 auto;
  padding: 0 0 2rem 0;
  border-radius: 1rem;
  #message-label {
    display: flex;
    justify-content: flex-start;
    margin: 3rem auto -1.5rem auto;
  }

  #comment-input {
    width: 87%;
    margin-left: 2rem;
    padding: 0.5rem;
    border-top: none;
    border-right: none;
    border-left: none;
    border-color: $primary-color;
    background-color: $background-color;

    &:focus {
      box-shadow: 0rem 0.5rem 2rem 0.1rem lighten($primary-color, 60%);
      background-color: $background-color;
      margin-left: 1.2rem;
      transition: all 0.3s ease-out;
    }
  }

  #create-comment-div {
    display: flex;
    align-self: flex-end;
    justify-content: center;
    margin-top: 3rem;

    .gg-play-list-add,
    #comment-btn,
    #comment-opacity-btn {
      font-size: 1rem;
      font-weight: 600;
      color: $third-color;
      background-color: $background-color;

      &:focus {
        outline: none;
        border: none;
      }
    }

    #comment-opacity-btn {
      opacity: 0.5;
      border-style: hidden;
    }
    #comment-btn {
      border: none;
    }
    .gg-play-list-add {
      opacity: 0;
      position: relative;
      top: 2rem;
      margin-right: 1rem;
      transition: all 0.5s ease-out;
    }

    &:hover {
      .gg-play-list-add {
        color: $secondary-color;
        top: 0.1rem;
        opacity: 1;
      }
      #comment-btn {
        color: $primary-color;
        cursor: pointer;
      }
    }
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #intro-comment-post {
    width: 45rem;

    #text-comment-post,
    #title-comment-post {
      width: 40rem;
      font-size: 2rem;
    }
  }

  #form-post {
    width: 45rem;

    #message-label {
      width: 45rem;

      .gg-row-first,
      .gg-details-more,
      .gg-row-last {
        --ggs: 2;
      }
    }

    #comment-input {
      width: 41rem;
      font-size: 1.5rem;
    }

    #create-comment-div {
      .gg-play-list-add {
        --ggs: 2;
      }

      #comment-btn,
      #comment-opacity-btn {
        font-size: 2rem;
      }

      &:hover {
        .gg-play-list-add {
          top: 0.5rem;
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  #text-comment-post,
  #title-comment-post {
    width: 19rem;
  }

  #message-label {
    &:focus {
      margin-left: 1.2rem;
      transition: all 0.3s ease-out;
    }
  }
}

@media screen and (max-width: 500px) {
  main {
    padding: 0 0.2rem;

    #intro-comment-post {
      width: 19rem;
    }

    #form-post {
      width: 19rem;

      #message-label {
        width: 19rem;
      }

      #comment-input {
        width: 16rem;
      }

      #comment-opacity-btn {
        width: 15rem;
        padding: 0.5rem;
      }
    }
  }
}
</style>
