<template>
  <div>
    <b-list-group horizontal class="list-group-ratings mb-3">
      <b-list-group-item class="list-group-ratings-imdb">
        <font-awesome-icon icon="star" size="lg"/>
        {{ movie.imdbRating }}/
        <span class="list-group-ratings-full">10</span>
        <b-badge variant="info" class="ml-3">IMDb</b-badge>
      </b-list-group-item>
      <b-list-group-item class="list-group-ratings-user" v-if="isMyMovie">
        <b-button id="popover-button-open" variant="default">
          <font-awesome-icon icon="star" size="lg"/>
          {{ movie.rating }}
          <b-badge variant="info" class="ml-3">You</b-badge>
        </b-button>
      </b-list-group-item>
    </b-list-group>

    <b-popover v-if="isMyMovie"
      target="popover-button-open"
      title="Popover"
      :show.sync="popShow"
      variant="dark"
      triggers="click"
    >
      <template slot="title">
        Rate
        <b-btn-close @click="popShow = !popShow"></b-btn-close>
      </template>
      <star-rating
        :star-size="15"
        :border-width="2"
        :max-rating="10"
        v-model="movie.userRating"
        :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
        :rounded-corners="true"
        border-color="#BE54EE"
        inactive-color="#2A3759"
        active-color="#BE54EE"
        :rating="0"
        :round-start-rating="true"
        @rating-selected="updateRating"
      ></star-rating>
    </b-popover>
  </div>
</template>

<script>
import MovieService from "@/services/MovieService"
import RequestHandlers from "@/mixins/RequestHandlers"
import StarRating from 'vue-star-rating'

export default {
  name: "MovieRating",
  props: {
    movie: Object,
    isMyMovie: Boolean
  },
  data() {
    return {
      popShow: false
    }
  },
  mixins: [
    RequestHandlers
  ],
  components: {
    StarRating
  },
  methods: {
    updateRating(rating) {

      this.movie.rating = rating
      this.handleRequestFinished()

      MovieService.updateOne(this.movie)
        .then((movie) => {
          this.handleRequestSuccess("Movie rating is updated")
          this.popShow = false
          this.$emit('updated', movie)
        })
        .catch((err) => {
          this.handleRequestFailed(err)
        })
        .finally(() => {
          this.handleRequestFinished()
          this.popShow = false
        })
    }
  },

  computed: {
  }
};
</script>


