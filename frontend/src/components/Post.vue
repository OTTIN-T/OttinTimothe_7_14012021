<template>
  <!-- Affichage page home -->
  <article v-if="this.$route.params.id === undefined" id="post">
    <router-link :to="{ name: 'PostUnique', params: { id: id } }">
      <h3 class="title">{{ title }}</h3>

      <router-link
        id="nav-user"
        :to="{ name: 'ProfilePage', params: { id: UserId } }"
        title="Lien vers le profil de l'utilisateur"
      >
        De: {{ userName }} <i class="gg-user"></i
      ></router-link>
      <p class="message">{{ message }}</p>
      <div class="link-div">
        <span class="link" v-if="link === ''"></span>
        <span class="link" v-else-if="link != undefined">
          <i class="gg-link"></i>
          <a :href="link" class="link-out">: {{ link }}</a>
          <!-- <i class="gg-link"></i>: {{ link }} -->
        </span>
      </div>
      <div class="date-div">
        <span class="createdAt" v-if="updatedAt === createdAt"
          >Posté le: {{ formatCreateDate }}</span
        >
        <span class="updateAt" v-else>Modifié le: {{ formatUpdateDate }}</span>
      </div>
      <div class="utils-div">
        <h3 id="utils-title">Donne ton avis:</h3>
        <div class="count-like-div">
          <p>Tendance:</p>
          <span class="like" v-if="like >= 1">
            <i class="gg-smile-mouth-open"></i>{{ like }}
          </span>
          <span class="like" v-else-if="like <= -1">
            <i class="gg-smile-no-mouth"></i>{{ like }}
          </span>
          <span class="like" v-else> <i class="gg-smile-neutral"></i>0 </span>
        </div>
        <div id="comment-post-div" v-if="comment >= 1">
          <button
            id="show-comment-btn"
            title="Bouton pour afficher les commentaires"
          >
            <i class="gg-comment"></i>
            Commentaires: {{ comment }}
          </button>
        </div>
        <div id="comment-post-div" v-else>
          <span id="no-comment-btn">
            <i class="gg-comment"></i>Pas de commentaire
          </span>
        </div>
      </div>
    </router-link>
    <!-- Slot pour afficher nos boutons -->
    <slot></slot>
    <router-view />
  </article>

  <!-- Affichage page post unique -->
  <article v-else id="post">
    <!-- On récupère notre id -->
    <h3 class="title">{{ title }}</h3>
    <p class="message">
      {{ message }}
    </p>
    <div class="link-div">
      <span class="link" v-if="link === ''"></span>
      <span class="link" v-else-if="link != undefined">
        <i class="gg-link"></i><a :href="link" class="link-out">: {{ link }}</a>
        <!-- <i class="gg-link"></i>: {{ link }} -->
      </span>
    </div>
    <div class="date-div">
      <span class="createdAt" v-if="updatedAt === createdAt"
        >Posté le: {{ createdAt }}</span
      >
      <span class="updateAt" v-else>Modifié le: {{ updatedAt }}</span>
    </div>
    <div class="utils-div">
      <h3 id="utils-title">Donne ton avis:</h3>
      <div class="count-like-div">
        <p>Tendance:</p>
        <span class="like" v-if="like >= 1">
          <i class="gg-smile-mouth-open"></i>{{ like }}
        </span>
        <span class="like" v-else-if="like <= -1">
          <i class="gg-smile-no-mouth"></i>{{ like }}
        </span>
        <span class="like" v-else> <i class="gg-smile-neutral"></i>0 </span>
      </div>
      <div id="comment-post-div" v-if="comment >= 1">
        <button
          id="show-comment-btn"
          @click="showComment()"
          title="Bouton pour afficher les commentaires"
        >
          <i class="gg-comment"></i>
          Commentaires: {{ comment }}
        </button>
      </div>
      <div id="comment-post-div" v-else>
        <span id="no-comment-btn">
          <i class="gg-comment"></i>Pas de commentaire
        </span>
      </div>
    </div>
    <!-- Slot pour afficher nos boutons -->
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: "Post",
  props: [
    "title",
    "id",
    "index",
    "userName",
    "message",
    "link",
    "like",
    "comment",
    "createdAt",
    "updatedAt",
    "UserId",
  ],
  computed: {
    formatCreateDate() {
      const dateArray = Array.from(this.createdAt); //Transforme notre string en array
      dateArray.splice(10, 1); //Supprime l'index 10 (le T)
      dateArray.splice(15, 8); //Supprime les secondes

      const date = dateArray.slice(0, 10); //Sépare en 2 notre tableau
      const hour = dateArray.slice(10);

      const dateJoin = date.join(""); //Join notre string
      const dateSplit = dateJoin.split("-", 3); //Sépare "YYYY" "MM" "DD"
      dateSplit.reverse(); //Reverse notre resultat pour obtenir "DD MM YYY"

      return dateSplit.join("/") + " à " + hour.join(""); //On retourne nos tableaux join
    },
    formatUpdateDate() {
      const dateArray = Array.from(this.updatedAt);
      dateArray.splice(10, 1);
      dateArray.splice(15, 8);

      const date = dateArray.slice(0, 10);
      const hour = dateArray.slice(10);

      const dateJoin = date.join("");
      const dateSplit = dateJoin.split("-", 3);
      dateSplit.reverse();

      return dateSplit.join("/") + " à " + hour.join("");
    },
  },
  methods: {
    showComment() {
      //Affiche ou masque les commentaires
      const $commentDiv = document.querySelector(".inactive");
      if ($commentDiv === null) {
        const $commentDiv = document.querySelector(".active");
        $commentDiv.classList.remove("active");
        return $commentDiv.classList.add("inactive");
      }
      $commentDiv.classList.remove("inactive");
      $commentDiv.classList.add("active");
    },
  },
};
</script>

