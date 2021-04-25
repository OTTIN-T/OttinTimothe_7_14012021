<template>
  <footer>
    <section id="footer-profile">
      <a
        id="mail-contact"
        href="mailto:test@test.com"
        title="Lien vers l'email d'aide"
        >Un problème ?</a
      >
    </section>
  </footer>
</template>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#footer-profile {
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 1rem auto 0 auto;

  #mail-contact {
    display: flex;
    justify-content: flex-end;
    font-size: 1rem;
    font-weight: 600;
    margin: 1rem 0 0 auto;
    color: lighten($primary-color, 50%);
    transition: all 0.5s ease-out;

    &:hover {
      transform: scale(1.1);
      color: $primary-color;
    }
  }
}

@media screen and (min-width: 2000px) {
  #footer-profile {
    width: 45rem;
    margin-top: 4rem;

    #mail-contact {
      font-size: 2rem;
    }
  }
}

@media screen and (max-width: 500px) {
  #footer-profile {
    width: 19rem;
  }
}
</style>