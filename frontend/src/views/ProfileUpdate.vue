<template>
  <NavHome />
  <main>
    <section id="profile-page">
      <div id="intro-profile">
        <h1 id="title-profile">Modifier votre profil:</h1>
      </div>
      <form action="" method="post" id="form-profile">
        <label id="name-label" for="name"
          ><i class="gg-profile"></i>Nom:
        </label>
        <input
          id="name-input"
          type="text"
          v-model="name"
          maxlength="50"
          autofocus
          required
        />

        <label id="firstname-label" for="id">
          <i class="gg-mail-forward"></i>Prénom:
        </label>
        <input
          id="firstname-input"
          type="text"
          v-model="firstname"
          maxlength="50"
          required
        />

        <label id="poste-label" for="id"
          ><i class="gg-briefcase"></i>Poste:
        </label>
        <input
          id="poste-input"
          type="text"
          v-model="poste"
          maxlength="50"
          required
        />
      </form>

      <!-- Boutton update profile -->
      <ButtonUpdate
        v-if="name.length <= 2 || firstname.length <= 2 || poste.length <= 2"
        id="delete-opacity-btn"
      >
      </ButtonUpdate>

      <ButtonUpdate
        v-else-if="userId === idProfile || isAdmin === true"
        title="Bouton pour update son profil"
        @update="updateProfile(idProfile)"
      >
      </ButtonUpdate>
    </section>
  </main>
  <Footer />
</template>

<script>
import NavHome from "@/components/NavHome.vue";
import ButtonUpdate from "@/components/ButtonUpdate.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "ProfilePage",
  components: {
    NavHome,
    ButtonUpdate,
    Footer,
  },
  data() {
    return {
      idProfile: "",
      name: "",
      firstname: "",
      poste: "",
      token: "",
      userId: "",
      isAdmin: "",
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

    if (this.$route.params.id != this.userId && this.isAdmin != true) {
      return this.$router.push({ path: "/home" }); //On redirige vers le login
    }

    //Appel de notre API
    fetch(
      "https//localhost:3000/groupomania/profile/" + this.$route.params.id,
      {
        //ID du post
        headers: new Headers({
          "Content-Type": "application/json", //On 'précise' que l'objet envoyé sera au format JSON
          Authorization: `Bearer ${this.token}`, //On authentifie notre requête
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        //Si erreur d'auth
        if (response.error) {
          return this.$router.push({ path: "/" }); //On redirige vers le login
        }
        this.idProfile = response.user.id;
        this.name = response.user.name;
        this.firstname = response.user.firstname;
        this.poste = response.user.poste;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    updateProfile(userUpdate) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      if (this.$route.params.id != this.userId && this.isAdmin != true) {
        return this.$router.push({ path: "/home" }); //On redirige vers la home
      }

      const user = {
        name: this.name.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
        firstname: this.firstname.trim(),
        poste: this.poste.trim(),
      };

      fetch("https//localhost:3000/groupomania/profile/" + userUpdate, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`, //On recupèrer notre token
        }),
        body: JSON.stringify(user), //L'objet envoyé
      })
        .then(async (result_) => {
          const user = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (!user.error) {
            //Si pas d'erreur
            return this.$router.push({
              name: "ProfilePage",
              params: userUpdate,
            }); //On redirige vers le profil
          }
          this.error = user.error; //Si erreur
          this.$router.push({ name: "ProfilePage", params: userUpdate }); //On redirige vers le profil
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

#profile-page {
  width: 25rem;
  margin: 0 auto;

  #intro-profile {
    display: flex;
    flex-direction: column;
    margin: 1rem auto;

    #title-profile {
      display: flex;
      justify-content: flex-start;
      text-align: left;
      padding-bottom: 1rem;
    }
  }

  #form-profile {
    margin: 0 auto;
    padding: 0 0 2rem 0;
    border-radius: 1rem;

    #name-label,
    #firstname-label,
    #poste-label {
      display: flex;
      justify-content: flex-start;
      margin: 3rem auto -1.5rem auto;

      .gg-profile,
      .gg-mail-forward,
      .gg-briefcase {
        right: 1rem;
      }

      .gg-mail-forward {
        transform: rotateX(180deg);
        left: -0.8rem;
        top: 0.4rem;
      }
    }

    #name-input,
    #firstname-input,
    #poste-input {
      width: 60%;
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
  }

  #delete-opacity-btn,
  #update-div {
    margin-top: 2rem;
  }

  #delete-opacity-btn:hover {
    #update-btn {
      cursor: not-allowed;
      color: $third-color;
    }
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #profile-page {
    width: 45rem;
    font-size: 2rem;
    margin-top: 5rem;

    #form-profile {
      margin-top: 10rem;

      #name-label,
      #firstname-label,
      #poste-label {
        margin: 4rem auto -2.5rem auto;

        .gg-profile,
        .gg-mail-forward,
        .gg-briefcase {
          --ggs: 2;
          top: 0.7rem;
          margin-right: 0.5rem;
        }

        .gg-mail-forward {
          transform: scale(var(--ggs, 2)) rotateX(180deg);
        }
      }

      #name-input,
      #firstname-input,
      #poste-input {
        width: 70%;
        margin-left: 8rem;
        font-size: 1.8rem;

        &:focus {
          margin-left: 5rem;
        }
      }
    }
  }

  #delete-opacity-btn,
  #update-div {
    font-size: 2rem;
    margin-top: 5rem;
  }
}

@media screen and (max-width: 500px) {
  #profile-page {
    width: 19rem;

    #form-profile {
      margin: 0 auto 0 1rem;

      #name-input,
      #firstname-input,
      #poste-input {
        margin-left: 4rem;

        &:focus {
          margin-left: 3.5rem;
        }
      }
    }
  }
}
</style>

