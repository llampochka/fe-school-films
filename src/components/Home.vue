<template>
  <b-jumbotron header="Movies App on Vue" :lead="welcomeMsg" variant="dark">
    <p v-if="!isLoggedIn">Have a nice time with this app. First you need to Sign In</p>
  </b-jumbotron>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    },
    welcomeMsg() {
      if(this.isLoggedIn){
        // eslint-disable-next-line
        console.log('user', this.$store.state.user);
        return 'Welcome, ' + this.$store.state.user.name + '!'
      } else {
        return 'Welcome'
      }
    }
  }
}
</script>


