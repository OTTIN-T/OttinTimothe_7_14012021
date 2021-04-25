<template>
  <NavLogin />
  <main>
    <section>
      <div id="intro-signup">
        <h1 id="title-signup">Bienvenue!</h1>
        <p id="text-signup">Entrez vos informations pour continuer</p>
      </div>
      <form
        action=""
        method="post"
        autocomplete="on"
        id="form"
        v-on:submit.prevent
      >
        <label id="email-label" for="email"><i class="gg-mail"></i></label>
        <input
          id="email-input"
          type="email"
          v-model="email"
          placeholder="votre@email.fr"
          required
          autofocus
        />

        <label id="password-label" for="password"
          ><i class="gg-lock"></i
        ></label>
        <input
          id="password-input"
          type="new-password"
          v-model="password"
          maxlength="50"
          placeholder="Ex: Exemple3"
          required
        />

        <label id="password-confirmation-label" for="password_confirmation"
          ><i class="gg-lock-unlock"></i
        ></label>
        <input
          id="password-confirmation-input"
          type="new-password"
          v-model="password_confirmation"
          placeholder="Confirmer votre mot de passe"
          require
        />

        <label id="name-label" for="name"><i class="gg-profile"></i></label>
        <input
          id="name-input"
          type="text"
          v-model="name"
          maxlength="50"
          placeholder="Votre nom"
          required
        />

        <label id="firstname-label" for="firstname"
          ><i class="gg-user-add"></i
        ></label>
        <input
          id="firstname-input"
          type="text"
          v-model="firstname"
          maxlength="50"
          placeholder="Votre prénom"
          required
        />

        <label id="poste-label" for="poste"><i class="gg-briefcase"></i></label>
        <input
          id="poste-input"
          type="text"
          v-model="poste"
          maxlength="50"
          placeholder="Votre poste dans l'entreprise"
          @keyup.enter="signup"
          required
        />
        <p id="error_auth">{{ error }}</p>
        <button
          v-if="
            //Condition pour afficher le bouton
            email.length >= 5 &&
            password_confirmation.length >= 3 &&
            name.length >= 2 &&
            firstname.length >= 2 &&
            poste.length >= 2
          "
          id="button-signup"
          type="submit"
          title="Bouton d'inscription"
          @click="signup"
        >
          Inscription
        </button>
        <button id="button-signup-opacity" v-else>Inscription</button>
      </form>
    </section>
  </main>
  <Footer />
</template>

<script>
import NavLogin from "@/components/NavLogin.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Signup",
  components: {
    NavLogin,
    Footer,
  },
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      firstname: "",
      poste: "",
      error: "",
    };
  },
  methods: {
    signup() {
      const user = {
        email: this.email.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
        password: this.password_confirmation.trim(),
        name: this.name.trim(),
        firstname: this.firstname.trim(),
        poste: this.poste.trim(),
      };
      if (
        this.password === this.password_confirmation &&
        this.password.length > 0
      ) {
        //On vérifie le password
        return fetch("https://localhost:3000/groupomania/user/signup", {
          //Notre requête POST
          method: "POST", //Methode d'envoi
          headers: new Headers({
            "Content-Type": "application/json", //On 'précise' que l'objet envoyé sera au format JSON
          }),
          body: JSON.stringify(user), //On stringify l'objet envoyé
        })
          .then(async (result_) => {
            const user = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
            if (!user.error) {
              //Si pas d'erreur
              window.localStorage.setItem("user", JSON.stringify(user)); //On stocke orderId dans le localStorage pour l'utiliser après
              return this.$router.push({
                name: "ProfilePage",
                params: { id: user.userId },
              }); //on redirige vers le profil de l'user
            }
            if (user.error.name == "SequelizeUniqueConstraintError") {
              this.error = "Email déjà utilisé"; //Si erreur
            } else {
              this.error = user.error; //Si erreur
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.error = "Confirmation du mot de passe incorrect"; //Si erreur
    },
  },
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#intro-signup {
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 1rem auto;

  #text-signup,
  #title-signup {
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
  #password-label,
  #password-confirmation-label,
  #name-label,
  #firstname-label,
  #poste-label {
    display: flex;
    justify-content: flex-start;
    position: relative;
    z-index: 1;
    margin: 3rem auto -1.5rem auto;
  }
  #password-label {
    padding-left: 0.2rem;
    margin-top: 4rem;
  }
  #password-confirmation-label {
    padding-left: 0.35rem;
    margin-top: 4rem;
  }

  #email-input,
  #password-input,
  #password-confirmation-input,
  #name-input,
  #firstname-input,
  #poste-input {
    width: 87%;
    position: relative;
    z-index: 2;
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
  #password-input {
    &::after {
      &:focus {
        content: "OK";
      }
    }
  }

  #button-signup,
  #button-signup-opacity {
    margin: 3rem auto 0 auto;
    padding: 0.5rem 8rem;
    border-radius: 1rem;
  }

  #button-signup-opacity {
    opacity: 0.5;
    border-style: hidden;

    &:hover {
      cursor: not-allowed;
    }
  }

  #button-signup {
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

// Media queries
@media screen and (min-width: 2000px) {
  #intro-signup {
    width: 45rem;

    #text-signup,
    #title-signup {
      width: 40rem;
      font-size: 2.5rem;
    }
  }

  #form {
    width: 45rem;

    #email-label,
    #password-label,
    #password-confirmation-label,
    #name-label,
    #firstname-label,
    #poste-label {
      width: 45rem;
      margin-top: 6rem;

      .gg-mail,
      .gg-lock,
      .gg-lock-unlock,
      .gg-profile,
      .gg-user-add,
      .gg-briefcase {
        --ggs: 2;
      }
    }

    #email-input,
    #password-input,
    #password-confirmation-input,
    #name-input,
    #firstname-input,
    #poste-input {
      width: 41rem;
      font-size: 2rem;
    }

    #button-signup,
    #button-signup-opacity {
      margin-top: 5rem;
      font-size: 2rem;
    }
  }
}

@media screen and (max-width: 1000px) {
  #text-signup,
  #title-signup {
    width: 19rem;
  }

  #form {
    #email-input,
    #password-input,
    #password-confirmation-input,
    #name-input,
    #firstname-input,
    #poste-input {
      width: 21rem;

      &:focus {
        margin-left: 1.2rem;
        transition: all 0.3s ease-out;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  main {
    padding: 0 0.2rem;

    #intro-signup {
      width: 19rem;
    }

    #form {
      width: 19rem;

      #email-label,
      #password-label,
      #password-confirmation-label,
      #name-label,
      #firstname-label,
      #poste-label {
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

      #button-signup,
      #button-signup-opacity {
        width: 15rem;
        padding: 0.5rem;
      }
    }
  }
}
</style>
