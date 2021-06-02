import { INITIAL_DATA } from "./index";

export function fetchPostsAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(INITIAL_DATA.posts);
    }, 200);
  });
}

export const state = () => ({
  postItems: []
});

//* Very good spot to send a request to a server. Usually Actions resolve into some data
export const actions = {
  fetchPosts({ commit }) {
    return fetchPostsAPI().then(posts => {
      commit("setPosts", posts);
    });
  }
};

// * Mutations are simple functions taht have access to a state
// * Mutations are used to assign values to a state
export const mutations = {
  setPosts(state, posts) {
    state.postItems = posts;
  }
};
