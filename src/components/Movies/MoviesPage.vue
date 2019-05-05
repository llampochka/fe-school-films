<template>
  <div>
    <movies :userID="ownerUserID"></movies> 
  </div>
  
</template>

<script>
import Movies from "./Movies"

export default {
  name: 'MoviesPage',
  components: {
    Movies
  },
  computed: {
    currentUser() {
      return this.$store.getters.user
    },
    ownerUserID() {
      return this.currentUser && this.currentUser.id
    }
  }
}
</script>

