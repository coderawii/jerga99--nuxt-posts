<template>
  <div>
    <div @click="isOpenModal = true">
      <!-- //! ovaj Open btn u slot je default content u slucajy da #actionButton slot termplate zaboravimo da dodamo, ali ako dodamo taj template ono gazi ovu difoltnu vrednost u slotu tj Open btn u ovom slucaju. Zakomentarisi onaj template #actionButton u manage.vue i videces -->
      <slot name="actionButton"
        ><button class="button is-primary">Open</button>
      </slot>
      <!-- <a class="button is-danger is-block is-bold">
        <span class="compose">Create</span>
      </a> -->
    </div>
    <!-- //* Toggle Class Here -->
    <div class="modal" :class="{ 'is-active': isOpenModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <!-- //* Close Modal Here -->
          <button
            @click="isOpenModal = false"
            class="delete"
            aria-label="close"
          ></button>
        </header>

        <!-- //! SLOT BRATE -->
        <section class="modal-card-body">
          <slot></slot>
        </section>

        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <!-- //* Close Modal -->
          <button @click="isOpenModal = false" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpenModal: false
    };
  }
};
</script>

<style lang="scss" scoped></style>
