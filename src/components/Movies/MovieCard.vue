<template>
  <div v-if="movie.id">
    <loading-overlay v-show="contentIsLoading"></loading-overlay>

    <b-row class="mb-3 content-header">
      <b-col md="8">
        <h1>{{ movie.title }}</h1>
      </b-col>
      <b-col md="4" class="text-md-right content-header__btns">
        <b-button-group>
          <b-button variant="primary" v-if="!isMyMovie" @click="cloneMovie">
            <font-awesome-icon icon="clone"/>&nbsp;Clone to my collection
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>

    <b-breadcrumb :items="breadcrumbs"/>

    <b-card no-body class="overflow-hidden mb-3" v-if="!contentIsLoading">
      <b-row no-gutters>
        <b-col md="4">
          <b-card-img :src="movie.img" :alt="movie.title" class="rounded-0"/>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <b-card-text>
              <movie-rating :movie="movie" :is-my-movie="isMyMovie" @updated="handleUpdateProperties"></movie-rating>

              <p>Year: {{ movie.year }}</p>
              <p>Director: {{ movie.director }}</p>
              <p>
                Genres:
                <b-badge
                  v-for="(genre, key) in movie.genres"
                  :key="key"
                  variant="success"
                  v-html="genre"
                  class="mr-1"
                ></b-badge>
              </p>

              <add-to-favorite v-if="isMyMovie" :movie="movie" @updated="handleUpdateProperties"></add-to-favorite>
              <add-to-watched v-if="isMyMovie" :movie="movie" @updated="handleUpdateProperties"></add-to-watched>
              
            </b-card-text>
            
          </b-card-body>
        </b-col>
        <b-col md="2" v-if="isMyMovie">
          <div class="p-3 text-right">
            <b-btn variant="custom" v-b-modal.modalMovie>
              <font-awesome-icon icon="edit"/>&nbsp;Edit
            </b-btn>
          </div>
        </b-col>
      </b-row>
    </b-card>

    <comments :movie="movie" v-if="!contentIsLoading"></comments>

    <!-- Edit movie modal -->
    <b-modal
      v-if="!contentIsLoading"
      id="modalMovie"
      ref="modalMovie"
      header-close-variant="light"
      title="Edit movie"
      size="lg"
      hide-footer
      centered
    >
      <movie-form @exit="handleUpdateMovie" :movie="movie"></movie-form>
    </b-modal>
  </div>
</template>

<script>
import MovieService from "@/services/MovieService"
import RequestHandlers from "@/mixins/RequestHandlers"
import { PAGE_NOT_FOUND } from "@/settings"

import LoadingOverlay from "@/components/LoadingOverlay"
import MovieForm from "./MovieForm"
import MovieRating from "./MovieRating"
import AddToFavorite from "./AddToFavorite"
import AddToWatched from "./AddToWatched"
import Comments from "@/components/Comments/Comments"

export default {
  name: 'MovieCard',
  props: {
    movieID: [String, Number]
  },
  data() {
    return {
      movie: {},
      contentIsLoading: true,
      fieldsToClone: ['title', 'year', 'director', 'img', 'genres', 'imdbRating']
    }
  },
  components: {
    LoadingOverlay,
    MovieForm,
    MovieRating,
    AddToFavorite,
    AddToWatched,
    Comments
  },
  mixins: [
    RequestHandlers
  ],
  created() {
    MovieService.getOne(this.movieID)
      .then(movie => {
        this.movie = movie
      })
      .catch(() => {
        this.$router.push(PAGE_NOT_FOUND)
      })
      .finally(() => {
        this.contentIsLoading = false
      })
  },
  methods: {
    handleUpdateMovie(newMovie) {
      this.movie = newMovie
      this.closeModal('modalMovie')
    },
    handleUpdateProperties(newMovie) {
      this.movie = newMovie
    },
    closeModal(modalRef) {
      this.$refs[modalRef].hide()
    },
    cloneMovie() {
      const clonedMovie = {}

      this.fieldsToClone.forEach((item) => {
        clonedMovie[item] = this.movie[item]
      })

      clonedMovie.userId = this.currentUser && this.currentUser.id

      MovieService.createOne(clonedMovie)
        .then(() => {
          this.handleRequestSuccess("Movie is cloned")
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
    breadcrumbs() {
      return [
        {
          text: 'Movies',
          to: { name: this.$routeNames.MoviesPage }
        },
        {
          text: this.movie.title,
          active: true
        }
      ]
    },
    currentUser() {
      return this.$store.getters.user
    },
    isMyMovie() {
      return this.movie.userId === this.currentUser.id
    }

  }
}
</script>


