<template>
  <div>

    <b-table
      show-empty
      striped
      dark
      stacked="md"
      :items="movies"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
    >
      <template slot="title" slot-scope="data">
        <span v-html="data.value"></span>
      </template>
      <template slot="year" slot-scope="data">
        <span v-html="data.value"></span>
      </template>
      <template slot="director" slot-scope="data">
        <span v-html="data.value"></span>
      </template>
      <template slot="genres" slot-scope="data">
        <b-badge
          v-for="(genre, key) in data.value"
          :key="key"
          variant="success"
          v-html="genre"
          class="mx-1"
        >Info</b-badge>
      </template>
      <template slot="isFavorite" slot-scope="data">
        <div class="text-md-center">
          <font-awesome-icon icon="heart" class="icon-love" v-if="data.value"/>
        </div>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "MoviesList",
  props: {
    movies: Array,
    sortProps: Object,
    filterProps: Object
  },
  data() {
    return {
      fields: [
        { key: 'title', label: 'Title', sortable: true, sortDirection: 'asc' },
        { key: 'year', label: 'Year', sortable: true },
        { key: 'director', label: 'Director', sortable: true },
        { key: 'genres', label: 'Genres' },
        { key: 'isFavorite', label: 'Is favorite' }
      ],
      currentPage: 1,
      perPage: 9,
      totalRows: this.movies.length,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc'
    }
  },
  methods: {

  },
  watch: {
    'sortProps.by': function (val) {
      this.sortBy = val
    },
    'sortProps.direction': function (val) {
      this.sortDirection = val
    },
    'sortProps.desc': function (val) {
      this.sortDesc = val
    },
    'movies.length': function (val) {
      this.totalRows = val
      this.currentPage = 1
    }
  },
  computed: {
  }
};
</script>


