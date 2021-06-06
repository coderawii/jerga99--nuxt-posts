<template>
  <SharedModal @modalSubmitted="createPost">
    <!-- //* Ovo je parent component of Modal.vue component, dakle zelimo da emitujemo event IZ Modal.vue (child-a) u PostCreate.vue (parent). Dakle kreiramo event u Modal.vue i catchujemo ga u PostCreate.vue. Kad saljemo podatke iz parenta u child onda koristimo PROPS, a kada saljemo iz child-a u parent onda koristimo EVENTs, kao sto je ovde slucaj -->
    <!-- //! ovo mu popunjava onaj <slot></slot> u Modal.vue. ISKORISTITI ZA VEGANIFY -->
    <template #actionButton>
      <a class="button is-danger is-block is-bold">
        <span class="compose">Create</span>
      </a>
    </template>
    <!-- //? ovo je default content za Modal.vue -->
    <form class="post-form">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Awesome Title"
            v-model="form.title"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Subtitle</label>
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="Awesome subtitle"
            v-model="form.subtitle"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Awesome Content"
            v-model="form.content"
          ></textarea>
        </div>
      </div>

      <div class="markdown">
        <label for="" class="label">Content Preview</label>
        <div v-html="compiledMarkdown"></div>
      </div>
    </form>
  </SharedModal>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        subtitle: "",
        content: ""
      }
    };
  },
  computed: {
    compiledMarkdown() {
      if (process.client) return marked(this.form.content, { sanitize: true });
      return "";
    }
  },
  methods: {
    createPost({ closeModal, data }) {
      console.log(data);
      this.$store.dispatch("post/createPost", { ...this.form }); //! saljemo KOPIJU ovog this.form objekta, a ne bas taj objekt, jer se javlja error [vuex] don not mutate vuex store state outside mutation handlers!!!!, dakle ne mozemo da saljemo this.form (jer posle u resetu zapravo resetujemo formu koja je sada deo vuex store-a jer su form podaci pushed u state i onda kada resetujemo mi pokusavamo da mutate (menjamo) state van vuex handlera, a to (vuex store se edituje samo unutar vuex-a) se radi samo unutar vuex-a) vec { ...this.form }
      closeModal();
      this.resetForm();
    },

    resetForm() {
      this.form.title = "";
      this.form.subtitle = "";
      this.form.content = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
