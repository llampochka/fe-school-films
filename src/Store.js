import Vue from 'vue'
import Vuex from 'vuex'
import clone from 'lodash/clone'

import AuthService from './services/AuthService'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: localStorage.getItem('token') !== null || false,
    user: {}
  },
  mutations: {
    logOut(state) {
      state.loggedIn = false
      state.user = {}
    },
    logIn(state, user) {
      state.loggedIn = true
      state.user = user
    },
    updateCurrentUser(state, user) {
      state.user = clone(user)
    }
  },
  actions: {
    logIn(context, userFormData) {

      return new Promise((resolve, reject) => {

        AuthService.logIn(userFormData)
          .then(currentUser => {
            context.commit('logIn', currentUser)
            localStorage.setItem('user', JSON.stringify(currentUser))
            localStorage.setItem('token', currentUser.token)
            resolve(currentUser)
          })
          .catch(err => {
            context.commit('logOut')
            reject(err)
          })

      })

    },
    logOut(context) {

      return new Promise((resolve, reject) => {

        AuthService.logOut()
          .then(res => {            
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
          .finally(() => {
            context.commit('logOut')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
          })

      })

    },
    updateCurrentUser(context, user) {
      localStorage.setItem('user', JSON.stringify(user))
      context.commit('updateCurrentUser', user)
    }

  },
  getters: {
    user: state => state.user
  }
})

export default store;  