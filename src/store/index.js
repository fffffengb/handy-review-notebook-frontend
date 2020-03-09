import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLogin = status
    }
  },
  getters: {
    getLoginStatus(state) {
      return state.isLogin
    }
  },
  actions: {
  },
  modules: {
  }
})
