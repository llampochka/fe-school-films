<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-row>
        <b-col lg="5">
          <div class="movie-form-poster">
            <img :src="form.img" width="259" height="400">
            <div class="movie-form-poster-btns">
              <b-btn variant="primary" @click="emulateFileUpload" title="Upload poster">
                <font-awesome-icon icon="file-import"/>&nbsp;Upload
              </b-btn>&nbsp;
              <b-btn @click="clearPoster" title="Upload poster">
                <font-awesome-icon icon="eraser"/>&nbsp;Delete
              </b-btn>
            </div>

            <b-form-group>
              <b-form-file
                class="custom-file-movie"
                v-model="file"
                placeholder
                drop-placeholder="Drop file here..."
                id="fileUpload"
                @change="onFileChange"
              ></b-form-file>
            </b-form-group>
          </div>
        </b-col>
        <b-col lg="7">
          <b-input-group class="mb-3" prepend="Load from IMDB">
            <b-form-input id="imdb_id" name="IMDB ID" v-model="imdbID" placeholder="Enter IMDB ID"></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="loadFromIMDB(imdbID)" :disabled="!imdbID">
                <b-spinner type="grow" label small v-if="imdbLoading"></b-spinner>&nbsp;Submit
              </b-button>
            </b-input-group-append>
          </b-input-group>

          <b-form-group id="titleGroup" label="Title:" label-for="title">
            <b-form-input
              id="title"
              name="Title"
              v-model="form.title"
              v-validate="'required'"
              :state="validateState('Title')"
              placeholder="Enter movie title"
            />
            <b-form-invalid-feedback>
              <p v-for="(error, index) in errors.collect('Title')" :key="index">{{ error }}</p>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="yearGroup" label="Year:" label-for="year">
            <b-form-input
              id="year"
              name="Year"
              v-model="form.year"
              v-validate="'required|numeric|min_value:1850|max_value:' + currentYear"
              placeholder="Enter movie year"
              :state="validateState('Year')"
            />
            <b-form-invalid-feedback>
              <p v-for="(error, index) in errors.collect('Year')" :key="index">{{ error }}</p>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="directorGroup" label="Director:" label-for="director">
            <b-form-input
              id="director"
              name="Director"
              v-model="form.director"
              v-validate="'required'"
              :state="validateState('Director')"
              placeholder="Enter director name"
            />
            <b-form-invalid-feedback>
              <p v-for="(error, index) in errors.collect('Director')" :key="index">{{ error }}</p>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group label="Genres:">
            <b-form-checkbox-group v-model="form.genres" :options="genres"></b-form-checkbox-group>
          </b-form-group>

          <b-form-group id="imdbRatingGroup" label="IMDB rating:" label-for="imdb_rating">
            <b-form-input
              id="imdb_rating"
              name="IMDB rating"
              v-model="form.imdbRating"
              v-validate="'required|decimal|max_value:10|length:1,4'"
              :state="validateState('IMDB rating')"
              placeholder="Enter IMDB rating"
              class="w-25"
            />
            <b-form-invalid-feedback>
              <p v-for="(error, index) in errors.collect('IMDB rating')" :key="index">{{ error }}</p>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-checkbox v-model="form.isFavorite" name="check-button">Is my favorite</b-form-checkbox>
          <b-form-checkbox v-model="form.isWatched" name="check-button" class="mb-3">Is watched</b-form-checkbox>

        </b-col>
      </b-row>

      <footer class="form-footer form-footer-modal">
        <b-button type="reset" variant="secondary">Cancel</b-button>&nbsp;&nbsp;
        <b-button type="submit" variant="primary" :disabled="errors.any()">
          <b-spinner v-if="updatingProcess" small></b-spinner>Submit
        </b-button>
      </footer>
    </b-form>
  </div>
</template>

<script>
import MovieService from "@/services/MovieService"
import RequestHandlers from "@/mixins/RequestHandlers"

export default {
  name: 'MovieForm',
  props: {
    movie: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      posterDefault: "/img/movies/default.png",
      form: {
        img: null
      },
      file: null,
      genres: [
        { text: 'Action', value: 'Action' },
        { text: 'Adventure', value: 'Adventure' },
        { text: 'Animation', value: 'Animation' },
        { text: 'Comedy', value: 'Comedy' },
        { text: 'Crime', value: 'Crime' },
        { text: 'Drama', value: 'Drama' },
        { text: 'Family', value: 'Family' },
        { text: 'Romance', value: 'Romance' },
        { text: 'Sci-Fi', value: 'Sci-Fi' },
        { text: 'Thriller', value: 'Thriller' }
      ],
      imdbID: null,
      imdbLoading: false,
      test: null,
      updatingProcess: false
    }
  },
  mixins: [
    RequestHandlers
  ],
  watch: {
    'movie': function (val) {
      this.form = this.$lodash.cloneDeep(val)
    }
  },
  created: function () {

    if (this.isEdit) {
      this.form = this.$lodash.cloneDeep(this.movie)
    } else {
      this.form.img = this.posterDefault
    }

  },
  methods: {
    clearPoster() {
      this.form.img = this.posterDefault
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage(file) {
      const reader = new FileReader()
      reader.onload = e => {
        this.form.img = e.target.result
      }
      reader.readAsDataURL(file)
    },
    emulateFileUpload(evt) {
      evt.preventDefault()
      document.getElementById("fileUpload").click()
    },
    onSubmit(evt) {

      evt.preventDefault()

      this.$validator.validate().then(valid => {
        if (valid) {

          this.form.userId = this.currentUser && this.currentUser.id

          if (this.isEdit) {

            // Update

            this.handleRequestStart()

            MovieService.updateOne(this.form)
              .then((movie) => {
                this.handleRequestSuccess("Movie is updated")
                // close parent modal
                this.$emit('exit', movie)
                this.$validator.reset()
              })
              .catch((err) => {
                this.handleRequestFailed(err)
              })
              .finally(() => {
                this.handleRequestFinished()
              })


          } else {

            // Create

            this.handleRequestStart()

            MovieService.createOne(this.form)
              .then((movie) => {
                this.handleRequestSuccess("New movie is added")

                // close parent modal
                this.$emit('exit', movie)
                this.form = {}
                this.form.img = this.posterDefault
                this.$validator.reset()
              })
              .catch((err) => {
                this.handleRequestFailed(err)
              })
              .finally(() => {
                this.handleRequestFinished()
              })
          }

        }
      })

    },
    loadFromIMDB(imdbID) {

      this.imdbLoading = true

      MovieService.loadFromIMDB(imdbID)
        .then((movie) => {
          this.form = {
            title: movie.Title,
            year: movie.Year,
            director: movie.Director,
            img: movie.Poster,
            imdbRating: movie.imdbRating
          }
          this.form.genres = movie.Genre.split(', ')
        })
        .catch((err) => {
          this.flashMessage.error({
            title: "Error",
            message: "An error occured: " + err
          })
        })
        .finally(() => {
          this.imdbLoading = false
        })
    },
    onReset(evt) {
      evt.preventDefault()
      // close parent modal
      this.$emit('exit', null)
    },
    validateState(ref) {

      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.errors.has(ref)
      }
      return null
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    currentUser() {
      return this.$store.getters.user
    },
    isEdit() {
      return !this.$lodash.isEmpty(this.movie)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>


