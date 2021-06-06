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
    postData.createdAt = new Date();
    commit("addPost", postData);
  },
  updatePost({ commit, state }, postData) {
    const postIndex = state.postItems.findIndex(post => {
      return post._id === postData._id;
    });

    if (postIndex !== -1) {
      // ako je postIndex -1 onda to znaci da on ne postoji
      commit("replacePost", { post: postData, index: postIndex });
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
  }
};
