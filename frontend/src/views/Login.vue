<template>
  <NavLogin />
  <main id="login-page">
    <section>
      <div id="intro-login">
        <h1 id="title-login">Bienvenue!</h1>
        <p id="text-login">
          Entrez vos informations d'identification pour continuer
        </p>
      </div>
      <form
        action=""
        method="post"
        autocomplete="on"
        id="form"
        v-on:submit.prevent
      >
        <label for="email" id="email-label"><i class="gg-user"></i></label>
        <input
          id="email-input"
          type="email"
          v-model="email"
          placeholder="votre@email.fr"
          required
          autofocus
        />

        <label for="password" id="password-label"
          ><i class="gg-lock"></i
        ></label>
        <input
          id="password-input"
          type="current-password"
          v-model="password"
          placeholder="Exemple1"
          @keyup.enter="login"
          required
        />
        <p id="error_auth">{{ error }}</p>
        <button
          v-if="email.length >= 5 && password.length >= 3"
          id="button-login"
          type="submit"
          title="bouton de connexion"
          @click="login"
        >
          Connexion
        </button>
        <button id="button-login-opacity" v-else>Connexion</button>
      </form>
    </section>
  </main>
  <footer>
    <section id="footer-login">
      <h2 id="text_footer-login">Vous n'êtes pas encore inscrit ?</h2>
      <router-link id="button-signup" to="/signup">
        <img
          id="img-footer-login"
          src="../assets/icon-left-font.png"
          alt="Le logo de Groupomania est vers la gauche du nom de l'entreprise. Renvoi vers la page d'inscription"
          title="Lien vers la page d'inscription"
        />

        <i id="arrow" class="gg-arrow-top-right-r"></i>
      </router-link>
      <a
        id="mail-contact"
        href="mailto:test@test.com"
        title="Lien vers l'email d'aide"
        >Un problème ?</a
      >
    </section>
    <router-view />
  </footer>
</template>

<script>
import NavLogin from "@/components/NavLogin.vue";

export default {
  name: "Login",
  components: {
    NavLogin,
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  created() {
    localStorage.clear(); //On assure un local storage vide
  },
  methods: {
    login() {
      const user = {
        email: this.email.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
        password: this.password.trim(),
      };
      if (user.email.length && user.password.length > 0) {
        //On vérifie nos champs
        fetch("https//localhost:3000/groupomania/user/login", {
          method: "POST", //Methode d'envoi
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(user), //On stringify l'objet envoyé
        })
          .then(async (result_) => {
            const user = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
            if (!user.error) {
              //SI pas d'erreur
              window.localStorage.setItem("user", JSON.stringify(user)); //On stocke user dans le localStorage pour l'utiliser après
              this.$router.push({ path: "/home" });
            }
            this.error = user.error; //Si erreur
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#intro-login {
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 1rem auto;

  #text-login,
  #title-login {
    display: flex;
    justify-content: flex-start;
    text-align: left;
    padding-bottom: 1rem;
  }
}

#form {
  width: 25rem;
  margin: 0 auto;
  padding: 0 0 2rem 0;
  border-radius: 1rem;

  #email-label,
  #password-label {
    display: flex;
    justify-content: flex-start;
    margin: 3rem auto -1.5rem auto;
  }

  #email-input,
  #password-input {
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
      margin-left: 1.2rem;
      transition: all 0.3s ease-out;
    }
  }

  #button-login,
  #button-login-opacity {
    margin: 3rem auto 0 auto;
    padding: 0.5rem 8rem;
    border-radius: 1rem;
  }

  #button-login-opacity {
    opacity: 0.5;
    border-style: hidden;

    &:hover {
      cursor: not-allowed;
    }
  }

  #button-login {
    background-color: $background-color;
    border: solid 0.1rem $primary-color;

    &:hover {
      cursor: pointer;
      border: solid 0.1rem $secondary-color;
      box-shadow: 0rem 0.1rem 0.5rem 0.1rem lighten($primary-color, 60%);
      transition: all 0.5s ease-out;
      transform: scale(1.2);
    }
  }
}

#footer-login {
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 2rem auto 0 auto;

  #button-signup {
    display: flex;
    justify-content: flex-start;
    border-bottom: 0.1rem solid $primary-color;
    padding-bottom: 1rem;
    margin-top: 1rem;

    #img-footer-login {
      width: 70%;
      margin: 0 auto;
      -webkit-animation: shake-anim 10s ease-in-out 1s infinite both;
      animation: shake-anim 10 ease-in-out 1s infinite both;

      &:hover {
        -webkit-animation: shake-anim 2s ease-in-out 0s infinite both;
        animation: shake-anim 2 ease-in-out 0s infinite both;
      }
    }

    #arrow {
      opacity: 0.1;
    }

    &:hover {
      #arrow {
        transition: all 0.3s ease-out;
        transform: scale(1.2);
        opacity: 1;
      }
    }
  }

  #mail-contact {
    display: flex;
    justify-content: flex-end;
    font-size: 1rem;
    font-weight: 600;
    margin: 4rem 0 0 auto;
    color: lighten($primary-color, 50%);
    transition: all 0.5s ease-out;

    &:hover {
      transform: scale(1.1);
      color: $primary-color;
    }
  }
}

// Keyframes
@keyframes shake-anim {
  0%,
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  10% {
    -webkit-transform: rotate(1deg);
    transform: rotate(1deg);
  }
  20%,
  40%,
  60% {
    -webkit-transform: rotate(-2deg);
    transform: rotate(-2deg);
  }
  30%,
  50%,
  70% {
    -webkit-transform: rotate(2.5deg);
    transform: rotate(2.5deg);
  }
  80% {
    -webkit-transform: rotate(-2deg);
    transform: rotate(-2deg);
  }
  90% {
    -webkit-transform: rotate(1deg);
    transform: rotate(1deg);
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #intro-login {
    width: 45rem;

    #text-login,
    #title-login {
      width: 40rem;
      font-size: 2.5rem;
    }
  }

  #form {
    width: 45rem;

    #email-label,
    #password-label {
      width: 45rem;
      margin-top: 6rem;

      .gg-user,
      .gg-lock {
        --ggs: 2;
      }
    }

    #email-input,
    #password-input {
      width: 41rem;
      font-size: 2rem;
    }

    #button-login,
    #button-login-opacity {
      margin-top: 10rem;
      font-size: 2rem;
    }
  }

  #footer-login {
    width: 45rem;
    font-size: 2rem;
    margin-top: 6rem;

    #mail-contact {
      font-size: 2rem;
    }
  }
}

@media screen and (max-width: 1000px) {
  #text-login,
  #title-login {
    width: 19rem;
  }

  #email-input,
  #password-input {
    width: 21rem;
  }
}

@media screen and (max-width: 500px) {
  main {
    padding: 0 0.2rem;

    #intro-login {
      width: 19rem;
    }

    #form {
      width: 19rem;

      #email-label,
      #password-label {
        width: 19rem;
      }

      #email-input,
      #password-input {
        width: 16rem;
      }

      #button-login,
      #button-login-opacity {
        width: 15rem;
        padding: 0.5rem;
      }
    }
  }

  #footer-login {
    width: 19rem;

    #button-signup {
      width: 100%;
    }
  }
}
</style>

