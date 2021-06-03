<template>
  <form class="post-form">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Awesome Title"
          v-model="post.title"
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
          v-model="post.subtitle"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Awesome Content"
          v-model="post.content"
        ></textarea>
      </div>
    </div>
    <button class="button is-primary">Update</button>
  </form>
</template>

<script>
export default {
  props: ["postData"], //! zasto nismo direktno upisali gore u input u v-model obo postData iz props? jer necemo da mutiramo podatak iz parenta, vec cemo napraviti kopije istog tj pravimo promenljivu post: this.postData
  data() {
    //! i ovo sad ne radi jer se ovo ovde desi SAMO JEDNOM tj kada se kreira komponenta, i bas ga briga sto si ti u manage.vue kliktao na razl cards tj posts, on povuce vrednost samo jednom prilikom kreiranja komponente i ne haje. zato ovo ne treba raditi sa data() vec sa WATCHERS
    return {
      post: { ...this.postData } //* opet pravimo kopiju da ne mutiramo original
    };
  },
  watch: {
    //* mogu da pratim svoje podatke, i takodje mogu da posmatram props tj postData tj promene u istom!!
    postData(newValue, oldValue) {
      //* kada god se apdejtuje postData props voleli bismo da se runnuje ova postData f-ja tj watcher
      //   debugger;
      this.post = { ...newValue };
    }
  }
};
</script>

<style lang="scss" scoped></style>
