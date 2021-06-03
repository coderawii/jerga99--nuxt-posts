<template>
  <div>
    <div @click="isOpenModal = true">
      <!-- //! ovaj Open btn u slot je default content u slucajy da #actionButton slot termplate zaboravimo da dodamo, ali ako dodamo taj template ono gazi ovu difoltnu vrednost u slotu tj Open btn u ovom slucaju. Zakomentarisi onaj template #actionButton u manage.vue i videces -->
      <slot name="actionButton">
        <button class="button is-primary">Open</button>
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
          <button @click="emitModalSubmit" class="button is-success">
            Save changes
          </button>
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
  },
  methods: {
    emitModalSubmit() {
      this.$emit("modalSubmitted", {
        closeModal: this.closeModal,
        data:
          "just some data iz Modal.vue ka parentu PostCreate.vue koji tamo prikupimo kao argument f-ji"
      }); //* ovo drugo je just some value iz Modal.vue ka parentu PostCreate.vue koji tamo prikupimo kao argument f-ji
      // this.$emit("modalSubmitted");
      // this.closeModal(); //! moze i ovako, al on je pre zaono bas nakon dispatch-a u PostCreate, da se tad zatvori modal. WISE !!!
    },
    closeModal() {
      this.isOpenModal = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
