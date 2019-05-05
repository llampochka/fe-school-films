<template>
  <div>
    <b-row class="movies-list">
      <b-col v-for="movie in paginated(movies)" :key="movie.id" md="6" lg="4" class="mb-3">
        <b-card no-body>
          <b-card-img-lazy :src="movie.img" :alt="movie.title"/>

          <div class="card-img-overlay">
            <b-link
              :to="{name: $routeNames.MovieCard, params: {movieID: movie.id}}"
              class="card-img-overlay-link"
            ></b-link>
            <div class="card-img-overlay-ins">
              <h5>
                <b-link
                  :to="{name: $routeNames.MovieCard, params: {movieID: movie.id}}"
                  v-html="movie.title"
                ></b-link>
              </h5>
              <b-card-text>
                Year:
                <span v-html="movie.year"></span>
                <br>Director:
                <span v-html="movie.director"></span>
                <br>
                <b-badge
                  v-for="(genre, key) in movie.genres"
                  :key="key"
                  variant="success"
                  v-html="genre"
                  class="mr-1"
                ></b-badge>
              </b-card-text>
              <div class="card-buttons d-flex align-items-center justify-content-between">
                <div>
                  <b-button
                    href="#"
                    variant="custom"
                    :to="{name: $routeNames.MovieCard, params: {movieID: movie.id}}"
                  >Detailed</b-button>
                </div>

                <div class="text-right">
                  <font-awesome-icon icon="heart" class="icon-love" v-if="movie.isFavorite"/>
                  <font-awesome-icon icon="eye" class="icon-love ml-2" v-if="movie.isWatched"/>
                </div>
              </div>
            </div>
          </div>

          <span class="card-label" v-if="movie.imdbRating">
            <font-awesome-icon icon="star" size="xs"/>
            &nbsp; {{ movie.imdbRating }}
          </span>
        </b-card>
      </b-col>
    </b-row>

    <b-pagination
      v-model="currentPage"
      :total-rows="movies.length"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: "MoviesList",
  props: {
    movies: Array
  },
  data() {
    return {
      currentPage: 1,
      perPage: 9
    }
  },
  methods: {
    paginated(list) {
      const start = (this.currentPage - 1) * this.perPage,
        end = start + this.perPage

      return list.slice(start, end)
    }
  },
  computed: {}
};
</script>


