<template>
  <div>
    <h3>
      Comments
      <b-spinner label="Loading" v-if="updatingProcess" small></b-spinner>
    </h3>

    <comment-form @addedNewComment="handleNewComment" :movie="movie"></comment-form>

    <comments-list :comments="comments" :movie="movie"></comments-list>
  </div>
</template>

<script>
import CommentService from "@/services/CommentService"
import RequestHandlers from "@/mixins/RequestHandlers"

import CommentForm from "./CommentForm"
import CommentsList from "./CommentsList"

export default {
  name: "Comments",
  props: {
    movie: Object
  },
  data() {
    return {
      comments: [],
      updatingProcess: false
    }
  },
  mixins: [
    RequestHandlers
  ],
  components: {
    CommentForm,
    CommentsList
  },
  created() {
    this.handleRequestStart()
    CommentService.getAllOfMovie(this.movie.id)
      .then(comments => {
        this.comments = comments
      })
      .catch((err) => {
        this.handleRequestFailed(err)
      })
      .finally(() => {
        this.handleRequestFinished()
      })
  },
  methods: {
    handleNewComment(newComment) {
      this.comments.push(newComment)
    }
  },
  computed: {
  }
}
</script>



