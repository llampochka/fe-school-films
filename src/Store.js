import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import AuthService from './services/AuthService'

Vue.use(Vuex)

// eslint-disable-next-line
// console.log('localStorage user', localStorage.getItem('user'));

const getCurrentUser = function() {
    let userStrJson = localStorage.getItem('user');
    let user = {};
    if (userStrJson) {
        user = JSON.parse(userStrJson)
    } 
    return user
}

const store = new Vuex.Store({
    state: {
      loggedIn: localStorage.getItem('user') !== null || false,
      user: getCurrentUser()
    },
    mutations: {
      logOut (state) {
        state.loggedIn = false;
        state.user = {};
        localStorage.removeItem('user')
      },
      logIn (state, user) {
        state.loggedIn = true;
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
    actions: {
      logIn(context, user) {

        return new Promise((resolve, reject) => {

            return AuthService.logIn(user)
                .then(currentUser => {                    
                    context.commit('logIn', currentUser)
                    resolve(currentUser)
                })
                .catch(err => {
                    // eslint-disable-next-line 
                    // console.log('err from store', err)
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

      }
    }  
  })

export default store;  