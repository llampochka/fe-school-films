<template>
  <div>
    <router-view/>  
  </div>
  
</template>

<script>
import UserService from "@/services/UserService" 

export default {
  name: 'User',
  props: {
    userID: [String, Number]
  },
  data() {
    return {
      user: {},
      friends: [],
    }
  },
  created: function() {
    const userID = this.userID;

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
  computed: {
    breadcrumbs() {
      return [
          {
            text: 'Friends',
            to: {name: this.$routeNames.Friends}
          },
          {
            text: this.user.name,
            active: true
          }
        ]
    }
    
  }
}
</script>


