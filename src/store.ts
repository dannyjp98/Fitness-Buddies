import { createStore } from "vuex";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    loggedIn(state) {
      return state.user.loggedIn;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.data = payload;
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
  },
  actions: {
    async register(context, { email, password }) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        context.commit("SET_USER", response.user);
      } catch (e) {
        console.log("register error:");
        console.log(e);
        throw e;
      }
    },
    async login(context, { email, password }) {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        context.commit("SET_USER", response.user);
      } catch (e) {
        console.log("login error:");
        throw e;
      }
    },
    async logout(context) {
      await signOut(auth);
      context.commit("SET_USER", null);
    },
    async fetchUser(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER", user);
      } else {
        context.commit("SET_USER", null);
      }
    },
  },
});

export default store;
