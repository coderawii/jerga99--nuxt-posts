<template>
  <div>
    <navbar />

    <div class="manage-page">
      <div class="columns mail-app">
        <aside class="column is-2 aside hero">
          <PostCreate />
        </aside>

        <div class="column is-4 messages hero is-fullheight" id="message-feed">
          <div class="inbox-messages" id="inbox-messages">
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
        </div>
        <div class="column is-6 message hero is-fullheight" id="message-pane">
          <div class="box message-preview">
            <PostManage :postData="activePost" />

            <div class="top"></div>
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
      activePost: {}
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
      console.log("fetching data in manage page");
    }

    return store.dispatch("post/fetchPosts");
  },

  created() {
    if (this.posts && this.posts.length > 0) this.activePost = this.posts[0];
  },

  methods: {
    activatePost(post) {
      this.activePost = post;
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
</style>
