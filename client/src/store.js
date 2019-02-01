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
    },
    updateTags (state, data) {
      state.user.tags = data.tags
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
    },
    getQuestionsByTag ({ commit }, tagId) {
      local(`questions/tagged/${tagId}`)
        .then(({ data }) => {
          commit('getQuestions', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    updateTags ({ commit }, data) {
      commit('updateTags', data)
    }
  }
})
