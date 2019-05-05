<template>
  <div>
    <h5>Outcoming</h5>
    <hr>

    <b-input-group class="mb-3" prepend="Send request">
      <b-form-input
        id="send_to_id"
        name="User ID"
        v-model="sendToID"
        placeholder="Enter user's ID"
        v-validate="{ required: true, numeric: true }"
        :state="validateState('User ID')"
      ></b-form-input>
      <b-input-group-append>
        <b-button
          variant="primary"
          @click="sendRequest(sendToID)"
          :disabled="errors.any() || !sendToID"
        >Submit</b-button>
      </b-input-group-append>
    </b-input-group>
    <p class="text-danger">{{ errors.first('User ID') }}</p>

    <b-alert v-if="!outRequests.length" show>No outcoming requests</b-alert>

    <div v-for="friend in outRequests" :key="friend.id" class="mb-3">
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
          <span class="d-inline-block m-2">...waiting for approval</span>
          <b-button variant="danger" @click="cancelOutRequest(friend.id)" class="m-2">
            <font-awesome-icon icon="ban"/>&nbsp;Cancel</b-button>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import RequestHandlers from "@/mixins/RequestHandlers"

export default {
  name: "OutRequests",
  props: {
    user: Object,
    friends: Array
  },
  data() {
    return {
      outRequests: [],
      sendToID: null
    };
  },
  created: function () {
    UserService.getOutRequests(this.user).then(outRequests => {
      this.outRequests = outRequests
    });
  },
  mixins: [RequestHandlers],
  methods: {
    sendRequest(sendToID) {
      sendToID = parseInt(sendToID)

      if (sendToID === this.user.id) {
        this.handleRequestFailed("You can't send request to yourself")
      } else if (
        this.outRequests.findIndex(item => {
          return item.id === sendToID;
        }) >= 0
      ) {
        this.handleRequestFailed("You've already sended request to this user")
      } else if (
        this.friends.findIndex(item => {
          return item.id === sendToID;
        }) >= 0
      ) {
        this.handleRequestFailed("This user is already your friend")
      } else {
        UserService.sendRequest(this.user, sendToID)
          .then(data => {
            this.$store.dispatch("updateCurrentUser", data.user)
            this.handleRequestSuccess("Friendship request is sended! Just waiting for answer. Good luck!")
            this.outRequests.push(data.possibleFriend)
          })
          .catch(err => {
            this.handleRequestFailed(err)
          })
      }
    },
    cancelOutRequest(friendID) {
      UserService.removeOutRequest(this.user, friendID)
        .then(user => {
          this.$store.dispatch("updateCurrentUser", user)
          UserService.getOutRequests(user).then(outRequests => {
            this.outRequests = outRequests
          })          
        })
        .catch(err => {
          this.handleRequestFailed(err)
        })
    },
    validateState(ref) {

      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.errors.has(ref)
      }
      return null
    }
  }
};
</script>


