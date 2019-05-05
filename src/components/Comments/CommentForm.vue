<template>
  <div>
    <wysiwyg v-model="newComment.text"/>
    <footer class="form-footer">
      <b-button type="submit" variant="primary" @click="sendComment()" :disabled="!newComment.text">
        <b-spinner v-if="updatingProcess" small></b-spinner>Send comment
      </b-button>
    </footer>
  </div>
</template>

<script>
import CommentService from "@/services/CommentService"
import RequestHandlers from "@/mixins/RequestHandlers"
import wysiwyg from "vue-wysiwyg"
import Vue from 'vue'

Vue.use(wysiwyg, {
  hideModules: {
    "link": true,
    "code": true,
    "image": true,
    "table": true
  },
})

export default {
  name: "CommentsForm",
  props: {
    movie: Object
  },
  data() {
    return {
      newComment: {},
      updatingProcess: false
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
    sendComment() {
      this.newComment.userId = this.currentUser.id
      this.newComment.date = parseInt(Date.now() / 1000)
      this.newComment.movieId = this.movie.id
      this.newComment.countLikes = 0
      this.newComment.countDislikes = 0

      this.handleRequestStart()

      CommentService.createOne(this.newComment)
        .then(comment => {
          this.handleRequestSuccess('Your comment was sended')
          comment.user = this.currentUser
          comment.likes = []
          comment.dislikes = []
          this.$emit('addedNewComment', comment)
          this.newComment = {}
        })
        .catch((err) => {
          this.handleRequestFailed(err)
        })
        .finally(() => {
          this.handleRequestFinished()
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

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>


