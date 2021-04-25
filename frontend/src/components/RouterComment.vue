<template>
  <div id="comment-router">
    <router-link
      id="comment-link"
      :to="{ name: 'CommentCreate', params: { id: id } }"
      title="Lien pour répondre à un post"
    >
      <i class="gg-mail-reply"></i> Répondre
    </router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "RouterComment",
  props: ["id"],
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#comment-router {
  position: relative;
  bottom: 12rem;
  width: 30%;
  height: 6rem;
  margin: 0 0 0 auto;

  &:focus {
    outline: none;
    border: none;
  }

  #comment-link,
  .gg-mail-reply {
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: $third-color;
    transition: all 0.3s ease-out;

    &:focus {
      outline: none;
      border: none;
    }

    &:hover {
      .gg-mail-reply {
        top: 0rem;
        opacity: 1;
        color: $secondary-color;
      }
    }
  }

  #comment-link {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    margin: 0 0 0 auto;
  }
  .gg-mail-reply {
    right: 0.5rem;
    top: 2rem;
    opacity: 0;
  }
}

//Media queries
@media screen and (min-width: 2000px) {
  #comment-router {
    #comment-link {
      font-size: 2rem;

      .gg-mail-reply {
        --ggs: 2;
        top: 0.5rem;
      }
    }
  }
}
</style>