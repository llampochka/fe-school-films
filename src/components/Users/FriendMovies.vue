<template>
  <div>
    <movies :userID="userID"></movies> 
  </div>
  
</template>

<script>
import Movies from "@/components/Movies/Movies"

export default {
  name: 'FriendMovies',
  props: {
    userID: [String, Number]
  }, 
  components: {
    Movies
  },
  computed: {
  }
}
</script>

