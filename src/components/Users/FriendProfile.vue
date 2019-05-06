<template>
  <div>
    <loading-overlay v-show="updatingProcess"></loading-overlay>
    <b-alert show variant="danger" v-if="accessError">{{ accessError }}</b-alert>

    <div v-if="!updatingProcess && !accessError">
      <h1>{{ user.name }}</h1>
      <b-breadcrumb :items="breadcrumbs"/>
      <b-row>
        <b-col lg="4">
          <img :src="user.avatar" width="300" height="300" class="profile__avatar">
        </b-col>
        <b-col>
          <h2>{{ user.login }}</h2>
          <p>ID: {{ user.id }}</p>
          <b-button
            class="mb-2"
            variant="info"
            :to="{name: $routeNames.FriendMovies, params: {userID: user.id}}"
          >
            <font-awesome-icon icon="list"/>&nbsp;View movies
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import { PAGE_NOT_FOUND } from "@/settings"

import LoadingOverlay from "@/components/LoadingOverlay"
import RequestHandlers from "@/mixins/RequestHandlers"

export default {
  name: 'FriendProfile',
  props: {
    userID: [String, Number]
  },
  data() {
    return {
      user: {},
      friends: [],
      contentIsLoading: false,
      accessError: ""
    }
  },
  mixins: [RequestHandlers],
  components: {
    LoadingOverlay
  },
  created: function () {
    const userID = this.userID


    if (userID) {
      this.handleRequestStart()

      UserService.getOne(userID)
        .then(user => {
          if (UserService.isMyFriend(this.currentUser, userID)) {
            this.user = user
            UserService.getFriends(user).then(friends => {
              this.friends = friends
            })
          } else {
            this.accessError = "Access denied"
          }
        })
        .catch(() => {
          this.$router.push(PAGE_NOT_FOUND)
        })
        .finally(() => {
          this.handleRequestFinished()
        })
    }

  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: 'Friends',
          to: { name: this.$routeNames.Friends }
        },
        {
          text: this.user.name,
          active: true
        }
      ]
    },
    currentUser() {
      return this.$store.getters.user
    }

  }
}
</script>


