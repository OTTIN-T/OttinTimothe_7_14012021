<template>
  <NavHome />
  <main>
    <section id="admin-page">
      <div id="intro-admin">
        <h2 id="title-admin">Contenu signalé:</h2>
        <p id="text-admin">
          Retrouver tous les signalements fait par les utilisateurs.
        </p>
      </div>
      <div v-for="report in reports" :key="report" id="user-report">
        <div v-if="report.postId >= 1 && report.commentId === 0">
          <h3 class="title-text">Contenu signalé:</h3>
          <p class="text">{{ report.message }}</p>
          Post
          <router-link
            class="nav-user"
            :to="{ name: 'PostUnique', params: { id: report.postId } }"
          >
            n°{{ report.postId }}
          </router-link>
          <p>
            Utilisateur signalé:
            <router-link
              class="nav-user"
              :to="{
                name: 'ProfilePage',
                params: { id: report.userReportedId },
              }"
              title="Lien vers le profil signalé"
              >n°{{ report.userReportedId }}</router-link
            >
          </p>
          <p>
            Signalé par l'utilisateur:
            <router-link
              class="nav-user"
              :to="{
                name: 'ProfilePage',
                params: { id: report.userReporterId },
              }"
              title="Lien vers le profil signalant"
              >n°{{ report.userReporterId }}</router-link
            >
          </p>
        </div>
        <div v-else-if="report.commentId >= 1">
          <h3 class="title-text">Contenu signalé:</h3>
          <p class="text">{{ report.message }}</p>
          <p>Commentaire n°: {{ report.commentId }}</p>
          Sur le post
          <router-link
            class="nav-user"
            :to="{ name: 'PostUnique', params: { id: report.postId } }"
          >
            n°{{ report.postId }}
          </router-link>
          <p>
            Utilisateur signalé:
            <router-link
              class="nav-user"
              :to="{
                name: 'ProfilePage',
                params: { id: report.userReportedId },
              }"
              title="Lien vers le profil signalé"
              >n°{{ report.userReportedId }}</router-link
            >
          </p>
          <p>
            Signalé par l'utilisateur:
            <router-link
              class="nav-user"
              :to="{
                name: 'ProfilePage',
                params: { id: report.userReporterId },
              }"
              title="Lien vers le profil signalant"
              >n°{{ report.userReporterId }}</router-link
            >
          </p>
        </div>

        <!-- Boutton delete report -->
        <ButtonDelete
          v-if="isAdmin === true"
          title="Bouton pour annuler un report"
          @deleteButton="
            cancelReport(
              report.userReportedId,
              report.userReporterId,
              report.postId,
              report.commentId
            )
          "
          :action="action"
        >
        </ButtonDelete>
        <p>{{ error }}</p>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script>
import NavHome from "@/components/NavHome.vue";
import ButtonDelete from "@/components/ButtonDelete.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "AdminPage",
  components: {
    NavHome,
    ButtonDelete,
    Footer,
  },
  data() {
    return {
      token: "",
      userId: "",
      isAdmin: "",
      error: "",
      action: "ANNULER",
      reports: [],
    };
  },
  created() {
    //On recupère notre token
    const storage = localStorage.getItem("user");
    const auth = JSON.parse(storage);
    if (auth === null || auth.isAdmin === false) {
      return this.$router.push({ path: "/" }); //On redirige vers le login
    }
    this.token = auth.token;
    this.userId = auth.userId;
    this.isAdmin = auth.isAdmin;

    fetch(
      "https//localhost:3000/groupomania/report/admin/" + this.$route.params.id,
      {
        headers: new Headers({
          "Content-Type": "application/json", //On 'précise' que l'objet envoyé sera au format JSON
          Authorization: `Bearer ${this.token}`, //On recupèrer notre token
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        //Si pas d'erreur d'auth
        if (!response.error) {
          return (this.reports = response.report);
        }
        this.$router.push({ path: "/home" }); //On refresh
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    cancelReport(userReportedId, userReporterId, postId, commentId) {
      //On vérifie notre token
      if (this.token === null) {
        return this.$router.push({ path: "/" }); //On redirige vers le login
      }

      if (this.$route.params.id != this.userId && this.isAdmin != true) {
        return this.$router.push({ path: "/home" }); //On redirige vers la home
      }

      const report = {
        userReportedId: userReportedId,
        userReporterId: userReporterId,
        postId: postId,
        commentId: commentId,
      };
      fetch("https//localhost:3000/groupomania/report/admin/cancel/", {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`, //On recupèrer notre token
        }),
        body: JSON.stringify(report), //L'objet envoyé
      })
        .then(async (result_) => {
          const report = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          if (!report.error) {
            return fetch(
              //On met à jour l'affichage
              "https//localhost:3000/groupomania/report/admin/" +
                this.$route.params.id,
              {
                headers: new Headers({
                  "Content-Type": "application/json", //On 'précise' que l'objet envoyé sera au format JSON
                  Authorization: `Bearer ${this.token}`, //On recupèrer notre token
                }),
              }
            )
              .then((response) => response.json())
              .then((response) => {
                //Si pas d'erreur d'auth
                if (!response.error) {
                  return (this.reports = response.report);
                }
                this.$router.push({ path: "/home" }); //On refresh
              })
              .catch((error) => {
                console.log(error);
              });
          }
          this.error = report.error; //Si erreur
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

#admin-page {
  width: 40rem;
  margin: 0 auto;

  #intro-admin {
    margin: 1rem auto;
    text-align: left;

    #text-admin,
    #title-admin {
      padding-bottom: 1rem;
    }
  }

  #user-report {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    text-align: left;
    // height: 2.5rem;
    margin-bottom: 2rem;

    .nav-user {
      border-bottom: 0.1rem solid black;
      transition: all 0.5s ease-out;

      &:hover {
        border-color: $secondary-color;
      }
    }

    .title-text {
      font-weight: 100;
      font-size: 1rem;
      border-bottom: 0.1rem solid black;
      width: 7rem;
    }

    .text {
      width: 30rem;
      text-align: justify;
      margin-bottom: 0.5rem;
    }

    #delete-div {
      margin-top: 0rem;
      top: 0rem;

      &:hover {
        .gg-trash {
          top: 0rem;
        }
      }

      .gg-trash {
        right: 1rem;
        top: 1.7rem;
      }

      #delete-btn {
        margin-top: 0rem;
      }
    }
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #admin-page {
    width: 45rem;
    font-size: 2rem;

    #user-report {
      margin-bottom: 6rem;

      .title-text {
        font-size: 1.5rem;
        width: 11rem;
      }

      #delete-btn {
        top: -3.7rem;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  #admin-page {
    width: 30rem;

    #user-report {
      .text {
        width: 30rem;
      }

      #delete-div {
        font-size: 0.9rem;
        margin-top: 1.5rem;
        align-self: center;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  #admin-page {
    width: 19rem;

    #user-report {
      .text {
        width: 19rem;
      }
    }
  }
}
</style>