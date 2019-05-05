import Vue from 'vue'
import VueRouter from 'vue-router'
import {PAGE_NOT_FOUND} from './settings'

// project components
import Home from './components/Home.vue'
import Profile from './components/Users/Profile.vue'
import MoviesPage from './components/Movies/MoviesPage.vue'
import MovieCard from './components/Movies/MovieCard.vue'
import Friends from './components/Users/Friends.vue'
import User from './components/Users/User.vue'
import FriendProfile from './components/Users/FriendProfile.vue'
import FriendMovies from './components/Users/FriendMovies.vue'
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
        component: MoviesPage,
        name: RouteNames.MoviesPage,
        meta: {
            requiresAuth: true
        },      
      },
      {
        path: '/movies/:movieID',
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
        path: '/friends/:userID',
        component: User,
        name: RouteNames.User,
        props: true,
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: '',
            component: FriendProfile,
            name: RouteNames.FriendProfile,
            props: true,
            meta: {
              noScroll: true
            }
          },
          {
            path: 'movies',
            component: FriendMovies,
            name: RouteNames.FriendMovies,
            props: true,
            meta: {
              noScroll: true
            }
          }
        ]
      },
      {
        path: '/login',
        component: Login,
        name: RouteNames.Login 
      },
      {
        path: PAGE_NOT_FOUND,
        component: PageNotFound,
        name: RouteNames.PageNotFound
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