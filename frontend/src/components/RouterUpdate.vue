<template>
  <div v-if="userId === id" id="update-router">
    <!-- Pour modifier les profile-->
    <router-link
      id="update-link"
      :to="{ name: 'ProfileUpdate', params: { id: id } }"
      title="Lien pour update son profile"
    >
      Update
    </router-link>
    <i class="gg-user-add"></i>
  </div>
  <div v-if="commentUserId === null" id="update-router">
    <!-- Pour modifier les posts-->
    <router-link
      id="update-link"
      :to="{ name: 'PostUpdate', params: { id: id } }"
      title="Lien pour update son post "
    >
      Update
      <i class="gg-pen"></i>
    </router-link>
  </div>
  <div v-if="postUserId === null" id="update-router">
    <!-- Pour modifier les commentaires-->
    <router-link
      id="update-link"
      :to="{ name: 'CommentUpdate', params: { id: id } }"
      title="Lien pour update son commentaire"
    >
      Update
    </router-link>
    <i class="gg-pen"></i>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "RouterUpdate",
  props: ["id", "userId", "postUserId", "commentUserId"],
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#update-router {
  display: flex;
  align-items: center;
  width: 50%;
  transition: all 0.5s ease-out;

  .gg-user-add,
  .gg-pen,
  #update-link {
    margin-right: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: lighten($primary-color, 50%);
  }

  .gg-user-add,
  .gg-pen {
    opacity: 0;
    position: relative;
    transition: all 0.5s ease-out;
  }

  #update-link {
    display: flex;
    align-items: center;
  }

  .gg-user-add {
    top: 2rem;
    // left: -19rem;
  }

  .gg-pen {
    left: -4rem;
  }

  &:hover {
    cursor: pointer;
    .gg-user-add,
    .gg-pen {
      color: $secondary-color;
      opacity: 1;
    }
    #update-link {
      color: $primary-color;
    }
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #update-router {
    #update-link {
      font-size: 2rem;
    }

    .gg-user-add {
      --ggs: 2;
    }
  }
}
</style>