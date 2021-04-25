<template>
  <header>
    <img
      id="logo"
      src="../assets/icon-left-font.png"
      alt="logo de l'entreprise gropupomania"
    />
    <nav id="nav">
      <router-link id="item-nav-home" to="/home" title="Lien vers l'accueil"
        >Accueil</router-link
      >
      <router-link
        id="item-nav-profil"
        :to="{ name: 'ProfilePage', params: { id: userId } }"
        title="Lien vers son profil"
        >Profil</router-link
      >
      <router-link id="item-nav-logout" to="/" title="Bouton déconnexion"
        ><i class="gg-log-in"></i
      ></router-link>
    </nav>
  </header>
  <router-view />
</template>

<script>
export default {
  name: "NavHome",
  data() {
    return {
      token: "",
      userId: "",
      isAdmin: "",
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
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#logo {
  max-width: 20%;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 25rem;
  margin: 3rem auto;
  text-transform: uppercase;
  font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;

  #item-nav-home,
  #item-nav-profil,
  #item-nav-logout {
    font-size: 1.5rem;
    font-weight: 700;
    color: $primary-color;

    .gg-log-in {
      --ggs: 1.5;

      &:hover {
        transition: all 0.5s ease-out;
        --ggs: 2;
      }
    }

    &:after {
      display: block;
      content: "";
      border-bottom: solid 0.2rem $secondary-color;
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
  }

  #item-nav-home {
    &:after {
      transform-origin: 100% 50%;
    }

    &:hover:after {
      transform: scaleX(1);
      transform-origin: 0% 50%;
    }
  }

  #item-nav-profil {
    &:hover:after {
      transform: scaleX(1);
    }
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #nav {
    width: 44.5rem;

    #logo {
      max-width: 40%;
    }

    #item-nav-home,
    #item-nav-profil,
    #item-nav-logout {
      font-size: 3.5rem;

      .gg-log-in {
        --ggs: 3;
      }
    }
  }
}

@media screen and (max-width: 950px) {
  #logo {
    max-width: 30%;
  }
}

@media screen and (max-width: 650px) {
  #logo {
    max-width: 40%;
  }

  #item-nav-logout {
    margin-right: 0.5rem;
  }
}

@media screen and (max-width: 500px) {
  header {
    padding: 0 0.2rem;

    #logo {
      max-width: 60%;
    }

    #nav {
      width: 19.5rem;
    }
  }
}
</style>
