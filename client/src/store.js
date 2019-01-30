import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const local = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    user: {},
    tags: []
  },
  mutations: {
    getQuestions (state, data) {
      state.questions = data
    },
    loginSuccess (state, data) {
      state.user = data
    },
    logout (state) {
      state.user = {}
    },
    getTags (state, data) {
      state.tags = data
    }
  },
  actions: {
    getQuestions ({ commit }) {
      local('questions')
        .then(({ data }) => {
          commit('getQuestions', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    loginSuccess ({ commit }, data) {
      localStorage.setItem('token', data.token)
      commit('loginSuccess', data)
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      commit('logout')
    },
    getTags ({ commit }) {
      local('tags')
        .then(({ data }) => {
          commit('getTags', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
})
