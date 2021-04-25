<template>
  <NavHome />
  <main>
    <section>
      <h2 :id="$style.tiltle">Page introuvable</h2>
      <p :id="$style.error">
        Visiblement une erreur est survenue ou alors la page demandée n'existe
        plus.
      </p>
      <p>Retour à <router-link to="/home">l'accueil.</router-link></p>
      <router-view />
    </section>
  </main>
</template>

<script>
import NavHome from "@/components/NavHome.vue";

export default {
  name: "NotFound",
  components: {
    NavHome,
  },
  data() {
    return {
      auth: "",
    };
  },
  created() {
    //On recupère notre token
    const storage = localStorage.getItem("user");
    const auth = JSON.parse(storage);
    if (auth === null) {
      this.$router.push({ path: "/" }); //On redirige vers le login
    }
  },
};
</script>

<style lang="scss" module>
//Variables
@import "../assets/utils/_variables.scss";

#error {
  background-color: $background-color;
}
</style>
