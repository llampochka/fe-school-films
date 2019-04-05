import Vue from 'vue'
import VueRouter from 'vue-router'

// project components
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Movies from './components/Movies.vue'
import MovieCard from './components/MovieCard.vue'
import Friends from './components/Friends.vue'
import FriendProfile from './components/FriendProfile.vue'
import Login from './components/Login.vue'
import PageNotFound from './components/PageNotFound.vue'

// settings
import RouteNames from './RouteNames'

import store from './Store'

Vue.use(VueRouter)

Vue.prototype.$routeNames = RouteNames

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
        path: '/profile',
        component: Profile,
        name: RouteNames.Profile ,
        meta: {
          requiresAuth: true
        },     
      },
      {
        path: '/movies',
        component: Movies,
        name: RouteNames.Movies,
        meta: {
            requiresAuth: true
        },      
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
        path: '/friends',
        component: Friends,
        name: RouteNames.Friends ,
        meta: {
          requiresAuth: true
        },     
      },
      {
        path: '/friends/:friendId',
        component: FriendProfile,
        name: RouteNames.FriendProfile,
        props: true,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: '/login',
        component: Login,
        name: RouteNames.Login 
      },
      {
        path: '*',
        component: PageNotFound
      }
    ]  
  })

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

      const isLoggedIn = store.state.loggedIn;

      if (!isLoggedIn) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next() // must be always called
    }
  })
  
  export default router;