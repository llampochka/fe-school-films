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
                <b-button v-if="!loggedIn" v-b-modal.modal1 class="mb-md-2 mb-lg-0">
                  <font-awesome-icon icon="sign-in-alt"/> Sign in
                </b-button>
              </b-nav-text>

              <!-- Modal Component Sign In -->
              <b-modal
                id="modal1"
                header-close-variant="light"
                title="Sign In"
                @ok="signIn"
                ok-title="Sign In"
                centered
              >
                <b-form>
                  <b-form-group id="emailGroup" label="Email address:" label-for="email">
                    <b-form-input
                      id="email"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email"
                    />
                  </b-form-group>

                  <b-form-group id="pwdGroup" label="Your Password:" label-for="pwd">
                    <b-form-input
                      id="pwd"
                      type="password"
                      v-model="form.pwd"
                      required
                      placeholder="Enter password"
                    />
                  </b-form-group>
                </b-form>
              </b-modal>

              <b-nav-text>
                <register-modal v-if="!loggedIn"></register-modal>
              </b-nav-text>

              <b-nav-item-dropdown v-if="loggedIn" right>
                <!-- Using button-content slot -->
                <template slot="button-content">User</template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#" @click="toggleLogin">Signout</b-dropdown-item>
              </b-nav-item-dropdown>
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
  </div>
</template>

<script>
import RegisterModal from "./components/RegisterModal.vue";
import AuthService from "./services/AuthService";

const AppAuthService = new AuthService();

export default {
  name: "app",
  components: {
    RegisterModal
  },
  data() {
    return {
      loggedIn: false,
      form: {}
    };
  },
  methods: {
    signIn() {
      this.loggedIn = true;
      AppAuthService.login();
    },
    toggleLogin() {
      if (this.loggedIn) {
        this.loggedIn = false;
        AppAuthService.logout();
      } else {
        this.loggedIn = true;
        AppAuthService.login();
      }
    },
    register() {
      return true;
    }
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
