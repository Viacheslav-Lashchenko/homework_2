import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    products: null,
    cart: [],
  },
  mutations: {
    UPDATE_PRODUCTS: (state, products) => {
      state.products = products;
    },
    SET_CART: (state, item) => {
      state.cart.push(item)
    },
    REMOVE_FROM_CART: (state, index) => {
      state.cart.splice(index, 1)
    }
  },
  actions: {
    LOAD_PRODUCTS({ commit }, url) {
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => commit('UPDATE_PRODUCTS', json.items))
    },
    ADD_TO_CART({ commit }, item) {
      commit('SET_CART', item);
    },
    DELETE_FROM_CART({ commit }, index) {
      commit('REMOVE_FROM_CART', index)
    }

  },
  getters: {
    GET_PRODUCTS(state) {
      return state.products;
    },
    CART(state) {
      return state.cart
    }
  },
});

export default store;