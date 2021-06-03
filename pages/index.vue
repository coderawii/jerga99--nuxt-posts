<template>
  <div>
    <!-- Navbar -->
    <navbar />
    <!-- {{ nekaStvarFetchovanaNaServeru }} -->
    <div class="blogs-page">
      <div class="main-content">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-2">
              <div class="section">
                <div class="title">
                  <h1>Newest Posts</h1>
                  <hr />
                </div>
                <!-- Post -->
                <p v-if="!POSTS.length">Loading posts...</p>
                <post-item
                  v-for="post in POSTS"
                  :key="post.id"
                  :title="post.title"
                  :subtitle="post.subtitle"
                  :isRead="post.isRead"
                />
              </div>
              <!-- end of posts -->
            </div>
            <!-- end of side bar -->
          </div>
        </div>
      </div>

      <!-- <form>
        <input type="text" v-model="form.title" />
        <input type="text" v-model="form.subtitle" />
      </form>
      {{ isFormValid() }} -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { fetchPostsAPI } from "~/store/post";

export default {
  data() {
    return {
      form: {
        title: "form title",
        subtitle: "form subtitle"
      }
    };
  },
  //? The fetch method is used to fill the store before rendering the page, it's like the asyncData method except it doesn't set the component data. The fetch method, if set, is called every time before loading the component (only for page components).
  //? https://morioh.com/p/289c1f5b44ee

  //* I nacin
  fetch({ store }) {
    if (store.getters["post/hasEmptyItems"]) {
      return store.dispatch("post/fetchPosts");
    }
  },
  //* II nacin
  // async fetch({ store }) {
  //   await store.dispatch("post/fetchPosts");
  // },
  //* III nacin
  // async asyncData() {
  //   const POSTS = await fetchPostsAPI(); //* ovo je Promise, dakle vraca resolve, dakle moramo await
  //   // return {
  //   //   POSTS,
  //   //   nekaStvarFetchovanaNaServeru: "Neka stvar fetchovana na serveru"
  //   // };
  //   return { POSTS };
  // },
  //! Lexical function
  // mounted() {
  //   this.$store.dispatch("post/fetchPosts").then(posts => {
  //     console.log(posts);
  //   });
  // },
  computed: {
    //* I nacin
    // ...mapState(["posts"]),

    //* II nacin
    // ...mapState({
    //   POSTS: "posts"
    // })
    //* III nacin
    // ...mapState({
    // POSTS: state => state.posts
    // })
    //* IV nacin
    POSTS() {
      // return this.$store.state.postItems;
      return this.$store.state.post.postItems; //! sad mora post.posts jer smo kreirali post.js fajl odn kor sad taj namespace kao
    }
  },
  methods: {
    isFormValid() {
      console.log("isFormValuid has been called");
      if (this.form.title) return true;
      return false;
    }
  }
};
</script>
<style></style>
