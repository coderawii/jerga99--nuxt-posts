<template>
  <div>
    <div class="blogs-page">
      <div class="main-content">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-2">
              <div class="section">
                <div class="title">
                  <h1>Detail View</h1>
                  <hr />
                </div>
                <div class="post-content">
                  <h1 class="title">{{ POST.title }}</h1>
                  <h2 class="subtitle">{{ POST.subtitle }}</h2>
                  <div class="markdown">
                    <label for="" class="label">Content Preview</label>
                    <div v-html="compiledMarkdown"></div>
                    <div></div>
                  </div>
                </div>
              </div>
              <!-- end of post -->
            </div>
            <!-- end of side bar -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    POST() {
      return this.$store.state.post.postItem;
    },
    compiledMarkdown() {
      if (process.client) return marked(this.POST.content, { sanitize: true });
      return "";
    }
  },
  fetch({ params, store }) {
    return store.dispatch("post/fetchPostByID", params.id);
  }
};
</script>

<style lang="scss" scoped></style>
