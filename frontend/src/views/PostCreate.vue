<template>
  <NavHome />
  <main>
    <section>
      <div id="intro-post">
        <h1 id="title-post">Ecrivez!</h1>
        <p id="text-post">Laisser libre cours à vos idées!</p>
      </div>
      <form action="" method="post" id="form-post" v-on:submit.prevent>
        <label id="title-label" for="title"><i class="gg-row-first"></i></label>
        <input
          id="title-input"
          type="text"
          maxlength="100"
          v-model="title"
          placeholder="Un titre court"
          required
          autofocus
        />
        <p>{{ title.length }}/100</p>

        <label id="message-label" for="message"
          ><i class="gg-details-more"></i
        ></label>
        <textarea
          rows="10"
          cols="25"
          maxlength="255"
          id="message-input"
          v-model="message"
          placeholder="Votre message"
          required
        />
        <p>{{ message.length }}/255</p>

        <label id="link-label" for="link"><i class="gg-row-last"></i></label>
        <input
          id="link-input"
          type="url"
          maxlength="255"
          v-model="link"
          placeholder="Un lien (Pas obligatoire)"
        />
        <p>{{ link.length }}/255</p>

        <div id="create-post-div">
          <i class="gg-play-list-add"></i>
          <button
            v-if="
              //Condition pour afficher le bouton
              title.length >= 3 && message.length >= 3
            "
            id="post-btn"
            type="submit"
            title="Bouton pour poster"
            @click="send"
          >
            Poster
          </button>
          <button id="post-opacity-btn" v-else>Poster</button>
        </div>
      </form>
      <p id="succes">{{ postSucces }}</p>
      <p id="error">{{ error }}</p>
    </section>
  </main>
  <Footer />
</template>

<script>
import NavHome from "@/components/NavHome.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "PostCreate",
  components: {
    NavHome,
    Footer,
  },
  data() {
    return {
      title: "",
      message: "",
      link: "",
      token: "",
      userId: "",
      postSucces: "",
      error: "",
    };
  },
  methods: {
    send() {
      //On recupère notre token
      const storage = localStorage.getItem("user");
      const auth = JSON.parse(storage);
      if (auth === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }
      this.token = auth.token;
      this.userId = auth.userId;

      const post = {
        title: this.title.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
        message: this.message.trim(),
        link: this.link.trim(),
      };

      fetch("https//localhost:3000/groupomania/post/", {
        //Notre requête POST
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`, //On recupèrer notre token
        }),
        body: JSON.stringify(post), //L'objet envoyé
      })
        .then(async (result_) => {
          const post = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (!post.error) {
            this.$route.params.id = post.post.id;
            this.postSucces = post.message;
            return this.$router.push({
              name: "PostUnique",
              params: this.$route.params.id,
            });
          }
          this.error = post.error; //Si erreur
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

#intro-post {
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 1rem auto;

  #text-post,
  #title-post {
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

  #title-label,
  #message-label,
  #link-label {
    display: flex;
    justify-content: flex-start;
    margin: 3rem auto -1.5rem auto;
  }

  #title-input,
  #message-input,
  #link-input {
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

  #create-post-div {
    display: flex;
    align-self: flex-end;
    justify-content: center;
    margin-top: 3rem;

    .gg-play-list-add,
    #post-btn,
    #post-opacity-btn {
      font-size: 1rem;
      font-weight: 600;
      color: $third-color;
      background-color: $background-color;
    }

    #post-opacity-btn {
      opacity: 0.5;
      border-style: hidden;

      &:hover {
        cursor: not-allowed;
      }
    }
    #post-btn {
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
      #post-btn {
        color: $primary-color;
        cursor: pointer;
      }
    }
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #intro-post {
    width: 45rem;

    #text-post,
    #title-post {
      width: 40rem;
      font-size: 2rem;
    }
  }

  #form-post {
    width: 45rem;

    #title-label,
    #message-label,
    #link-label {
      width: 45rem;

      .gg-row-first,
      .gg-details-more,
      .gg-row-last {
        --ggs: 2;
      }
    }

    #title-input,
    #message-input,
    #link-input {
      width: 41rem;
      font-size: 1.5rem;
    }

    #create-post-div {
      .gg-play-list-add {
        --ggs: 2;
      }

      #post-btn,
      #post-opacity-btn {
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
  #text-post,
  #title-post {
    width: 19rem;
  }

  #title-input,
  #message-input,
  #link-input {
    &:focus {
      margin-left: 1.2rem;
      transition: all 0.3s ease-out;
    }
  }
}

@media screen and (max-width: 500px) {
  main {
    padding: 0 0.2rem;

    #intro-post {
      width: 19rem;
    }

    #form-post {
      width: 19rem;

      #title-label,
      #message-label,
      #link-label {
        width: 19rem;
      }

      #email-input,
      #password-input,
      #password-confirmation-input,
      #name-input,
      #firstname-input,
      #poste-input {
        width: 16rem;
      }

      #button-post,
      #button-post-opacity {
        width: 15rem;
        padding: 0.5rem;
      }
    }
  }
}
</style>
