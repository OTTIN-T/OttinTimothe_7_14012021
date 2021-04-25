<template>
  <NavHome />
  <main>
    <section>
      <div id="intro-update-post">
        <h1 id="title-update-post">Modifier votre post</h1>
        <p id="text-update-post">Laisser libre cours à vos idées!</p>
      </div>
      <form id="form-post" v-on:submit.prevent>
        <label id="title-label" for="title" :value="title"
          ><i class="gg-row-first"></i
        ></label>
        <input
          id="title-input"
          type="text"
          maxlength="100"
          v-model="title"
          required
          autofocus
        />
        <p>{{ title.length }}/100</p>
        <label id="message-label" for="message" :value="message"
          ><i class="gg-details-more"></i
        ></label>
        <textarea
          rows="10"
          cols="25"
          maxlength="255"
          id="message-input"
          v-model="message"
          required
        />
        <p>{{ message.length }}/255</p>
        <label id="link-label" for="link" :value="link"
          ><i class="gg-row-last"></i
        ></label>
        <input
          id="link-input"
          type="url"
          maxlength="255"
          v-model="link"
          placeholder="Pas obligatoire"
        />
        <p>{{ link.length }}/255</p>

        <!-- Boutton update post -->
        <ButtonUpdate v-if="message.length <= 3" id="post-opacity-btn">
        </ButtonUpdate>
        <ButtonUpdate
          v-else-if="userId == postUserId || isAdmin === true"
          title="Bouton pour modifier un post"
          @update="send(this.$route.params.id)"
        >
        </ButtonUpdate>
      </form>
      <p id="succes">{{ postSucces }}</p>
      <p id="error">{{ error }}</p>
    </section>
  </main>
  <Footer />
</template>

<script>
import NavHome from "@/components/NavHome.vue";
import ButtonUpdate from "@/components/ButtonUpdate.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "PostUpdate",
  components: {
    NavHome,
    ButtonUpdate,
    Footer,
  },
  data() {
    return {
      title: "",
      message: "",
      link: "",
      token: "",
      userId: "",
      isAdmin: "",
      postId: "",
      postSucces: "",
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
      //ID du post
      headers: new Headers({
        "Content-Type": "application/json", //On 'précise' que l'objet envoyé sera au format JSON
        Authorization: `Bearer ${this.token}`, //On aut/updatehentifie notre requête
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        //Si erreur d'auth
        if (response.error) {
          return this.$router.push({ path: "/" }); //On redirige vers le login
        }
        this.postId = response.post.id;
        this.postUserId = response.post.UserId;
        this.title = response.post.title;
        this.message = response.post.message;
        this.link = response.post.link;
        this.messagePost = response.message;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    send(postId) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //this.$route.params.id
      if (this.postUserId != this.userId && this.isAdmin != true) {
        return this.$router.push({ path: "/home" }); //On redirige vers le login
      }

      const post = {
        title: this.title.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
        message: this.message.trim(),
        link: this.link.trim(),
      };

      fetch("https//localhost:3000/groupomania/post/" + postId, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`, //On recupèrer notre token
        }),
        body: JSON.stringify(post), //L'objet envoyé
      })
        .then(async (result_) => {
          const post = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (!post.error) {
            //Si pas d'erreur
            this.postSucces = "Post modifié !";
            return this.$router.push({ name: "PostUnique", params: postId }); //On redirige vers le post
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

#intro-update-post {
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 1rem auto;

  #text-update-post,
  #title-update-post {
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

  #post-opacity-btn {
    &:hover {
      #update-btn {
        color: $third-color;
      }
    }
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #intro-update-post {
    width: 45rem;

    #text-update-post,
    #title-update-post {
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
  }
}

@media screen and (max-width: 1000px) {
  #text-update-post,
  #title-update-post {
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

    #intro-update-post {
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

      #post-opacity-btn {
        width: 15rem;
        padding: 0.5rem;
      }
    }
  }
}
</style>
