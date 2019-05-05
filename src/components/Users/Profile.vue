<template>
  <div class="profile">
    <h1>My profile (ID: {{ user.id }})</h1>

    <b-form @submit="onSubmit" class="mb-3">
      <b-row>
        <b-col lg="4">
          <img :src="user.avatar" width="300" height="300" class="profile__avatar">
        </b-col>
        <b-col lg="5">
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="user.name"
              type="text"
              required
              placeholder="Enter your name"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Login:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="user.login"
              type="text"
              required
              placeholder="Enter your login"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Upload new photo:" label-for="input-3">
            <b-form-file
              v-model="file"
              placeholder="Choose a file..."
              drop-placeholder="Drop file here..."
              @change="onFileChange"
            ></b-form-file>
          </b-form-group>

          <footer class="form-footer">
            <b-button type="submit" variant="primary">
              <b-spinner v-if="updatingProcess" small></b-spinner>Update your data
            </b-button>
          </footer>
        </b-col>
      </b-row>
    </b-form>

    <h2>Friends</h2>
    <div class="mb-3">
      <friends-list
        :limit="4"
        :user="user"
        v-if="user.id"
        :friends="friends"
        :col="6"
        @friendsListUpdated="handleFriendsListUpdated"
      ></friends-list>
      <div v-if="friends.length">
        <hr>
        <div class="text-right">
          <b-button :to="{name: $routeNames.Friends}" variant="primary">All friends</b-button>
        </div>
      </div>
    </div>

    <h3>Requests</h3>
    <b-row>
      <b-col lg="6">
        <!-- Incoming requests from other users -->
        <in-requests @approvedReq="addNewFriend" :user="user" v-if="user.id"></in-requests>
      </b-col>
      <b-col lg="6">
        <!-- Outcoming requests to other users -->
        <out-requests :user="user" v-if="user.id" :friends="friends"></out-requests>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import RequestHandlers from "@/mixins/RequestHandlers"

import FriendsList from "./FriendsList"
import InRequests from "./InRequests"
import OutRequests from "./OutRequests"

export default {
  name: "Profile",
  data() {
    return {
      file: null,
      image: null,
      user: {},
      friends: []
    };
  },
  components: {
    FriendsList,
    InRequests,
    OutRequests
  },
  mixins: [RequestHandlers],
  created: function () {
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
          this.handleRequestFailed(err)
        })
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.user.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onSubmit(e) {
      e.preventDefault()
      this.handleRequestStart()
      UserService.updateOne(this.user)
        .then(user => {
          this.$store.dispatch("updateCurrentUser", user)
          this.handleRequestSuccess("Your profile is updated")
        })
        .catch(err => {
          this.handleRequestFailed(err)
        })
        .finally(() => {
          this.handleRequestFinished()
        })
    },
    addNewFriend(friend) {
      this.friends.push(friend)
    },
    handleFriendsListUpdated(friends) {
      this.friends = friends
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style>
.profile__avatar {
  border-radius: 5px;
}
</style>

