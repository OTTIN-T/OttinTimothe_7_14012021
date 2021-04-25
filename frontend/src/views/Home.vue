<template>
  <NavHome />
  <main id="home-page">
    <section id="intro-home">
      <h1 id="title-home">Fil d'actualité</h1>
      <ButtonAdmin />
      <p id="text-home">Vous aussi partagez vos idées!</p>
      <router-link
        to="/post/create"
        id="create-post-btn"
        title="Bouton pour poster"
      >
        Postez !
        <i class="gg-airplane"></i>
      </router-link>
    </section>
    <Posts />
  </main>
  <Footer />
</template>

<script>
import Posts from "@/components/Posts.vue";
import NavHome from "@/components/NavHome.vue";
import ButtonAdmin from "@/components/ButtonAdmin.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Posts,
    NavHome,
    ButtonAdmin,
    Footer,
  },
  created() {
    //On recupère notre token
    const storage = localStorage.getItem("user");
    const auth = JSON.parse(storage);
    if (auth === null) {
      return this.$router.push({ path: "/" }); //On redirige vers le login
    }
  },
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#intro-home {
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 1rem auto;
  text-align: left;
  border-bottom: 0.12rem solid $secondary-color;

  // #title-home,
  #text-home {
    margin-top: 2rem;
    font-weight: 600;
  }

  #create-post-btn {
    margin: 1rem auto;
    color: lighten($primary-color, 50%);
    font-weight: 600;

    .gg-airplane {
      opacity: 0;
      margin-left: -2rem;
    }

    &:hover {
      transition: all 0.5s ease-out;
      transform: scale(1.2);
      color: $primary-color;

      .gg-airplane {
        color: $secondary-color;
        animation: slide-airplane 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

        //Pour modifier la couleur sur tout l'avion
        background: linear-gradient(
              to left,
              currentColor 22px,
              $secondary-color 0
            )
            no-repeat center/16px 2px,
          radial-gradient(circle, currentColor 60%, transparent 40%) no-repeat
            right center/2px 2px;
      }
    }
  }
}
//Keyframes
@keyframes slide-airplane {
  0% {
    opacity: 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(6rem);
    transform: translateX(6rem);
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #intro-home {
    width: 45rem;
    font-size: 1.5rem;

    #create-post-btn {
      font-size: 2rem;

      .gg-airplane {
        --ggs: 2;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  #intro-home {
    width: 19rem;
  }
}
</style>
