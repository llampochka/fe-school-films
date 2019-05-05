<template>
  <div>
    <b-alert v-if="!limitFriends.length" show>No friends yet :(</b-alert>

    <b-row>
      <b-col v-bind:lg="col" v-for="friend in limitFriends" :key="friend.id" class="mb-3">
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
            <b-button
              class="mb-2"
              variant="info"
              :to="{name: $routeNames.FriendMovies, params: {userID: friend.id}}"
            >
              <font-awesome-icon icon="list"/>&nbsp;View movies
            </b-button>
            <b-button class="ml-2 mb-2" variant="danger" @click="removeFromFriends(friend.id)">
              <font-awesome-icon icon="user-minus"/>&nbsp;Remove from friends
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <!-- Modal Confirm Component -->
    <b-modal id="modal-confirm" title="Confirm" ref="modal-confirm" @ok="handleConfirmOk()">
      <p class="my-4">Are you sure?</p>
    </b-modal>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import RequestHandlers from "@/mixins/RequestHandlers"

export default {
  name: "FriendsList",
  props: {
    user: Object,
    friends: Array,
    limit: Number,
    col: Number
  },
  data() {
    return {
      confirmedHandler: {}
    };
  },
  mixins: [RequestHandlers],
  methods: {
    removeFromFriends(friendID) {
      this.$refs["modal-confirm"].show();
      this.confirmedHandler.func = this.removeFriend
      this.confirmedHandler.id = friendID
    },
    removeFriend(friendID) {
      UserService.removeFriend(this.user, friendID)
        .then(user => {
          this.$store.dispatch("updateCurrentUser", user)
          this.handleRequestSuccess("Friend was unfriended")
          return UserService.getFriends(user)
        })
        .then(friends => {
          this.$emit('friendsListUpdated', friends)
        })
        .catch(err => {
          this.handleRequestFailed(err)
        })
    },
    handleConfirmOk() {
      this.confirmedHandler.func(this.confirmedHandler.id);
    },
    limitArray(arr) {
      if (this.limit) {
        return arr.slice(0, this.limit)
      } else {
        return arr
      }
    }
  },
  computed: {
    limitFriends() {
      if (this.limit) {
        return this.friends.slice(0, this.limit)
      } else {
        return this.friends;
      }
    }
  }
};
</script>