<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#post {
  width: 45rem;
  height: auto;
  margin: 3rem auto 1rem auto;
  padding: 1rem;
  border-radius: 1.5rem;
  transition: all 0.5s ease-out;

  .title,
  .message {
    word-break: break-all;
    margin: 0.5rem auto;
    width: 40rem;
  }

  #nav-user,
  .gg-user {
    color: $third-color;
    transition: all 0.5s ease-out;
    word-break: break-all;
  }

  #nav-user {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;

    &:hover {
      cursor: pointer;
      color: $primary-color;

      .gg-user {
        color: $secondary-color;
        top: 0rem;
        opacity: 1;
      }
    }
  }

  .gg-user {
    opacity: 0;
    position: relative;
    top: 3rem;
    left: 1rem;
  }

  .message {
    text-align: justify;
    height: auto;
    margin: 2rem auto;
  }

  .link-div {
    position: relative;
    top: 0.5rem;

    .link {
      word-break: break-all;
      margin: 3.5rem auto;
      width: 100%;
      display: flex;

      .gg-link {
        top: 0.5rem;
        display: flex;
        align-self: baseline;
      }

      .link-out {
        height: auto;
        margin-left: 0.5rem;

        &:after {
          display: block;
          content: "";
          border-bottom: solid 0.15rem $secondary-color;
          transform: scaleX(0);
          transform-origin: 100% 50%;
          transition: transform 250ms ease-in-out;
        }
        &:hover:after {
          transform: scaleX(1);
          transform-origin: 0% 50%;
        }
      }
    }
  }

  .date-div {
    display: flex;
    position: relative;
    top: 1rem;
    margin-top: 2rem;
    top: -1rem;

    .updateAt {
      color: $third-color;
    }
  }

  .utils-div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1.5rem;

    .count-like-div {
      display: flex;
      align-self: center;
      // margin-top: -1.3rem;
      margin-top: -0.5rem;

      .like {
        display: flex;
        align-items: center;
        margin-left: 1.5rem;

        .gg-smile-mouth-open,
        .gg-smile-no-mouth,
        .gg-smile-neutral {
          left: -1rem;
          top: -0.1rem;
        }

        .gg-smile-mouth-open {
          color: $secondary-color;
        }

        .gg-smile-no-mouth {
          color: $primary-color;
        }

        .gg-smile-neutral {
          color: $third-color;
        }
      }
    }

    #comment-post-div {
      display: flex;
      align-self: center;
      width: 28rem;
      height: 7rem;
      position: relative;
      top: 3.5rem;

      #show-comment-btn,
      #no-comment-btn,
      .gg-comment {
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

      #show-comment-btn,
      #no-comment-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border: none;
        background-color: transparent;
      }

      .gg-comment {
        right: 1rem;
      }

      &:hover {
        #show-comment-btn {
          color: $primary-color;
        }
        .gg-comment {
          color: $secondary-color;
        }
      }
    }
  }
}

// Media queries
@media screen and (min-width: 2000px) {
  #post {
    width: 50rem;

    .title,
    .message {
      margin: 1.5rem auto;
    }

    .link-div {
      margin-bottom: 2rem;

      .gg-link {
        --ggs: 1.5;
      }

      .link .link-out {
        margin-left: 0.8rem;
      }
    }

    .date-div {
      top: -0.8rem;
    }

    .utils-div {
      margin-top: -0.5rem;

      #comment-post-div {
        #show-comment-btn,
        #no-comment-btn {
          font-size: 1.5rem;
        }
      }
    }
  }
}

@media screen and (max-width: 1500px) {
  #post {
    width: 40rem;
    padding: 0.5rem;

    #nav-user {
      width: 85%;
      margin: 0 auto;
    }

    .title,
    .message {
      width: 90%;
    }

    .title {
      height: auto;
    }

    .message {
      margin-bottom: 2rem;
      width: 85%;
    }

    .date-div {
      top: -1rem;
    }
  }
}

@media screen and (max-width: 1000px) {
  #post {
    width: 75%;
    box-shadow: 0 0 0 0.1rem grey;

    .link-div {
      .link {
        .link-out {
          &:hover:after {
            transform: scaleX(0);
          }
        }
      }
    }

    .utils-div {
      #utils-title {
        align-self: center;
      }

      .count-like-div {
        margin-top: 0.5rem;
      }

      #comment-post-div {
        width: 14rem;
        height: 3rem;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  #post {
    width: 95%;

    .title,
    .message {
      width: 17rem;
    }

    .link-div {
      top: -0.5rem;

      .link .gg-link {
        bottom: 0.5rem;
      }
    }
  }
}
</style>
