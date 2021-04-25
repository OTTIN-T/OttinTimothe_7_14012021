<template>
  <div id="intro-profile">
    <h2 id="title-profile">Vos informations:</h2>
    <p id="text-profile">
      Voici vos informations personnelles! Vous pouvez les modifier ou les
      supprimer.
    </p>
  </div>
  <div id="profile">
    <span id="id-user">Utilisateur n°{{ userId }}</span>
    <!-- <i class="gg-profile"></i> -->
    <div class="user-div">
      <i class="gg-profile"></i>
      <p class="user-info">Nom: {{ name }}</p>
    </div>
    <div class="user-div">
      <i class="gg-mail-forward"></i>
      <p class="user-info">Prénom: {{ firstname }}</p>
    </div>
    <div class="user-div">
      <i class="gg-briefcase"></i>
      <p class="user-info">Poste: {{ poste }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: ["userId", "name", "firstname", "poste"],
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#intro-profile {
  margin: 1rem auto;
  text-align: left;

  #text-profile,
  #title-profile {
    padding-bottom: 1rem;
  }
}

#profile {
  margin: 1rem auto;
  text-align: left;

  #id-user {
    display: flex;
    justify-content: center;
  }

  .user-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 2rem;
  }
  .gg-mail-forward {
    transform: rotateX(180deg);
  }

  .user-info {
    word-break: break-all;
    width: 24rem;
    margin-left: 1rem;
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #profile {
    font-size: 2rem;

    #id-user {
      margin-bottom: -6rem;
    }

    .user-div {
      margin-top: 12rem;
    }

    .user-info {
      width: 44rem;
      margin-left: 3rem;
    }

    .gg-profile,
    .gg-briefcase {
      --ggs: 2;
    }
    .gg-mail-forward {
      transform: scale(var(--ggs, 2)) rotateX(180deg);
    }
  }
}

@media screen and (max-width: 500px) {
  #profile {
    .user-info {
      width: 18rem;
    }
  }
}
</style>