<template>
  <div class="post">
    <div class="post-content">
      <a class="post-header post-header-link clickable">
        <h4 class="title is-4">{{ title }}</h4>
        <h5 class="subtitle is-5">{{ subtitle }}</h5>
      </a>
      <div class="post-footer">
        <!-- by Filip Jerga, {{ date | formatDate("LLLL") }} -->
        by Filip Jerga, <strong>{{ date | formatDate }}</strong>
      </div>
    </div>

    <div class="post-right">
      <label class="checkbox">
        <input type="checkbox" :checked="isRead" />
        Read
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    date: {
      type: Number,
      required: false,
      default: () => new Date().getDate() // default po novom nuxt-u mora biti factory function
    },
    isRead: {
      type: Boolean,
      required: false
    }
  },
  // props: ["title", "subtitle", "date"]
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.post {
  margin-bottom: 20px;
  padding: 5px;
  border-bottom: 2px solid transparent;
  display: flex;
  flex-direction: row;

  &-content {
    flex: 1;
  }
  &-right {
    float: right;
    justify-content: flex-end;
    align-self: center;
  }

  &:hover {
    border-bottom: 2px solid #e8e8e8;
  }
  &-footer {
    font-style: italic;
  }
}
</style>
