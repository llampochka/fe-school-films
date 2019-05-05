<template>
  <b-nav-item-dropdown v-if="isLoggedIn" right>
    <!-- Using button-content slot -->
    <template slot="button-content">
      <img :src="currentUser.avatar" class="userMenu__avatar" />
      {{ currentUser.name }}     
    </template>
    <b-dropdown-item :to="{name: $routeNames.Profile}">Profile</b-dropdown-item>
    <b-dropdown-item href="#" @click="logOut">Log out</b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  name: 'Friends',
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
      this.$router.push('/')  
    }    
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn
    },
    currentUser() {
      return this.$store.getters.user
    }
  }
}
</script>


