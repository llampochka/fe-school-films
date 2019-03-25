<template>
  <div>

    <b-row class="mb-3">
      <b-col md="8"><h1>{{ movie.title }}</h1></b-col>
      <b-col md="4" class="text-md-right">
        <b-button-group>
          <b-button @click="changeLayout('table')" :pressed="showBy == 'table'" variant="primary">
            <font-awesome-icon icon="clone" /> Clone movie to my collection
          </b-button>
      </b-button-group>
      </b-col>      
    </b-row>

    <b-breadcrumb :items="breadcrumbs" />
    
    <b-card img-left :img-src="require(`@/assets/${movie.imgSrc}`)">
      
      <b-card-text>
        <p>
          <ul class="raiting">
            <li class="active"><a href="#"><font-awesome-icon icon="star" /></a></li>
            <li class="active"><a href="#"><font-awesome-icon icon="star" /></a></li>
            <li class="active"><a href="#"><font-awesome-icon icon="star" /></a></li>
            <li class="active"><a href="#"><font-awesome-icon icon="star-half-alt" /></a></li>
            <li><a href="#"><font-awesome-icon :icon="['far', 'star']" class="far" /></a></li>
          </ul>
        </p>
        <p>Year: {{ movie.year }}</p>
        
      </b-card-text>
    </b-card>

  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)

export default {
  name: 'MovieCard',
  props: {
    msg: String,
    movieId: Number
  },
  data() {
    return {
      movie: null
    }    
  },
  mounted() {
    axios
      .get('/api/movies')
      .then(response => (
        this.movie = response.data.data.filter(movieItem => {
          return movieItem.id == this.movieId
        })[0]
      )) 
  },
  computed: {
    breadcrumbs() {
      return [
          {
            text: 'Movies',
            href: '#'
          },
          {
            text: this.movie.title,
            active: true
          }
        ]
    } 
  }
}
</script>


