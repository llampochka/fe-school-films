<template>
  <div id="app">
    <!-- navbar -->
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <div class="container">
          <b-navbar-brand href="/">
            <span><font-awesome-icon icon="video" /></span> Movies
          </b-navbar-brand>

          <b-navbar-toggle target="nav_collapse"/>

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-nav-item :to="{name: $routeNames.Home}">Home</b-nav-item>
              <b-nav-item :to="{name: $routeNames.Movies}">Movies</b-nav-item>
              <b-nav-item :to="{name: $routeNames.Friends}">Friends</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-text>
                <login-modal v-if="!isLoggedIn"></login-modal>                
              </b-nav-text>
              <b-nav-text>
                <register-modal v-if="!isLoggedIn"></register-modal>
              </b-nav-text>
              <user-menu></user-menu>              
            </b-navbar-nav>
          </b-collapse>
        </div>
      </b-navbar>
    </div>
    <!-- /navbar -->
    <!-- main content wrapper -->
    <div class="container">
      <div id="main">
        <router-view></router-view>
      </div>
    </div>
    <!-- /main content wrapper -->

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <span class="text-muted">&copy; Movies, Alena Moskalenko, T-systems RUS</span>
      </div>
    </footer>
    <!-- Footer -->

  </div>
</template>

<script>
import RegisterModal from "./components/RegisterModal.vue"
import LoginModal from "./components/LoginModal.vue"
import UserMenu from "./components/UserMenu.vue"

import UserService from './services/UserService'

export default {
  name: "app",
  components: {
    RegisterModal,
    UserMenu,
    LoginModal
  }, 
  created: function () {
    this.setCurrentUser()
  },
  methods: {
    setCurrentUser() {

      if(this.isLoggedIn) {
        const userID = localStorage.getItem('user_id');

        if(userID){
            return UserService.getOne(userID)
                .then( user => {          
                  this.$store.dispatch('updateCurrentUser', user)
                })
                .catch(err => {
                  this.flashMessage.error({
                    title: 'Error', 
                    message: err
                  })
                })
        } 
      }
      
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    }    
  }
};
</script>