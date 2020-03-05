import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    allSelectedLabels : []
  },
  mutations: {
    changeSelectedLabels(state, nowSelectedLabels) {
      state.allSelectedLabels = nowSelectedLabels
    },
    setLoginStatus(state, status) {
      state.isLogin = status
    }
  },
  getters: {
    getAllSelectedLabels(state) {
      return state.allSelectedLabels
    },
    getLoginStatus(state) {
      return state.isLogin
    }
  },
  actions: {
  },
  modules: {
  }
})
