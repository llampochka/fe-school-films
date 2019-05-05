<template>
  <div>
    <div class="user-short ml-2">
      <b-link :to="{name: $routeNames.FriendProfile, params: {userID: user.id}}">
        <img :src="user.avatar" class="userMenu__avatar">
      </b-link>
      <b-link
        class="ml-2"
        :to="{name: $routeNames.FriendProfile, params: {userID: user.id}}"
      >{{ user.name }}</b-link>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService"

export default {
  name: 'UserShort',
  props: {
    userID: [String, Number]
  },
  data() {
    return {
      user: {},
      friends: [],
    }
  },
  created: function () {
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

  }
}
</script>

