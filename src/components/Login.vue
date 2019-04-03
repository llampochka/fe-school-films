<template>
  <div>
    <h1>Sign in</h1>

    <div v-if="!isLoggedIn">
      <b-alert variant="info" show>To have access to app functionality, you need to login in system</b-alert>
      <b-row>
        <b-col lg="3" class="d-none d-lg-block my-auto text-center icon-decorator">
          <font-awesome-icon icon="key" size="6x"/>
        </b-col>
        <b-col lg="6">
          <b-card>
            <login-form></login-form>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <b-alert variant="success" show>You are already logged in</b-alert>
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm.vue";

export default {
  name: "Login",
  props: {
    msg: String
  },
  components: {
    LoginForm
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    }
  }
};
</script>


