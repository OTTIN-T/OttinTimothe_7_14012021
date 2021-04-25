<template>
  <div id="comment-div">
    <span id="name-comment">
      <router-link
        id="nav-user"
        :to="{ name: 'ProfilePage', params: { id: UserId } }"
        title="Lien vers le profil de l'utilisateur"
      >
        De: {{ userName }} <i class="gg-user"></i></router-link
    ></span>

    <div class="like-comment">
      <p>Tendance:</p>
      <span class="like" v-if="like >= 1">
        <i class="gg-smile-mouth-open"></i>{{ like }}
      </span>
      <span class="like" v-else-if="like <= -1">
        <i class="gg-smile-no-mouth"></i>{{ like }}
      </span>
      <span class="like" v-else> <i class="gg-smile-neutral"></i>0 </span>
    </div>
    <slot></slot>

    <p id="text-comment">{{ comment }}</p>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["userName", "comment", "like", "UserId"],
};
</script>
<style lang="scss">
//Variables
@import "../assets/utils/_variables.scss";

#comment-div {
  background-color: $background-color;
  padding: 0rem 1rem;
  margin: 1rem 0 1rem 0;
  border-radius: 1.5rem;
  transition: all 0.5s ease-out;
  height: auto;

  #name-comment {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25rem;
    margin: 0 auto;
    padding-top: 1rem;

    .gg-user,
    #nav-user {
      color: $third-color;
      transition: all 0.5s ease-out;
    }

    .gg-user {
      font-size: 1rem;
      font-weight: 600;
      opacity: 0;
      position: relative;
      top: 3rem;
      left: 1rem;
    }

    #nav-user {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 10%;
      word-break: break-all;
    }
    &:hover {
      cursor: pointer;
      #nav-user,
      .gg-user {
        color: $primary-color;
      }
      .gg-user {
        color: $secondary-color;
        top: 0rem;
        opacity: 1;
      }
    }
  }

  #text-comment {
    position: relative;
    // bottom: 3rem;
    width: 53%;
    margin: 0rem auto;
    text-align: justify;
    word-break: break-all;
    bottom: 4rem;
  }

  .like-comment {
    display: flex;
    flex-direction: row;
    position: relative;
    top: 2rem;

    .like {
      display: flex;
      flex-direction: row;
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

  #like-div {
    top: 2rem;
    left: 1rem;
    width: 2rem;
    height: 2rem;

    .gg-smile {
      --ggs: 1.5;
    }
  }

  #dislike-div {
    bottom: 0rem;
    left: 4rem;
    width: 2rem;
    height: 2rem;

    .gg-smile-sad {
      --ggs: 1.5;
    }
  }

  #delete-div {
    position: relative;
    width: 30%;
    margin: 0 0 0 auto;
    top: 1.5rem;

    .gg-trash {
      left: 6rem;
    }

    #delete-btn {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border: none;
      width: 100%;
      height: 100%;
    }
  }
  #report-div {
    top: -6rem;
    right: 1rem;
    width: 49%;
    font-weight: 500;

    .gg-block {
      left: 5.5rem;
    }

    #report-text {
      width: 100%;
      left: -3rem;
    }
  }

  #update-router {
    width: 30%;
    position: relative;
    transition: all 0.5s ease-out;

    .gg-pen {
      left: 0rem;
    }
  }
}
</style>