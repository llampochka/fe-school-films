<template>
  <div>
    <b-btn variant="default" @click="toggleWatched()">
      <font-awesome-icon :icon="icon" :class="{'icon-love': movie.isWatched}"/>&nbsp;
      <span v-if="!movie.isWatched">Add to watched</span> 
      <span v-else>You watched this movie</span> 
      <b-spinner v-if="updatingProcess" small></b-spinner>
    </b-btn>
  </div>
</template>

<script>
import MovieService from "@/services/MovieService"
import RequestHandlers from "@/mixins/RequestHandlers"

export default {
  name: "AddToWatched",
  props: {
    movie: Object
  },
  mixins: [
    RequestHandlers
  ],
  methods: {
    toggleWatched() {

      this.movie.isWatched = !this.movie.isWatched
      this.handleRequestStart()

      MovieService.updateOne(this.movie)
        .then((movie) => {
          this.$emit('updated', movie)
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
    icon() {
      return this.movie.isWatched ? 'eye' : ['far', 'eye']
    }
  }
};
</script>


