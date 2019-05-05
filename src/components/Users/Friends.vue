<template>
  <div>
    <h1>Your friends</h1>
    <friends-list :col="12" :user="user" v-if="user.id" :friends="friends"></friends-list>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import FriendsList from "./FriendsList"

export default {
  name: 'Friends',
  props: {
  },
  components: {
    FriendsList
  },
  data() {
    return {
      user: {},
      friends: []
    }
  },  
  created: function() {
    const userID = this.currentUser && this.currentUser.id

    if (userID) {
      UserService.getOne(userID)
        .then(user => {
          this.user = user

          UserService.getFriends(user).then(friends => {
            this.friends = friends
          })

        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error",
            message: err
          })
        })
    }
  },
  methods: {
    
  },
  computed: {
    currentUser() {
      return this.$store.getters.user
    }
  }
} 
</script>


