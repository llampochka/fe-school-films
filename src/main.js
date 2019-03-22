import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// project components
import Home from './components/Home.vue'
import Movies from './components/Movies.vue'
import MovieCard from './components/MovieCard.vue'
import PageNotFound from './components/PageNotFound.vue'

// settings
import RouteNames from './RouteNames'

import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$routeNames = RouteNames

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  mode: 'history',
  // linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Home,
      name: RouteNames.Home
    },
    {
      path: '/home',
      redirect: {name: RouteNames.Home}
    },
    {
      path: '/movies',
      component: Movies,
      name: RouteNames.Movies      
    },
    {
      path: '/movies/:movieId',
      component: MovieCard,
      name: RouteNames.MovieCard,
      props: true,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]  
})

const store = new Vuex.Store({
  state: {
    count: 0,
    loggedIn: false
  },
  mutations: {
    increment (state) {
      state.count++
    },
    logOut (state) {
      state.loggedIn = false;
    },
    logIn (state) {
      state.loggedIn = true;
    }
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/custom.scss'
