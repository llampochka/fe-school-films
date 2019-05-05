<template>
  <div>
    <b-btn variant="default" @click="toggleFavorite()">
      <font-awesome-icon :icon="icon"  :class="{'icon-love': movie.isFavorite}"/>&nbsp;
      <span v-if="!movie.isFavorite">Add to favorite</span> 
      <span v-else>Your favorite movie</span> 
      <b-spinner v-if="updatingProcess" small></b-spinner>
    </b-btn>
  </div>
</template>

<script>
import MovieService from "@/services/MovieService"
import RequestHandlers from "@/mixins/RequestHandlers"

export default {
  name: "AddToFavorite",
  props: {
    movie: Object
  },
  mixins: [
    RequestHandlers
  ],
  methods: {
    toggleFavorite() {

      this.movie.isFavorite = !this.movie.isFavorite
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
      return this.movie.isFavorite ? 'heart' : ['far', 'heart']
    }
  }
};
</script>


