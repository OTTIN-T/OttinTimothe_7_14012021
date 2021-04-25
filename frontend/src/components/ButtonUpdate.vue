<template>
  <div id="update-div">
    <i class="gg-pen"></i>
    <button id="update-btn" @click="update">Modifier</button>
  </div>
</template>

<script>
export default {
  name: "ButtonUpdate",
  methods: {
    update() {
      this.$emit("update");
    },
  },
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#update-div,
#post-opacity-btn,
#delete-opacity-btn,
#comment-update-opacity-btn {
  display: flex;
  align-self: flex-end;
  justify-content: center;
  margin-top: 3rem;

  .gg-pen,
  #update-btn {
    font-size: 1rem;
    font-weight: 600;
    color: $third-color;
    background-color: $background-color;
  }
  #update-btn {
    border: none;
    &:focus {
      outline: none;
      border: none;
    }
  }
  .gg-pen {
    opacity: 0;
    position: relative;
    top: 2rem;
    margin-right: 1rem;
    transition: all 0.5s ease-out;
  }

  &:hover {
    #update-btn {
      cursor: pointer;
      color: $primary-color;
    }
    .gg-pen {
      color: $secondary-color;
      top: 0.2rem;
      opacity: 1;
    }
  }
}

//Media queries
@media screen and (min-width: 2000px) {
  #update-div,
  #post-opacity-btn,
  #delete-opacity-btn,
  #comment-update-opacity-btn {
    .gg-pen {
      --ggs: 2;
    }

    #update-btn {
      font-size: 2rem;
    }

    &:hover {
      .gg-pen {
        top: 0.5rem;
      }
    }
  }
}
</style>