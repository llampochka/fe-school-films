<template>
  <div>
    <loading-overlay v-show="contentIsLoading"></loading-overlay>

    <b-row class="mb-4 content-header">
      <b-col lg="7" class="mb-2 mb-lg-0">
        <div class="d-flex align-items-lg-center flex-column flex-lg-row">
          <div class>
            <h1 v-if="showOwner">Movie collection of</h1>
            <h1 v-else>My movie collection</h1>
          </div>
          <div class="mx-lg-2">
            <user-short :userID="ownerUserID" v-if="showOwner"></user-short>
          </div>
        </div>
      </b-col>
      <b-col lg="5" class="text-md-right content-header__btns">

        <b-button v-b-modal.modalMovie variant="custom">
          <font-awesome-icon icon="plus-circle"/>&nbsp;Add movie
        </b-button>

        <b-button-group class="ml-2">
          <b-button @click="changeLayout('cards')" :pressed="showBy == 'cards'" variant="primary">
            <font-awesome-icon icon="th"/>&nbsp;Cards
          </b-button>
          <b-button @click="changeLayout('table')" :pressed="showBy == 'table'" variant="primary">
            <font-awesome-icon icon="th-list"/>&nbsp;Table
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>

    <filters @changeProps="changeFilterPropsHandler" :filter-fields="filterFields"></filters>
    <hr>

    <div v-if="movies.length">
      <movies-list :movies="filteredMovies" v-if="showBy == 'cards'"></movies-list>
      <movies-table
        :movies="filteredMovies"
        :sort-props="sortProps"
        :filter-props="filterProps"
        v-if="showBy == 'table'"
      ></movies-table>
    </div>

    <!-- <img :src="require(`@/assets/${movies[0].imgSrc}`)" alt="Titanic"> -->
    <!-- <img src="../assets/titanic1.jpg" alt="Titanic"> -->

    <!-- Add new movie modal -->
    <b-modal
      id="modalMovie"
      ref="modalMovie"
      header-close-variant="light"
      title="Add movie"
      size="lg"
      hide-footer
      centered
    >
      <movie-form @exit="handleCreationMovie"></movie-form>
    </b-modal>
  </div>
</template>

<script>

import MovieService from "@/services/MovieService"

import Filters from "./Filters"
import MoviesList from "./MoviesList"
import MoviesTable from "./MoviesTable"
import MovieForm from "./MovieForm"
import UserShort from "@/components/Users/UserShort"
import LoadingOverlay from "@/components/LoadingOverlay"

export default {
  name: "Movies",
  props: {
    userID: {
      type: [String, Number],
      required: true
    },
  },
  data() {
    return {
      info: null,
      movies: [],
      showBy: "cards",
      sortProps: {},
      filterFields: [
        { title: "All", value: "all" },
        { title: "Title", value: "title" },
        { title: "Year", value: "year" },
        { title: "Director", value: "director" },
        { title: "Genres", value: "genres" }
      ],
      filterProps: {},
      checkedProps: {},
      filteredMovies: [],
      contentIsLoading: false
    }
  },
  components: {
    Filters,
    MoviesList,
    MoviesTable,
    MovieForm,
    LoadingOverlay,
    UserShort
  },
  created() {
    if (this.userID) {

      this.contentIsLoading = true

      MovieService.getAllOfUser(this.userID)
        .then(movies => {
          this.movies = movies
          this.filteredMovies = movies
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error",
            message: err
          })
        })
        .finally(() => {
          this.contentIsLoading = false
        })
    }

  },
  methods: {
    changeLayout(val) {
      this.showBy = val
    },
    changeFilterPropsHandler(sortProps, filterProps, checkedProps) {
      this.sortProps = sortProps
      this.filterProps = filterProps
      this.checkedProps = checkedProps
      this.filteredMovies = this.sortMovies(this.filterMovies(this.movies, filterProps), sortProps)
      this.filteredMovies = this.selectByCheckedProps(this.filteredMovies, checkedProps)
    },
    filterMovies(movies, props) {
      const sourceMovies = this.$lodash.cloneDeep(movies)

      if (!props.searchText || !props.searchText.length) {
        return sourceMovies
      }

      const search = ((item, property) => {

        const compare = (text => {
          return text && new RegExp(props.searchText, "i").test(String(text))
        })

        const highlight = (text => {
          return String(text).replace(new RegExp(props.searchText, "gi"), "<b class=\"bg-info\">$&</b>")
        })

        let found = false

        if (Array.isArray(item[property])) {
          const foundIndex = item[property].findIndex(arrItemText => {
            return compare(arrItemText)
          })
          if (foundIndex >= 0) {
            item[property][foundIndex] = highlight(item[property][foundIndex])
            found = true
          }
        } else {
          found = compare(item[property])
          if (found) {
            item[property] = highlight(item[property])
          }
        }
        return found
      })

      return sourceMovies.filter(item => {
        if (props.by === 'all') {
          return this.filterFields.findIndex(filterField => {
            return search(item, filterField.value)
          }) >= 0
        } else {
          return search(item, props.by)
        }
      })
    },
    selectByCheckedProps(movies, props) {
      Object.keys(props).forEach(prop => {
        if (props[prop] === true) {
          movies = movies.filter(movie => {
            return movie[prop] == true
          })
        }
      })
      return movies
    },
    sortMovies(movies, props) {
      return this.$lodash.orderBy(movies, props.by, props.direction)
    },
    handleCreationMovie(newMovie) {
      if (newMovie) {
        this.movies.push(newMovie)
        this.filteredMovies = this.sortMovies(this.filterMovies(this.movies, this.filterProps), this.sortProps)
      }
      this.closeModal('modalMovie')

    },
    closeModal(modalRef) {
      this.$refs[modalRef].hide()
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.user
    },
    ownerUserID() {
      return this.userID
    },
    showOwner() {
      return this.userID !== this.currentUser.id
    }
  }
}
</script>

<style scoped>
/* h1 {
  margin-bottom: 0;
} */
</style>