<template>
  <header>
    <img
      id="logo"
      src="../assets/logo-groupomania.png"
      alt="logo de l'entreprise gropupomania"
    />
    <nav id="nav">
      <router-link
        id="item-nav-login"
        to="/"
        title="Lien vers la page de connexion"
        >Connexion</router-link
      >
      <router-link
        id="item-nav-signup"
        to="/signup"
        title="Lien vers la page d'inscription"
        >Inscription</router-link
      >
    </nav>
    <router-view />
  </header>
</template>

<script>
export default {
  name: "NavLogin",
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

  #item-nav-login,
  #item-nav-signup {
    font-size: 1.5rem;
    font-weight: 700;
    color: $primary-color;

    &:after {
      display: block;
      content: "";
      border-bottom: solid 0.2rem $secondary-color;
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
  }

  #item-nav-login {
    &:after {
      transform-origin: 100% 50%;
    }
    &:hover:after {
      transform: scaleX(1);
      transform-origin: 0% 50%;
    }
  }

  #item-nav-signup {
    &:after {
      transform-origin: 0% 50%;
    }
    &:hover:after {
      transform: scaleX(1);
      transform-origin: 100% 50%;
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

    #item-nav-login,
    #item-nav-signup {
      font-size: 3.5rem;
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
