<template>
  <div></div>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
//Import sass
@import "./assets/utils/_icon.scss";
@import "./assets/utils/_font.scss";
@import "./assets/utils/_variables.scss";

* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration: none;
  color: $primary-color;
  scroll-behavior: smooth;
}

body {
  background-color: $background-color;
}

#app {
  font-family: "Work Sans", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  h1 {
    font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
  }

  h2,
  h3,
  h4,
  h5 {
    font-family: "Rambla", Avenir, Helvetica, Arial, sans-serif;
  }
}
</style>
