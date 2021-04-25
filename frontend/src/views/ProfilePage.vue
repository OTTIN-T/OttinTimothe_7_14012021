<template>
  <NavHome />
  <main id="profile-page">
    <section>
      <h1 id="title-profile">Votre profil<i class="gg-user"></i></h1>
      <Profile
        :userId="idProfile"
        :name="name"
        :firstname="firstname"
        :poste="poste"
      />

      <!-- Boutton delete profile -->
      <RouterDelete
        v-if="userId === idProfile || isAdmin === true"
        :id="this.$route.params.id"
      ></RouterDelete>

      <!-- Router update profile -->
      <RouterUpdate
        v-if="userId === idProfile || isAdmin === true"
        :id="userId"
        :userId="idProfile"
      ></RouterUpdate>

      <!-- Boutton report profile -->
      <ButtonReport
        v-if="userId != idProfile && isAdmin === false"
        :reportMessage="reportMessage"
        @report="reportProfile(idProfile, userId)"
      >
      </ButtonReport>
    </section>
  </main>
  <Footer />
</template>

<script>
import NavHome from "@/components/NavHome.vue";
import Profile from "@/components/Profile.vue";
import ButtonReport from "@/components/ButtonReport.vue";
import RouterDelete from "@/components/RouterDelete.vue";
import RouterUpdate from "@/components/RouterUpdate.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "ProfilePage",
  components: {
    NavHome,
    Profile,
    ButtonReport,
    RouterDelete,
    RouterUpdate,
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
      reportMessage: "",
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
    fetch(
      "https//localhost:3000/groupomania/profile/" + this.$route.params.id,
      {
        method: "GET", //Methode d'envoi
        headers: new Headers({
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
  updated() {
    //Appel de notre API
    fetch(
      "https//localhost:3000/groupomania/profile/" + this.$route.params.id,
      {
        method: "GET", //Methode d'envoi
        headers: new Headers({
          Authorization: `Bearer ${this.token}`, //On authentifie notre requête
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        //Si erreur d'auth
        if (response.error) {
          return this.$router.push({ path: "/home" }); //On redirige vers le login
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
    reportProfile(userReportedId, userReporterId) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      //On recupère l'id report
      this.userReportedId = userReportedId;

      //Appel de notre API
      fetch(
        `https//localhost:3000/groupomania/report/reported/${userReportedId}/${userReporterId}`,
        {
          //Notre requête GET
          method: "GET", //Methode d'envoi
          headers: new Headers({
            Authorization: `Bearer ${this.token}`, //On authentifie notre requête
          }),
        }
      )
        .then(async (result_) => {
          const user = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (user.message) {
            //Si pas d'erreur
            this.reportMessage = user.message;
          }
          this.error = user.error; //Si erreur
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
  margin: auto;

  #title-profile {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    &:hover {
      .gg-user {
        color: $secondary-color;
        transition: all 0.5s ease-out;
        transform: scale(1.5);
      }
    }
  }

  //Bouton report
  #report-div {
    right: 1rem;
    top: 1.5rem;

    .gg-block {
      right: -6rem;
    }
  }

  //Bouton update post
  #update-router {
    margin-top: -1.1rem;
    &:hover {
      .gg-user-add {
        top: 0rem;
      }
    }
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #profile-page {
    width: 45rem;
    font-size: 2rem;

    .gg-user {
      --ggs: 2;
    }

    #report-div {
      top: 2rem;
    }

    #update-router {
      margin-top: -2.5rem;
    }

    #delete-router {
      margin-top: 8rem;
    }
  }
}

@media screen and (max-width: 500px) {
  #profile-page {
    width: 19rem;
  }
}
</style>

