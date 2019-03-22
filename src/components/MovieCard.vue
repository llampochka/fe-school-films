<template>
  <div>
    
    <b-card img-left :img-src="require('../assets/ghostbusters1.jpg')">
      
      <b-card-text>
        Some quick example text to build on the card and make up the bulk of the card's content.
      </b-card-text>
    </b-card>

  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    msg: String
  }
}
</script>


