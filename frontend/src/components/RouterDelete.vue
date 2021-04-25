<template>
  <div id="delete-router">
    <i class="gg-user-remove"></i>
    <router-link
      id="delete-link"
      :to="{ name: 'ProfileDelete', params: { id: id } }"
      title="Lien pour supprimer son profil"
    >
      Suprimer
    </router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "RouterDelete",
  props: ["id"],
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#delete-router {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
  margin: 3rem 0 0 auto;
  transition: all 0.5s ease-out;

  .gg-user-remove,
  #delete-link {
    font-size: 1rem;
    font-weight: 600;
    color: lighten($primary-color, 50%);
  }
  .gg-user-remove {
    opacity: 0;
    position: relative;
    top: 2rem;
    margin-right: 1rem;
    transition: all 0.5s ease-out;
  }

  &:hover {
    .gg-user-remove {
      color: $secondary-color;
      top: 0rem;
      opacity: 1;
    }
    #delete-link {
      color: $primary-color;
    }
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #delete-router {
    #delete-link {
      font-size: 2rem;
    }

    .gg-user-remove {
      --ggs: 2;
    }
  }
}
</style>