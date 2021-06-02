<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="../">
          <img
            src="http://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
          />
        </a>
        <div
          @click="toggleIsActive"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        id="navMenu"
        class="navbar-menu"
        @click="toggleIsActive"
        :class="{ 'is-active': isActive }"
      >
        <div class="navbar-end">
          <div
            :class="{ 'is-active': isActive }"
            class="navbar-item has-dropdown"
          >
            <a class="navbar-link">
              Menu
            </a>
            <div class="navbar-dropdown">
              <nuxt-link to="/" class="navbar-item">
                Home
              </nuxt-link>
              <nuxt-link to="/manage" class="navbar-item">
                Manage
              </nuxt-link>
              <!-- <div @click="navigateTo('/manage')" class="navbar-item">
                Manage
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    toggleIsActive() {
      this.isActive = !this.isActive;
    }
  }
};
</script>

<style></style>
