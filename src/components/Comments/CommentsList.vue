<template>
  <div>
    <div v-for="(comment, index) in comments" :key="index">
      <b-card no-body img-left class="mb-3">
        <div class="w-100">
          <b-row>
            <b-col md="8">
              <div class="d-flex align-items-top">
                <b-link :to="{name: $routeNames.FriendProfile, params: {userID: comment.user.id}}">
                  <img :src="comment.user.avatar" class="card-img-avatar" :alt="comment.user.name">
                </b-link>
                <b-card-body>
                  <h5>
                    <b-link
                      :to="{name: $routeNames.FriendProfile, params: {userID: comment.user.id}}"
                    >{{ comment.user.name }}</b-link>
                  </h5>
                  <div v-html="comment.text"></div>
                </b-card-body>
              </div>
            </b-col>
            <b-col>
              <b-card-body class="text-right comment-likes">
                <b-button
                  variant="success"
                  :class="{hasMyMark: hasMyLike(comment)}"
                  @click="toggleLike(comment, index)"
                  title="Like"
                  :disabled="likeLoader"
                >
                  <font-awesome-icon icon="thumbs-up" class="comment-likes-icon"/>
                  <span class="d-none d-lg-inline ml-1">Like</span>
                  <b-badge class="ml-1">{{ comment.likes.length }}</b-badge>
                </b-button>&nbsp;&nbsp;
                <b-button
                  variant="danger"
                  @click="toggleDislike(comment, index)"
                  title="dislike"
                  :class="{hasMyMark: hasMyDislike(comment)}"
                  :disabled="dislikeLoader"
                >
                  <font-awesome-icon icon="thumbs-down" class="comment-likes-icon"/>
                  <span class="d-none d-lg-inline ml-1">Dislike</span>
                  <b-badge class="ml-1">{{ comment.dislikes.length }}</b-badge>
                </b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import CommentService from "@/services/CommentService"
import RequestHandlers from "@/mixins/RequestHandlers"

export default {
  name: "CommentsList",
  props: {
    movie: Object,
    comments: Array
  },
  data() {
    return {
      likeLoader: false,
      dislikeLoader: false
    }
  },
  mixins: [
    RequestHandlers
  ],
  components: {

  },
  created() {
  },
  methods: {
    toggleLike(comment, index) {
      if (this.hasMyLike(comment)) {
        const likeInfo = this.findMyLike(comment)
        this.removeMark(comment, index, likeInfo.id, 'likes')
      } else {
        this.addMark(comment, index, 'likes', this.findMyDislike(comment))
      }
    },
    toggleDislike(comment, index) {
      if (this.hasMyDislike(comment)) {
        const dislikeInfo = this.findMyDislike(comment)
        this.removeMark(comment, index, dislikeInfo.id, 'dislikes')
      } else {
        this.addMark(comment, index, 'dislikes', this.findMyLike(comment))
      }
    },
    addMark(comment, index, markType, oppositeMark) {
      this.likeLoader = true
      this.dislikeLoader = true

      CommentService.addMark(comment, this.currentUser.id, markType, oppositeMark)
        .then(commentUpdated => {
          Vue.set(this.comments, index, commentUpdated)
        })
        .catch((err) => {
          this.handleRequestFailed(err)
        })
        .finally(() => {
          this.likeLoader = false
          this.dislikeLoader = false
        })

    },
    removeMark(comment, index, markID, markType) {
      this.likeLoader = true
      this.dislikeLoader = true

      CommentService.removeMark(comment, markID, markType)
        .then(commentUpdated => {
          Vue.set(this.comments, index, commentUpdated)
        })
        .catch((err) => {
          this.handleRequestFailed(err)
        })
        .finally(() => {
          this.likeLoader = false
          this.dislikeLoader = false
        })

    },
    hasMyLike(comment) {
      return this.findMyLike(comment) !== undefined
    },
    findMyLike(comment) {
      return comment.likes.find(item => {
        return item.userId === this.currentUser.id
      })
    },
    hasMyDislike(comment) {
      return this.findMyDislike(comment) !== undefined
    },
    findMyDislike(comment) {
      return comment.dislikes.find(item => {
        return item.userId === this.currentUser.id
      })
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.user
    }
  }
};
</script>



