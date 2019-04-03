<template>
  <div>

    isLoggedIn: {{ isLoggedIn }}
    currentUser: {{ currentUser }}
    currentUser.name: {{ currentUser.name }}

    <b-row class="mb-3 content-header">
      <b-col md="8"><h1>Movie collection</h1></b-col>
      <b-col md="4" class="text-md-right content-header__btns">
        <b-button-group>
          <b-button @click="changeLayout('cards')" :pressed="showBy == 'cards'" variant="primary">
            <font-awesome-icon icon="th" /> Cards
          </b-button>
          <b-button @click="changeLayout('table')" :pressed="showBy == 'table'" variant="primary">
            <font-awesome-icon icon="th-list" /> Table
          </b-button>
      </b-button-group>
      </b-col>      
    </b-row>

    <b-row class="panel">

      <!-- <b-col lg="10"> -->
        <!-- <b-row> -->
          <b-col lg="4"  class="mb-3 mb-lg-0">
            <label class="panel__label">Sort by: </label> 
            <b-dropdown text="Default" variant="info">
              <b-dropdown-item>Default</b-dropdown-item>
              <b-dropdown-item>Name</b-dropdown-item>
              <b-dropdown-item>Year</b-dropdown-item>
            </b-dropdown>
            <b-button-group class="mx-2">
              <b-button :pressed="true" variant="info"><font-awesome-icon icon="caret-up" /></b-button>
              <b-button :pressed="false" variant="info"><font-awesome-icon icon="caret-down" /></b-button>
            </b-button-group>
          </b-col>
          <b-col  class="mb-3 mb-lg-0">
            <!-- <b-row>
              <b-col md="3" lg="4" class="mb-3 mb-lg-0"> -->
                <label class="panel__label">Filter by: </label> 
                <b-dropdown text="Name" variant="info">
                  <b-dropdown-item>Name</b-dropdown-item>
                  <b-dropdown-item>Year</b-dropdown-item>
                </b-dropdown>
              <!-- </b-col>
              <b-col> -->
                <b-form-input type="text" placeholder="Filter value" class="panel__filter-input w-auto" />
              <!-- </b-col>
            </b-row> -->
            
            
          </b-col>
        <!-- </b-row> -->
      <!-- </b-col> -->
     
      <b-col class="text-lg-right" lg="2">
        <b-button variant="custom">
          <font-awesome-icon icon="plus-circle" /> Add movie</b-button>
      </b-col>
    </b-row>
    <hr/>

    <b-row v-if="showBy == 'cards'">
      <b-col v-for="movie in movies" :key="movie.id" md="4" lg="4">
        <b-card no-body>
          <b-link :to="{name: $routeNames.MovieCard, params: {movieId: movie.id}}">
            <b-card-img :src="movie.imgSrc" class="card-img-top" :alt="movie.title" />
          </b-link>
          <b-card-body>
            <h4>
              <b-link :to="{name: $routeNames.MovieCard, params: {movieId: movie.id}}">{{ movie.title }}</b-link>
            </h4>
            <b-card-text>
              Year: {{ movie.year }}
            </b-card-text>
            <b-button href="#" variant="custom" :to="{name: $routeNames.MovieCard, params: {movieId: movie.id}}">Detailed</b-button>
            
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <!-- <img :src="require(`@/assets/${movies[0].imgSrc}`)" alt="Titanic"> -->
    <!-- <img src="../assets/titanic1.jpg" alt="Titanic"> -->

    <div  v-if="showBy == 'table'">
      <vuetable ref="vuetable"
        :api-url="'/api/movies'"
        :fields="['id', 'title', 'year']"
      ></vuetable>
    </div>
    

  </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import axios from 'axios'

Vue.use(Vuetable)
Vue.use(axios)

export default {
  name: 'Movies',
  props: {
    msg: String
  },
  data() {
    return {
      info: null,
      movies: null,
      showBy: 'cards'
    };
  },
  components: {
    Vuetable
  },
  mounted() {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response));

    axios
      .get('/api/movies')
      .then(response => (this.movies = response.data.data));
  },
  methods: {
    changeLayout(val) {
      this.showBy = val;
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    },
    currentUser() {
      return this.$store.state.user;
    },
    counter() {
      return this.$store.state.count;
    } 
    // movies() {
    //   let movies = [
    //     {
    //       id: 1,
    //       imgSrc: 'ghostbusters1.jpg',
    //       title: 'Gost busters',
    //       year: '1984'
    //     },
    //     {
    //       id: 2,
    //       imgSrc: 'titanic1.jpg',
    //       title: 'Titanic',
    //       year: '1997'
    //     },
    //   ];
    //   return movies;
    // }
  }
}
</script>

