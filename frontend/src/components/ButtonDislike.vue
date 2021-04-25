<template>
  <div id="dislike-div">
    <button id="dislike-btn" @click="dislike(id)" title="Bouton pour dislike">
      <i class="gg-smile-sad"></i>
    </button>
    <p>{{ dislikeMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "ButtonDislike",
  props: ["id", "dislikeMessage"],
  methods: {
    dislike() {
      this.$emit("dislike");
    },
  },
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#dislike-div {
  position: relative;

  &:focus {
    outline: none;
    border: none;
  }

  #dislike-btn,
  .gg-smile-sad {
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
  #dislike-btn {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }

  &:hover {
    .gg-smile-sad {
      color: $primary-color;
    }
  }
}

//Media queries
@media screen and (min-width: 2000px) {
  #dislike-div {
    #dislike-btn {
      font-size: 2rem;

      .gg-smile-sad {
        --ggs: 2;
      }
    }
  }
}
</style>