import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allSelectedLabels : []
  },
  mutations: {
    changeSelectedLabels(state, nowSelectedLabels) {
      state.allSelectedLabels = nowSelectedLabels
    }
  },
  getters: {
    getAllSelectedLabels(state) {
      return state.allSelectedLabels
    }
  },
  actions: {
  },
  modules: {
  }
})
