import INITIAL_DATA from "./initial_data.json";
import Vue from "vue";

export function fetchPostsAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(INITIAL_DATA.posts);
    }, 0);
  });
}

export const state = () => ({
  postItems: []
});

//! Getters are like computed properties but for Vuex
export const getters = {
  hasEmptyItems(state) {
    return state.postItems.length === 0;
  }
};

//! Very good spot to send a request to a server. Usually Actions resolve into some data
export const actions = {
  fetchPosts({ commit }) {
    return fetchPostsAPI().then(posts => {
      commit("setPosts", posts);
    });
  },
  createPost({ commit }, postData) {
    // create post on server, or perssist data in some way
    postData._id = Math.random()
      .toString(36)
      .substr(2, 7);
    postData.createdAt = new Date().getTime();

    return this.$axios.$post("/api/posts", postData).then(res => {
      commit("addPost", postData);
      return postData;
    });
  },
  updatePost({ commit, state }, postData) {
    const postIndex = state.postItems.findIndex(post => {
      return post._id === postData._id;
    });

    if (postIndex !== -1) {
      // ako je postIndex -1 onda to znaci da on ne postoji
      return this.$axios
        .$patch(`/api/posts/${postData._id}`, postData)
        .then(res => {
          // console.log(res);
          commit("replacePost", { post: postData, index: postIndex });
          return postData; // obicaj je kao da se iz promice nesto vraca pa zato stavljamo ovaj return
        });
    }
  },
  deletePost({ commit, state }, postID) {
    const postIndex = state.postItems.findIndex(post => post._id === postID);

    // debugger;

    if (postIndex !== -1) {
      return this.$axios.$delete(`/api/posts/${postID}`).then(res => {
        // debugger;

        commit("deletePost", postIndex);
        return postID;
      });
    }
  }
};

// ! Mutations are simple functions taht have access to a state
// ! Mutations are used to assign values to a state
export const mutations = {
  setPosts(state, posts) {
    state.postItems = posts;
  },
  addPost(state, post) {
    state.postItems.push(post);
  },
  replacePost(state, { post, index }) {
    // state.postItems[index] = post;
    Vue.set(state.postItems, index, post);
  },
  deletePost(state, postIndex) {
    state.postItems.splice(postIndex, 1);
  }
};
