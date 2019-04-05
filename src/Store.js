import Vue from 'vue'
import Vuex from 'vuex'
import clone from 'lodash/clone'

import AuthService from './services/AuthService'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      loggedIn: localStorage.getItem('user_id') !== null || false,
      user: {}
    },
    mutations: {
      logOut (state) {
        state.loggedIn = false
        state.user = {}
        localStorage.removeItem('user_id')
      },
      logIn (state, user) {
        state.loggedIn = true
        state.user = user
        localStorage.setItem('user_id', user.id)
      },
      updateCurrentUser (state, user) {
        state.user = clone(user)
      }
    },
    actions: {
      logIn(context, userFormData) {

        return new Promise((resolve, reject) => {

            return AuthService.logIn(userFormData)
                .then(currentUser => {                    
                    context.commit('logIn', currentUser)
                    resolve(currentUser)
                })
                .catch(err => {
                    context.commit('logOut')                    
                    reject(err)
                });

        })    
                
      },
      logOut(context) {

        return new Promise((resolve, reject) => {

            return AuthService.logOut()
                .then(res => {                    
                    context.commit('logOut')
                    resolve(res)
                })
                .catch(err => {
                    // eslint-disable-next-line 
                    // console.log('err from store', err)
                    context.commit('logOut') 
                    reject(err)
                })

        })
       
      },
      updateCurrentUser(context, user) {
        context.commit('updateCurrentUser', user)  
      }    

    }  
  })

export default store;  