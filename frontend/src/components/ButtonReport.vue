<template>
  <div id="report-div">
    <button
      id="report-btn"
      @click="report"
      title="Bouton pour signaler l'utilisateur"
    >
      <i class="gg-block"></i>
      Signaler
    </button>
    <p id="report-text">{{ reportMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "ButtonReport",
  props: ["id", "reportMessage"],
  methods: {
    report() {
      this.$emit("report");
    },
  },
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#report-div {
  display: flex;
  align-items: center;
  position: relative;

  .gg-block,
  #report-btn {
    font-size: 1rem;
    font-weight: 600;
    color: $third-color;
    background-color: transparent;
  }
  #report-btn {
    display: flex;
    align-items: center;
    border: none;
    width: 100%;
    height: 100%;

    &:focus {
      outline: none;
      border: none;

      .gg-block {
        transform: rotate(-180deg);
      }
    }
  }
  .gg-block {
    opacity: 0;
    position: relative;
    right: 8rem;
    transition: all 0.5s ease-out;
  }

  &:hover {
    .gg-block {
      color: $secondary-color;
      top: 0rem;
      opacity: 1;
      transform: rotate(180deg);
    }
    #report-btn {
      color: $primary-color;
      cursor: pointer;
    }
  }

  #report-text {
    position: relative;
  }
}

//Media queries
@media screen and (min-width: 2000px) {
  #report-div {
    .gg-block {
      --ggs: 2;
    }

    #report-btn {
      font-size: 2rem;
    }

    &:hover {
      .gg-block {
        top: 0.5rem;
      }
    }
  }
}
</style>