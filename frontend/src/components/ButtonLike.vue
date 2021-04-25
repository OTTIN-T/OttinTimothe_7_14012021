<template>
  <div id="like-div">
    <button id="like-btn" @click="like(id)" title="Bouton pour like">
      <i class="gg-smile"></i>
    </button>
    <p>{{ likeMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "ButtonLike",
  props: ["id", "likeMessage"],
  methods: {
    like() {
      this.$emit("like");
    },
  },
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#like-div {
  position: relative;

  #like-btn,
  .gg-smile {
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: $third-color;
    transition: all 0.3s ease-out;

    &:focus {
      outline: none;
      border: none;
    }
  }
  #like-btn {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }

  &:hover {
    .gg-smile {
      color: $secondary-color;
    }
  }
}

//Media queries
@media screen and (min-width: 2000px) {
  #like-div {
    #like-btn {
      font-size: 2rem;

      .gg-smile {
        --ggs: 2;
        top: 0.5rem;
      }
    }
  }
}
</style>