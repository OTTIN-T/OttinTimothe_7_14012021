<template>
  <div id="delete-div">
    <i class="gg-trash"></i>
    <button id="delete-btn" @click="deleteButton">{{ action }}</button>
  </div>
</template>

<script>
export default {
  name: "ButtonDelete",
  props: ["action"],
  methods: {
    deleteButton() {
      this.$emit("deleteButton");
    },
  },
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#delete-div {
  display: flex;
  align-self: flex-end;
  justify-content: center;
  position: relative;

  .gg-trash,
  #delete-btn {
    font-size: 1rem;
    font-weight: 600;
    color: $third-color;
    background-color: transparent;
  }
  #delete-btn {
    display: flex;
    align-items: center;
    border: none;
    width: 100%;
    height: 100%;

    &:focus {
      outline: none;
      border: none;
    }
  }
  .gg-trash {
    opacity: 0;
    position: relative;
    transition: all 0.5s ease-out;
  }

  &:hover {
    .gg-trash {
      color: $secondary-color;
      top: 0rem;
      opacity: 1;
    }
    #delete-btn {
      color: $primary-color;
      cursor: pointer;
    }
  }
}

//Media queries
@media screen and (min-width: 2000px) {
  #delete-div {
    .gg-trash {
      --ggs: 2;
    }

    #delete-btn {
      font-size: 2rem;
    }

    &:hover {
      .gg-trash {
        top: 0.5rem;
      }
    }
  }
}
</style>