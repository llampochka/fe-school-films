<template>
  <div>
    <h5>Incoming</h5>
    <hr>
    <b-alert v-if="!inRequests.length" show>No incoming requests</b-alert>

    <div v-for="friend in inRequests" :key="friend.id" class="mb-3">
      <b-card no-body img-left class="d-flex align-items-center">
        <b-link :to="{name: $routeNames.FriendProfile, params: {userID: friend.id}}">
          <img :src="friend.avatar" class="card-img-avatar" :alt="friend.name">
        </b-link>
        <b-card-body>
          <h5>
            <b-link
              :to="{name: $routeNames.FriendProfile, params: {userID: friend.id}}"
            >{{ friend.name }}</b-link>
          </h5>
        </b-card-body>
        <b-card-body class="text-right">
          <b-button variant="success" @click="approve(friend)" class="mb-2">
            <font-awesome-icon icon="user-plus"/>&nbsp;
            Approve
          </b-button>
          <b-button variant="danger" @click="decline(friend.id)" class="mb-2 ml-2">
            <font-awesome-icon icon="user-times"/>&nbsp;Decline
          </b-button>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import RequestHandlers from "@/mixins/RequestHandlers"

export default {
  name: 'InRequests',
  props: {
    user: Object,
    // friends: Array
  },
  data() {
    return {
      inRequests: []
    }
  },
  created: function () {
    UserService.getInRequests(this.user).then(inRequests => {
      this.inRequests = inRequests
    })
  },
  mixins: [RequestHandlers],
  methods: {
    approve(friend) {
      UserService.addFriend(this.user, friend.id)
        .then(user => {
          this.$store.dispatch("updateCurrentUser", user)
          this.handleRequestSuccess("Friend is added")
          this.inRequests.splice(this.inRequests.indexOf(friend.id), 1)
          this.$emit('approvedReq', friend)
        })
        .catch(err => {
          this.handleRequestFailed(err)
        })

    },
    decline(friendID) {
      UserService.removeInRequest(this.user, friendID)
        .then(user => {
          this.$store.dispatch("updateCurrentUser", user)
          this.inRequests.splice(this.inRequests.indexOf(friendID), 1)
        })
        .catch(err => {
          this.handleRequestFailed(err)
        })
    },
  }
}
</script>


