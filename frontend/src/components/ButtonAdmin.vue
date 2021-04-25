<template>
  <div v-if="isAdmin === true" id="admin-div">
    <i class="gg-crown"></i>
    <router-link
      id="admin-btn"
      :to="{ name: 'AdminPage', params: { id: userId } }"
      title="Lien vers la page admin"
      >Page Admin</router-link
    >
  </div>
  <router-view />
</template>

<script>
export default {
  name: "ButtonAdmin",
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
    if (auth === null || auth.isAdmin === false) {
      return this.$router.push({ path: "/home" }); //On redirige vers le login
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

#admin-div {
  display: flex;
  align-items: center;
  align-self: flex-end;
  flex-direction: column;
  margin-top: -2rem;
  transition: all 0.5s ease-out;

  #admin-btn,
  .gg-crown {
    font-size: 1rem;
    font-weight: 600;
    color: lighten($primary-color, 50%);
  }

  &:hover {
    .gg-crown {
      color: $secondary-color;
    }
    #admin-btn {
      color: $primary-color;
    }
    transform: scale(1.2);
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #admin-div .gg-crown {
    --ggs: 2;
  }

  #admin-div #admin-btn {
    font-size: 1.5rem;
  }
}
</style>