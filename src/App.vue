<template>
  <div id="app">
    <!-- navbar -->
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <div class="container">
          <b-navbar-brand href="/">
            <!-- <span><font-awesome-icon icon="video" /></span> Movies -->
            <img src="/img/logo.png" height="40"/> Movies
          </b-navbar-brand>

          <b-navbar-toggle target="nav_collapse"/>

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav v-if="isLoggedIn">
              <b-nav-item :to="{name: $routeNames.Home}">Home</b-nav-item>
              <b-nav-item :to="{name: $routeNames.MoviesPage}">My movies</b-nav-item>
              <b-nav-item :to="{name: $routeNames.Friends}">Friends</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-text v-show="!isLoggedIn">
                <login-modal></login-modal>                
              </b-nav-text>
              <b-nav-text v-show="!isLoggedIn">
                <register-modal></register-modal>
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

    <FlashMessage></FlashMessage>

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
import UserMenu from "./components/Users/UserMenu.vue"

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
        const user = JSON.parse(localStorage.getItem('user')) 
        this.$store.dispatch('updateCurrentUser', user)
      }
      
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn
    }    
  }
};
</script>