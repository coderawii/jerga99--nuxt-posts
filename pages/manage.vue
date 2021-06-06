<template>
  <div>
    <navbar />

    <div class="manage-page">
      <div class="columns mail-app">
        <aside class="column is-2 aside hero">
          <PostCreate />
        </aside>

        <div class="column is-4 messages hero is-fullheight" id="message-feed">
          <div
            v-if="posts && posts.length > 0"
            class="inbox-messages"
            id="inbox-messages"
          >
            <!-- CARD STARTS -->
            <!-- <card v-for="post in posts" :key="post.id" /> -->
            <div
              v-for="post in posts"
              :key="post.id"
              @click="activatePost(post)"
              class="card"
              :class="{
                'is-active': activePost && post._id === activePost._id
              }"
            >
              <div class="card-content">
                <div class="msg-header">
                  <span class="msg-from"><small>From Filip Jerga</small></span>
                  <span class="msg-timestamp"></span>
                  <span class="msg-attachment"
                    ><i class="fa fa-paperclip"></i
                  ></span>
                </div>
                <div class="msg-subject">
                  <span class="msg-subject"
                    ><strong id="fake-subject-1">{{ post.title }}</strong></span
                  >
                </div>
                <div class="msg-snippet">
                  <p id="fake-snippet-1">{{ post.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="inbox-messages no-posts-title">
            There are no posts :(
          </div>
        </div>
        <div class="column is-6 message hero is-fullheight" id="message-pane">
          <div v-if="activePost" class="box message-preview">
            <button @click="deletePost" class="button is-danger delete-button">
              Delete
            </button>

            <PostManage :postData="activePost" />
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            <p>
              <strong>Bulma Templates</strong> by
              <a href="https://github.com/dansup">Daniel Supernault</a>. The
              source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            </p>
            <p>
              <a class="icon" href="https://github.com/dansup/bulma-templates">
                <i class="fa fa-github"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  data() {
    return {
      activePost: null
    };
  },

  computed: {
    // ...mapState(["posts"]),
    posts() {
      return this.$store.state.post.postItems;
    }
  },

  fetch({ store }) {
    if (store.state.post.postItems.length === 0) {
      return store.dispatch("post/fetchPosts");
    }

    return store.dispatch("post/fetchPosts");
  },

  created() {
    this.setInitialActivePost();
  },

  methods: {
    activatePost(post) {
      this.activePost = post;
    },
    setInitialActivePost() {
      if (this.posts && this.posts.length > 0) this.activePost = this.posts[0];
      else this.activePost = null;
    },
    deletePost() {
      // debugger;
      if (this.activePost) {
        this.$store
          .dispatch("post/deletePost", this.activePost._id)
          .then(() => {
            // debugger;

            this.setInitialActivePost();
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.manage-page {
  padding: 30px !important;
}

.card {
  margin-bottom: 10px;
  cursor: pointer;

  &:hover,
  &.is-active {
    background-color: #eeeeee;
  }
}

.no-posts-title {
  font-size: 30px;
}

.delete-button {
  display: block;
  width: 100px;
  margin-left: auto;
  margin-right: 0;
}
</style>
